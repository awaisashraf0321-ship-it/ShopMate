// Icon + colours for each expense category, in one place.
// Previously copy-pasted into nine screens (some copies only knew a few
// categories, so detail screens fell back to a generic icon).
//
//   categoryStyle('Food & Groceries')
//   // -> { icon: 'restaurant', color: '#FFF3E0', iconColor: '#EF6C00' }
//
// color = soft tile background, iconColor = the icon itself.
import { lightColors as colors } from './semantic';

const CATEGORY_STYLES = {
  // Self expense categories
  'Bill Expense': {
    icon: 'receipt-long',
    color: colors.dangerSoft,
    iconColor: colors.danger,
  },
  'Education & Learning': {
    icon: 'school',
    color: '#EDE7F6',
    iconColor: '#7E57C2',
  },
  'Entertainment & Leisure': {
    icon: 'movie',
    color: '#FCE4EC',
    iconColor: '#D81B60',
  },
  'Family & Personal Care': {
    icon: 'people',
    color: '#E0F2F1',
    iconColor: '#00897B',
  },
  'Food & Groceries': {
    icon: 'restaurant',
    color: '#FFF3E0',
    iconColor: '#EF6C00',
  },
  'Health & Medical': {
    icon: 'medical-services',
    color: colors.dangerSoft,
    iconColor: colors.danger,
  },
  'Home Expense': {
    icon: 'home',
    color: '#ECF5D9',
    iconColor: colors.success,
  },
  'Mobile & Internet': {
    icon: 'phone-iphone',
    color: '#E3F2FD',
    iconColor: '#1976D2',
  },
  Other: { icon: 'category', color: '#ECEFF1', iconColor: '#546E7A' },
  'Saving & Investments': {
    icon: 'savings',
    color: '#E8F5E9',
    iconColor: '#388E3C',
  },
  'Shopping & Clothing': {
    icon: 'shopping-bag',
    color: '#F3E5F5',
    iconColor: '#8E24AA',
  },
  Transportation: {
    icon: 'directions-car',
    color: colors.infoSoft,
    iconColor: '#3F51B5',
  },

  // Business expense categories
  'Office Expense': {
    icon: 'business',
    color: colors.dangerSoft,
    iconColor: colors.danger,
  },
  'Other Expense': {
    icon: 'apps',
    color: colors.infoSoft,
    iconColor: colors.info,
  },
};

const FALLBACK = {
  icon: 'apps',
  color: colors.infoSoft,
  iconColor: colors.info,
};

export const categoryStyle = name => CATEGORY_STYLES[name] ?? FALLBACK;

export default categoryStyle;
