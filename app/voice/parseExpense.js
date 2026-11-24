/**
 * Turns a spoken sentence into an expense draft, on the device.
 *
 *   parseExpense('Spent 1,200 on petrol by cash yesterday', { categories })
 *   // -> { amount: 1200, categoryId: 12, categoryName: 'Transportation',
 *   //      paymentMode: 1, date: <yesterday>, note: 'Petrol', module: null,
 *   //      missing: [] }
 *
 * Everything here is a best guess for the user to check on the Add Expense
 * form before saving. Fields it can't work out are null and listed in
 * `missing`. It is the only place that knows about phrasing, so a
 * server-side AI parser can replace it later behind the same shape.
 */

// ---------------------------------------------------------------- numbers

const UNITS = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
  a: 1,
  an: 1,
};
const SCALES = {
  hundred: 100,
  thousand: 1000,
  k: 1000,
  lakh: 100000,
  lakhs: 100000,
  lac: 100000,
  lacs: 100000,
  million: 1000000,
  crore: 10000000,
};
const NUMBER_WORDS = new Set([
  ...Object.keys(UNITS),
  ...Object.keys(SCALES),
  'and',
]);

/**
 * Rewrites spelled-out numbers ("twelve hundred", "two thousand five
 * hundred", "1.5 lakh", "2k") as digits so the rest of the parser only
 * deals with digits.
 */
export function normalizeNumbers(text) {
  const tokens = text.split(/\s+/).filter(Boolean);
  const out = [];
  let i = 0;
  while (i < tokens.length) {
    const word = tokens[i].toLowerCase();
    const digit = word.replace(/,/g, '').match(/^(\d+(?:\.\d+)?)(k)?$/);
    const startsNumber =
      digit || (UNITS[word] !== undefined && !['a', 'an'].includes(word));
    // "a thousand" / "a hundred" are numbers; a lone "a" is not.
    const articleNumber =
      ['a', 'an'].includes(word) && SCALES[tokens[i + 1]?.toLowerCase()];

    if (!startsNumber && !articleNumber) {
      out.push(tokens[i]);
      i += 1;
      continue;
    }

    let total = 0;
    let current = 0;
    let consumed = 0;
    let sawNumber = false;
    for (let j = i; j < tokens.length; j += 1) {
      const w = tokens[j].toLowerCase().replace(/,/g, '');
      const d = w.match(/^(\d+(?:\.\d+)?)(k)?$/);
      if (d) {
        // Two plain numbers in a row ("500 300") are separate numbers.
        if (sawNumber && current !== 0) break;
        current += parseFloat(d[1]) * (d[2] ? 1000 : 1);
        sawNumber = true;
      } else if (UNITS[w] !== undefined) {
        if (sawNumber && current % 10 !== 0 && UNITS[w] < 10) break;
        current += UNITS[w];
        sawNumber = true;
      } else if (SCALES[w] && sawNumber) {
        const scale = SCALES[w];
        if (scale === 100) {
          current *= scale;
        } else {
          total += current * scale;
          current = 0;
        }
      } else if (
        w === 'and' &&
        sawNumber &&
        j + 1 < tokens.length &&
        NUMBER_WORDS.has(tokens[j + 1].toLowerCase())
      ) {
        // "one hundred and fifty"
      } else {
        break;
      }
      consumed += 1;
    }
    out.push(String(Math.round((total + current) * 100) / 100));
    i += consumed;
  }
  return out.join(' ');
}

// ---------------------------------------------------------------- amount

const CURRENCY = '(?:rs\\.?|rupees?|rupay|rupaye|pkr)';
const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];
const MONTH_RE = MONTHS.map(m => m.slice(0, 3) + '\\w*').join('|');

/** The money figure in the sentence, and the text it came from. */
function findAmount(text) {
  const candidates = [];
  const re = /\d+(?:\.\d+)?/g;
  let m;
  while ((m = re.exec(text))) {
    const before = text.slice(0, m.index);
    const after = text.slice(m.index + m[0].length);
    // Skip dates ("5th", "5 november", "november 5", "2 days ago").
    if (/^(st|nd|rd|th)\b/i.test(after)) continue;
    if (new RegExp(`^\\s*(of\\s+)?(${MONTH_RE})\\b`, 'i').test(after)) continue;
    if (new RegExp(`\\b(${MONTH_RE})\\s*$`, 'i').test(before)) continue;
    if (/^\s*(days?|weeks?)\s+ago\b/i.test(after)) continue;

    let score = 0;
    if (new RegExp(`${CURRENCY}\\s*$`, 'i').test(before)) score += 3;
    if (new RegExp(`^\\s*${CURRENCY}`, 'i').test(after)) score += 3;
    if (/\b(for|of|paid|spent|spend|cost|costs|worth)\s*$/i.test(before))
      score += 1;
    candidates.push({
      value: parseFloat(m[0]),
      score,
      start: m.index,
      end: m.index + m[0].length,
    });
  }
  if (!candidates.length) return null;
  // Best score wins; ties go to the larger number ("2 shirts for 3000").
  candidates.sort((a, b) => b.score - a.score || b.value - a.value);
  return candidates[0];
}

// ---------------------------------------------------------------- payment

const PAYMENT_WORDS = [
  {
    mode: 2,
    re: /\b(bank|card|debit|credit card|visa|master ?card|online|transfer|account|jazz ?cash|easy ?paisa|sadapay|nayapay|raast|cheque|check)\b/i,
  },
  { mode: 1, re: /\b(cash|naqad|naqd)\b/i },
];

function findPaymentMode(text) {
  for (const { mode, re } of PAYMENT_WORDS) {
    const m = text.match(re);
    if (m) return { mode, match: m[0] };
  }
  return null;
}

// ---------------------------------------------------------------- date

const WEEKDAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

/** Dates are never in the future: "on the 25th" late in a month means last month's 25th, not next. */
function pastDate(today, day, monthIndex) {
  let year = today.getFullYear();
  let month = monthIndex ?? today.getMonth();
  let d = new Date(year, month, day);
  if (d > today) {
    d =
      monthIndex === undefined
        ? new Date(year, month - 1, day)
        : new Date(year - 1, month, day);
  }
  return d;
}

function findDate(text, today) {
  const t = startOfDay(today);
  const rules = [
    [/\b(day before yesterday|parso)\b/i, () => addDays(t, -2)],
    [/\b(yesterday|kal)\b/i, () => addDays(t, -1)],
    [/\b(today|aaj)\b/i, () => t],
    [/\b(\d+)\s+days?\s+ago\b/i, m => addDays(t, -parseInt(m[1], 10))],
    [/\b(a|one)\s+week\s+ago\b|\blast week\b/i, () => addDays(t, -7)],
    [
      new RegExp(`\\b(?:on\\s+)?(?:last\\s+)?(${WEEKDAYS.join('|')})\\b`, 'i'),
      m => {
        const target = WEEKDAYS.indexOf(m[1].toLowerCase());
        let diff = (t.getDay() - target + 7) % 7;
        if (diff === 0 || /last/i.test(m[0])) diff = diff || 7;
        return addDays(t, -diff);
      },
    ],
    [
      new RegExp(
        `\\b(?:on\\s+)?(?:the\\s+)?(\\d{1,2})(?:st|nd|rd|th)?\\s+(?:of\\s+)?(${MONTH_RE})\\b`,
        'i',
      ),
      m => pastDate(t, parseInt(m[1], 10), monthIndex(m[2])),
    ],
    [
      new RegExp(
        `\\b(?:on\\s+)?(${MONTH_RE})\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b`,
        'i',
      ),
      m => pastDate(t, parseInt(m[2], 10), monthIndex(m[1])),
    ],
    [
      /\b(?:on\s+)?the\s+(\d{1,2})(?:st|nd|rd|th)\b|\bon\s+(\d{1,2})(?:st|nd|rd|th)\b/i,
      m => pastDate(t, parseInt(m[1] || m[2], 10)),
    ],
  ];
  for (const [re, toDate] of rules) {
    const m = text.match(re);
    if (m) {
      const date = toDate(m);
      if (date && !isNaN(date)) return { date, match: m[0] };
    }
  }
  return null;
}

function monthIndex(word) {
  return MONTHS.findIndex(m => m.startsWith(word.toLowerCase().slice(0, 3)));
}

// ---------------------------------------------------------------- category

/**
 * Spoken words that point at each category. Keys are the category names
 * the API returns; matching is case-insensitive, and a category the API
 * doesn't return is simply skipped.
 */
export const CATEGORY_KEYWORDS = {
  'Food & Groceries': [
    'food',
    'grocery',
    'groceries',
    'lunch',
    'dinner',
    'breakfast',
    'meal',
    'restaurant',
    'pizza',
    'burger',
    'biryani',
    'snacks',
    'tea',
    'chai',
    'coffee',
    'milk',
    'bread',
    'eggs',
    'vegetables',
    'sabzi',
    'fruit',
    'fruits',
    'meat',
    'chicken',
    'rice',
    'flour',
    'atta',
    'sugar',
    'oil',
    'ghee',
    'bakery',
    'doodh',
    'khana',
    'mart',
    'kiryana',
  ],
  Transportation: [
    'petrol',
    'fuel',
    'diesel',
    'gas station',
    'uber',
    'careem',
    'indrive',
    'indriver',
    'taxi',
    'rickshaw',
    'bus',
    'train',
    'metro',
    'fare',
    'parking',
    'toll',
    'car',
    'bike',
    'motorcycle',
    'tyre',
    'tire',
    'mechanic',
    'service',
    'transport',
    'ride',
    'flight',
    'ticket',
  ],
  'Bill Expense': [
    'bill',
    'bills',
    'electricity',
    'bijli',
    'wapda',
    'k-electric',
    'water',
    'gas bill',
    'sui gas',
    'utility',
    'utilities',
  ],
  'Mobile & Internet': [
    'mobile',
    'phone',
    'internet',
    'wifi',
    'wi-fi',
    'broadband',
    'load',
    'balance',
    'recharge',
    'package',
    'data',
    'sim',
    'jazz',
    'zong',
    'telenor',
    'ufone',
    'ptcl',
    'netflix',
    'subscription',
  ],
  'Health & Medical': [
    'medicine',
    'medicines',
    'medical',
    'doctor',
    'hospital',
    'clinic',
    'pharmacy',
    'chemist',
    'dawai',
    'dawa',
    'lab',
    'test',
    'tests',
    'dentist',
    'health',
    'checkup',
  ],
  'Education & Learning': [
    'school',
    'fee',
    'fees',
    'tuition',
    'college',
    'university',
    'books',
    'book',
    'course',
    'class',
    'classes',
    'stationery',
    'education',
    'academy',
    'exam',
  ],
  'Entertainment & Leisure': [
    'movie',
    'movies',
    'cinema',
    'game',
    'games',
    'outing',
    'trip',
    'picnic',
    'party',
    'concert',
    'entertainment',
    'fun',
    'holiday',
  ],
  'Shopping & Clothing': [
    'clothes',
    'clothing',
    'shirt',
    'shirts',
    'shoes',
    'dress',
    'kapray',
    'kapre',
    'jeans',
    'suit',
    'shopping',
    'bag',
    'watch',
    'jacket',
  ],
  'Family & Personal Care': [
    'salon',
    'haircut',
    'barber',
    'parlour',
    'parlor',
    'cosmetics',
    'makeup',
    'family',
    'kids',
    'gift',
    'gifts',
    'personal care',
    'shampoo',
    'soap',
  ],
  'Home Expense': [
    'rent',
    'house',
    'home',
    'furniture',
    'repair',
    'plumber',
    'electrician',
    'maid',
    'cleaning',
    'kitchen',
    'appliance',
  ],
  'Saving & Investments': [
    'saving',
    'savings',
    'investment',
    'invest',
    'committee',
    'gold',
    'stocks',
    'shares',
    'deposit',
  ],
  'Office Expense': [
    'office',
    'stationery',
    'printer',
    'printing',
    'paper',
    'supplies',
    'salary',
    'staff',
    'rent',
    'electricity',
    'internet',
    'courier',
    'delivery',
    'stock',
    'inventory',
    'packaging',
  ],
};

const FALLBACK_CATEGORIES = ['Other', 'Other Expense'];
const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function findCategory(text, categories) {
  if (!categories?.length) return null;
  const byName = name =>
    categories.find(c => c.Name?.toLowerCase() === name.toLowerCase());

  let best = null;
  const consider = (category, match) => {
    // Longer (more specific) matches win: "gas bill" over "gas".
    if (category && (!best || match.length > best.match.length)) {
      best = { category, match };
    }
  };

  for (const [name, words] of Object.entries(CATEGORY_KEYWORDS)) {
    const category = byName(name);
    if (!category) continue;
    for (const word of words) {
      const m = text.match(new RegExp(`\\b${escapeRe(word)}\\b`, 'i'));
      if (m) consider(category, m[0]);
    }
  }
  // Words from the category names themselves ("medical", "groceries").
  for (const category of categories) {
    const words = (category.Name || '')
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter(w => w.length > 3 && !['expense', 'other'].includes(w));
    for (const word of words) {
      const m = text.match(new RegExp(`\\b${escapeRe(word)}\\b`, 'i'));
      if (m) consider(category, m[0]);
    }
  }
  if (best) return { ...best, guessed: false };

  const fallback = FALLBACK_CATEGORIES.map(byName).find(Boolean);
  return fallback ? { category: fallback, match: null, guessed: true } : null;
}

// ---------------------------------------------------------------- note

const FILLER = new RegExp(
  [
    `${CURRENCY}`,
    'i',
    "i've",
    'have',
    'has',
    'just',
    'add',
    'added',
    'adding',
    'an?',
    'new',
    'expense',
    'expenses',
    'personal',
    'business',
    'spent',
    'spend',
    'paid',
    'pay',
    'bought',
    'buy',
    'gave',
    'for',
    'on',
    'of',
    'by',
    'with',
    'via',
    'through',
    'using',
    'in',
    'at',
    'the',
    'to',
    'my',
    'from',
    'and',
    'it',
    'was',
    'please',
    'payment',
    'paise',
    'pese',
    'ke',
    'ki',
    'ka',
    'se',
    'kiye',
    'diye',
    'liye',
    'mein',
    'main',
    'me',
  ]
    .map(w => `\\b${w}\\b`)
    .join('|'),
  'gi',
);

function buildNote(text, usedParts) {
  let rest = text;
  for (const part of usedParts) {
    if (part) rest = rest.replace(part, ' ');
  }
  rest = rest
    .replace(/\d+(?:\.\d+)?/g, ' ')
    .replace(FILLER, ' ')
    .replace(/[^\p{L}\p{N}&'\- ]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!rest) return '';
  return rest.charAt(0).toUpperCase() + rest.slice(1);
}

// ---------------------------------------------------------------- main

/**
 * @param {string} transcript What the user said.
 * @param {object} options
 * @param {{Id:number, Name:string}[]} options.categories From the categories API.
 * @param {Date} [options.today] For tests.
 */
export function parseExpense(
  transcript,
  { categories = [], today = new Date() } = {},
) {
  const text = normalizeNumbers(String(transcript || '').trim());

  const date = findDate(text, today);
  // Look for the amount with the date phrase blanked out so "5th" etc.
  // can't be mistaken for money.
  const withoutDate = date
    ? text.replace(date.match, ' '.repeat(date.match.length))
    : text;
  const amount = findAmount(withoutDate);
  const payment = findPaymentMode(text);
  const category = findCategory(text, categories);

  const module = /\b(business|dukan)\b/i.test(text)
    ? 'business'
    : /\b(personal|self|ghar)\b/i.test(text)
    ? 'personal'
    : null;

  const used = [
    date?.match,
    payment?.match,
    amount ? text.slice(amount.start, amount.end) : null,
  ];
  const note = buildNote(text, used);

  const result = {
    transcript: String(transcript || '').trim(),
    amount: amount ? amount.value : null,
    categoryId: category?.category?.Id ?? null,
    categoryName: category?.category?.Name ?? null,
    categoryGuessed: Boolean(category?.guessed),
    paymentMode: payment ? payment.mode : null,
    date: date ? date.date : startOfDay(today),
    dateSaid: Boolean(date),
    note,
    module,
  };
  result.missing = [
    result.amount == null && 'amount',
    result.categoryId == null && 'category',
    result.paymentMode == null && 'paymentMode',
  ].filter(Boolean);
  return result;
}

export default parseExpense;
