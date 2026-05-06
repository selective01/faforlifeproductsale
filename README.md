# Faforlife Product Landing Pages

**Live URL:** www.faforlifeproductsale.online  
**Stack:** Next.js 14, TypeScript, Tailwind CSS, EmailJS

---

## Product URLs

| Product | URL |
|---|---|
| FAFORON 540ML | /faforon-540ml |
| FAFORON 260ML | /faforon-260ml |
| SALUD HERBAL | /salud-herbal |
| SPIDEX 12 | /spidex-12 |
| SPIDEX 15 | /spidex-15 |
| SPIDEX 17 | /spidex-17 |
| SPIDEX 18 | /spidex-18 |
| SPIDEX 19 | /spidex-19 |
| SPIDEX 20 | /spidex-20 |
| PROSCLICK | /prosclick |
| MEN COFFEE | /men-coffee |
| GREEN COFFEE | /green-coffee |
| FAFORLIFE TOOTHPASTE | /faforlife-toothpaste |

---

## Getting Started

```bash
npm install
npm run dev
```
Visit http://localhost:3000 — it redirects to the first product page.

---

## Setup

### 1. EmailJS
Open `lib/emailjs.ts` and fill in your real IDs from emailjs.com:
```ts
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id',
  TEMPLATE_ID: 'your_template_id',
  PUBLIC_KEY: 'your_public_key',
}
```

Your EmailJS template should have these variables:
`{{product}}`, `{{price}}`, `{{from_name}}`, `{{phone}}`, `{{quantity}}`, `{{address}}`, `{{state}}`, `{{message}}`

### 2. WhatsApp Number
Open `lib/products.ts` and update the `WA` constant at the top:
```ts
const WA = '2348012345678' // Your real number without + or spaces
```

### 3. YouTube Videos
In `lib/products.ts`, replace `'REPLACE_WITH_YOUTUBE_ID'` with real video IDs:
```ts
// From: https://www.youtube.com/watch?v=dQw4w9WgXcQ
// ID is: dQw4w9WgXcQ
{ id: 'dQw4w9WgXcQ', title: 'My testimony', person: 'Mrs. Ada' }
```

### 4. Product Images
Drop images into `/public/images/` using these filenames:
- faforon-540ml.png
- faforon-260ml.png
- salud-herbal.png
- spidex-12.png ... etc.

Then in `components/ProductLandingPage.tsx`, replace the placeholder div with:
```tsx
import Image from 'next/image'

<div style={{ position: 'relative', width: '100%', height: '100%' }}>
  <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain' }} />
</div>
```

### 5. Adding a New Product (e.g. SPIDEX 21)
Just add a new object to the `products` array in `lib/products.ts`:
```ts
{
  slug: 'spidex-21',
  name: 'SPIDEX 21',
  subtitle: 'YOUR SUBTITLE',
  price: '₦14,000',
  ...
}
```
The page at `/spidex-21` will be created automatically. No other files to touch.

---

## Deployment (Vercel)
1. Push to GitHub
2. Connect repo to Vercel
3. Add `www.faforlifeproductsale.online` under Settings → Domains
