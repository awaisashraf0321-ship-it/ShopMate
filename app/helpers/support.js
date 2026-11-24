// How customers reach the ShopMate team (used by "Forgot PIN?").
//
// SUPPORT_WHATSAPP: the team's WhatsApp number in international form without
// "+", e.g. '923001234567'. While it is empty, the Forgot PIN screen hides
// the WhatsApp button and only explains what to do.
//
// Resetting a forgotten PIN (until the server has its own "Forgot PIN"):
// an admin calls POST /api/AdminUser/ResetPassword with the user's id and
// newPassword built exactly like the app builds it, see pinPassword() in
// phoneAccount.js: `Sm#${newPin}-${phone}`, e.g. Sm#5821-03001234567.
// Then tell the customer their new 4-number PIN; they can change it in
// Profile > Change PIN.
export const SUPPORT_WHATSAPP = '';

/** wa.me link that opens WhatsApp with a ready-made message. */
export const whatsappLink = (number, message) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
