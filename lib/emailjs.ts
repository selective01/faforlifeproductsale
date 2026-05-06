// lib/emailjs.ts
// ─────────────────────────────────────────────
// EmailJS config — reads from .env.local
//
// Setup:
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (Gmail recommended)
// 3. Create an Email Template with these variables:
//    {{product}}, {{price}}, {{from_name}}, {{phone}},
//    {{quantity}}, {{address}}, {{state}}
// 4. Fill in your real IDs in .env.local
// ─────────────────────────────────────────────

export const EMAILJS_CONFIG = {
  SERVICE_ID:  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? '',
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
  PUBLIC_KEY:  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? '',
}
