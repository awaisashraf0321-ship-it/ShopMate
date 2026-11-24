// One typeface (Plus Jakarta Sans), one scale.
// The smallest sizes (label, caption, overline) are a step larger than usual
// on purpose: many ShopMate users have weaker eyesight or older phones.
//
// Sizes are fixed points, not screen-height ratios, so text keeps the same
// size on every phone and still respects the user's accessibility text size.
// Each weight is a separate font file, so never add `fontWeight` on top:
// pick the variant whose family already has the weight you want.

export const fontFamily = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semiBold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
  extraBold: 'PlusJakartaSans-ExtraBold',
};

export const typography = {
  display: { fontFamily: fontFamily.extraBold, fontSize: 32, lineHeight: 38 }, // big amounts
  h1: { fontFamily: fontFamily.extraBold, fontSize: 24, lineHeight: 30 }, // screen titles
  h2: { fontFamily: fontFamily.bold, fontSize: 20, lineHeight: 26 }, // section titles
  title: { fontFamily: fontFamily.bold, fontSize: 18, lineHeight: 24 },
  subtitle: { fontFamily: fontFamily.semiBold, fontSize: 16, lineHeight: 22 },
  body: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22 },
  bodyStrong: { fontFamily: fontFamily.semiBold, fontSize: 15, lineHeight: 22 },
  label: { fontFamily: fontFamily.semiBold, fontSize: 15, lineHeight: 20 },
  caption: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 20 },
  overline: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
};

export default typography;
