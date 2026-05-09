// lib/products.ts
// ─────────────────────────────────────────────
// EVERY section of the landing page is controlled from here.
// To edit any product's page content, only edit this file.
// To add a new product, copy an existing object and update all fields.
// ─────────────────────────────────────────────

export interface Video { id: string; title: string; person: string }
export interface Testimonial { name: string; location: string; text: string }

export interface Product {
  // ── Core ──────────────────────────────────
  slug: string           // URL: /faforon → www.faforlifeproductsale.online/faforon
  name: string           // e.g. 'FAFORON'
  price: string          // e.g. '₦13,000'
  image: string          // e.g. '/images/faforon-540ml.png'
  accentColor: string    // page accent hex e.g. '#22a83c'
  whatsapp: string       // WhatsApp number e.g. '2348012345678'
  callNumber: string     // Call number displayed in contact section e.g. '+234 800 000 0000'

  // ── Hero section ──────────────────────────
  heroHeadline: string   // big headline e.g. 'STOP THE PAIN, REBUILD YOUR BLOOD WITH FAFORON'
  heroTagline: string    // paragraph below headline
  heroCtaLabel: string   // button text e.g. 'CLICK TO ORDER'

  // ── Numbers Don't Lie section ─────────────
  facts1: string[]       // first bullet group (3–5 items)
  orangeBannerText: string // e.g. 'SICKLE CELL CRISES CAN BE LIFE-ALTERING'
  facts2: string[]       // second bullet group (2–3 items)
  yellowButtonText: string // e.g. 'ARE YOU NOT TIRED OF NEEDING MONTHLY TRANSFUSIONS?'

  // ── Story section ────────────
  BannerText: string  // green banner e.g. 'MEET MRS VIVIAN WHO TOOK A LOT OF DRUGS...'
  aboutStory: string[]      // paragraphs — italic if starts with "

  // ── Testimonials section ──────────────────
  testimonials: Testimonial[]

  // ── Follow Our Testifiers (main videos) ───
  videos: Video[]           // stacked full-width

  // ── "So What Will You Do" section ─────────
  soWhatText: string        // e.g. 'SO WHAT WILL YOU DO IF WE TELL YOU FAFORON CAN PREVENT SICKLE CELL CRISES?'

  // ── Health Practitioners section ──────────
  practitionersLabel: string     // e.g. 'WHAT HEALTH PRACTITIONERS SAY ABOUT FAFORON'
  practitionerVideos: Video[]    // 3-column video card grid

  // ── Stats + Trust section ─────────────────
  statHeadline: string     // e.g. 'YOUR LOVED ONE HAS HAD 67 PAIN CRISES IN 2 YEARS...'
  statSubline: string      // e.g. 'STATISTIC: Over 2,000,000 health testimonials...'
  trustBadges: string[]    // bullet list items
  finalTagline: string     // e.g. 'TURN PAINFUL CRISES INTO PAIN-FREE FUTURES.'

  // ── Footer ────────────────────────────────
  footerTagline: string    // e.g. 'IN THIS GENERATION MAKE HEALTH YOUR PRIORITY'
}

const WA = '2347025797628' // ← Replace with real WhatsApp number
const CALL = '+2347025797628' // ← Replace with real call number

const products: Product[] = [

  // ── FAFORON ──────────────────────────────────────────
  {
    slug: 'faforon',
    name: 'FAFORON',
    price: '₦13,000',
    image: '/images/faforon-540ml.png',
    accentColor: '#22a83c',
    whatsapp: WA,
    callNumber: CALL,

    // Hero
    heroHeadline: 'STOP THE PAIN, REBUILD YOUR BLOOD WITH FAFORON',
    heroTagline: 'The powerful, natural stem cell formula trusted by millions to help curb sickle cell crises, build healthy blood cells and strengthen your immune system naturally. Builds blood, boosts immunity, energizes and rejuvenates your body naturally.',
    heroCtaLabel: 'CLICK TO ORDER',

    // Numbers Don't Lie
    facts1: [
      "IT’S ONE OF THE MOST COMMON GENETIC DISORDERS WORLDWIDE. OVER 20 MILLION PEOPLE LIVE WITH SICKLE CELL DISEASE, AND MILLIONS MORE CARRY THE TRAIT.",
      'BY AGE 18, MANY SICKLE CELL WARRIORS HAVE ALREADY SPENT MORE TIME IN HOSPITALS THAN IN CLASSROOMS.',
      'BY AGE 20, 1 in 4 SICKLE CELL PATIENTS HAVE HAD A SILENT STROKE.',
      'PARENTS OF CHILDREN WITH SICKLE CELL LOSE AN AVERAGE OF 15 WORKDAYS PER YEAR JUST FROM HOSPITAL VISITS; MANY LOSE THEIR JOBS OR GO INTO DEBT.',
    ],
    orangeBannerText: 'PAIN CRISES CAN BE LIFE-ALTERING.',
    facts2: [
      'SICKLE CELL CRISES AREN’T JUST PAINFUL, THEY’RE EXHAUSTING.',
      'THE STRESS OF UNPREDICTABLE CRISES AFFECTS YOUR ENTIRE FAMILY.',
    ],
    yellowButtonText: 'ARE YOU NOT TIRED OF NEEDING MONTHLY TRANSFUSIONS TO SURVIVE?',

    // Story
    BannerText: 'Meet Mrs. Grace Okonkwo, A Mother Whose 26-Year-Old Son Has Battled Sickle Cell Anemia Since Birth',
    aboutStory: [
      '"I will never forget the day I realized my son might not outlive me." - Mrs. Grace Okonkwo, 2025',
      'For 26 long years, Mrs. Grace has watched her son, Emeka, fight a war inside his own blood.',
      'The sudden midnight screams. The swollen hands and feet he’s had since he was a toddler. The endless hospital corridors. The doctors saying, "We’ve done all we can. Now we wait."',
      'Just like every other mother watching her child suffer, she has slept in plastic chairs beside his hospital bed more times than she can count. She has watched him cry from priapism (a painful, humiliating symptom no young man should endure). She has held his hand through silent strokes that stole pieces of his memory.',
      '"Last year alone, Emeka had 14 pain crises. Fourteen. That\'s more than one a month. Each one left him curled up on the floor, begging for it to stop. And all I could do was pray."',
      'At 26, Emeka should be building a career, starting a family, living. Instead, his body is failing, his kidneys are weakening, his lungs are scarred from acute chest syndrome, and his mother lives in fear of a phone call she knows could come any day.',
      '"People don\'t understand. They say \'sickle cell\' like it\'s just a word. But for me and my son, it has been 26 years of watching him die a little more every day."',
      ' Mrs. Grace finally decided: no more waiting for a cure that might never come in time. She needed something that works now - to rebuild his blood, reduce the crises, and give her son a real chance to live.',
      'That’s when she found Faforon.',
      '"Three months later, my son is no longer a prisoner in his own body."',
      'I was skeptical at first. How could a natural supplement do what years of hospital visits couldn\'t? But I was desperate. Emeka had just come out of a 9-day pain crisis that nearly took his life. I ordered Faforon that same week.',
      'The first change was small but powerful. After just two weeks, Emeka said, \'Mum, I haven\'t woken up tired in three days.\' For a young man who had lived with chronic fatigue his entire life, that was a miracle.',
      'By the end of the first month, his color changed. His eyes, which were always pale yellow from jaundice, started clearing. His gums, once white from severe anemia, turned pink again.',
      'Month two: he went 28 days without a single pain crisis. Twenty-eight days. That hadn\'t happened since he was a small child. He started leaving his room. He even joked with his siblings again.',
      'Now, three months in, Emeka has had only 2 mild crises, compared to 14 severe ones the year before. He stopped missing work. He started dating. For the first time in his life, he talks about the future.',
      'Mrs. Grace smiles now when she speaks about her son: "Faforon didn\'t just build his blood. It gave me back my son. And it gave him back his life."',
    ],

    // Testimonials
    testimonials: [
      { name: 'ADEOLA', location: 'Lagos', text: "Since I started taking Faforon, the frequency of my pain crises has dropped dramatically. I have more energy and I’m not in the hospital every month. This product gave me my life back." },
      { name: 'MRS. CHIBUZOR', location: 'Abuja', text: "My daughter used to miss weeks of school because of sickle cell pain. After three months on Faforon, she’s stronger, happier, and her blood levels have improved." },
      { name: 'MISS MARY', location: 'Lagos', text: 'I have Sickle Cell Anemia, & I was having crises, but since I started using Faforon it boosted my immune very fast & the crises have stopped. I recommend Faforon for every blood/immune related cases.' },
      { name: 'ENE ASUQUO', location: 'Calabar ', text: 'For 24 years, sickle cell pain crises ruled my life. I started Faforon after a crisis left me bedridden for a week. Within two months, my crises dropped from 2–3 per month to nearly zero. Faforon gave me a life I never thought possible.' },
      { name: 'MRS. NGOZI EDEH', location: 'Jos', text: 'I am a mother of a 12-year-old sickle cell warrior. Watching my son Chinedu suffer constant crises was a nightmare. After one month on Faforon, his energy and appetite improved. Three months later, he hasn\'t missed a single school day due to pain. Faforon blessed our family with a happy child.' },
      { name: 'IFEOMA OKEKE', location: 'Anambra', text: 'My 16-year-old son had missed school for months due to sickle cell fatigue. After 8 weeks on Faforon, his hemoglobin levels improved and he no longer needs monthly blood transfusions. He just passed his exams and plays football with friends again. Faforon turned my weeping son into a laughing boy.' },
    ],

    // Main videos — Follow Our Testifiers (stacked full width)
    videos: [
      { id: '/videos/faforon_video_testimony(1).mp4', title: 'MY EXPERIENCE WITH FAFORON', person: 'Mrs. Vivian O.' },
      { id: '/videos/faforon_video_testimony(2).mp4', title: 'HOW FAFORON CHANGED MY HEALTH', person: 'Emeka Obi' },
      { id: '/videos/faforon_video_testimony(3).mp4', title: 'HOW FAFORON CHANGED MY HEALTH', person: 'Emeka Obi ' },
    ],

    // So What Will You Do
    soWhatText: 'SO WHAT WILL YOU DO IF WE TELL YOU FAFORON CAN PREVENT SICKLE CELL CRISES?',

    // Health Practitioners — 3-column video grid
    practitionersLabel: 'WHAT HEALTH PRACTITIONERS SAY ABOUT FAFORON',
    practitionerVideos: [
      { id: '/videos/professor_fafure.mp4', title: 'PROFESSOR FAFURE DISSECTING FAFORON\'S HEMATOPOIETIC PATHWAY', person: 'CHIEF PRODUCT DEVELOPMENT SCIENTIST' },
      { id: '/videos/medical_practitioner.mp4', title: 'A MEDICAL PRACTITIONER EXCERPT ON THE EFFICACY FAFORON', person: 'MEDICAL DOCTOR' },
      { id: '/videos/health_practitioner_nurse(2).mp4', title: 'A NURSE EDUCATING HER SICKLE CELL WARRIORS ABOUT FAFORON - PART 2', person: 'NURSE PRACTITIONER' },
      { id: '/videos/health_practitioner_nurse(1).mp4', title: 'A NURSE EDUCATING HER SICKLE CELL WARRIORS ABOUT FAFORON', person: 'NURSE PRACTITIONER' },
    ],

    // Stats + Trust Badges
    statHeadline: 'YOUR LOVED ONE HAS HAD 67 PAIN CRISES IN 2 YEARS. HOW MANY MORE BEFORE YOU TRY SOMETHING DIFFERENT?',
    statSubline: 'STATISTIC: Over 2,000,000 health testimonials from satisfied users across Nigeria.',
    trustBadges: [
      'NAFDAC Reg No: 04-8322L.',
      '100% organic formulation.',
      'No false claims.',
      'Trusted by health practitioners since 2002.',
    ],
    finalTagline: 'TURN PAINFUL CRISES INTO PAIN-FREE FUTURES.',

    // Footer
    footerTagline: 'IN THIS GENERATION MAKE HEALTH YOUR PRIORITY',
  },

  /*
  // ── SALUD HERBAL ──────────────────────────────────────────
  {
    slug: 'salud-herbal',
    name: 'SALUD HERBAL',
    price: '₦20,000',
    image: '/images/salud-herbal.png',
    accentColor: '#2a9d8f',
    whatsapp: WA,

    heroHeadline: 'STAY HEALTHY WITH SALUD HERBAL',
    heroTagline: 'A next-generation organic stem cell supplement that heals, protects, and restores.',
    heroCtaLabel: 'CLICK TO ORDER',

    facts1: [
      'CHRONIC INFLAMMATION IS LINKED TO OVER 50% OF ALL DEATHS WORLDWIDE.',
      'LIVER DISEASE AFFECTS OVER 1.5 BILLION PEOPLE GLOBALLY.',
      'CARDIOVASCULAR DISEASE IS THE NUMBER ONE CAUSE OF DEATH IN NIGERIA.',
    ],
    orangeBannerText: "DON'T IGNORE YOUR BODY'S WARNING SIGNS",
    facts2: [
      'UNTREATED INFLAMMATION LEADS TO SERIOUS LONG-TERM ORGAN DAMAGE.',
      'NATURAL STEM CELL SUPPORT CAN HELP REVERSE CHRONIC HEALTH CONDITIONS.',
    ],
    yellowButtonText: 'SALUD HERBAL CAN HELP YOU — ORDER NOW',

    benefits: [
      'Anti-tumour properties',
      'Purifies and cleanses the blood',
      'Reduces chronic inflammation',
      'Supports cardiovascular health',
      'Prevents osteoporosis',
      'Helps with pile and haemorrhoids',
      'Protects the liver against toxins',
      'Stops diarrhoea',
      'Anti-bacterial and antiviral effects',
      'Alleviates symptoms of neurological diseases',
      'Alleviates symptoms of asthma',
    ],

    vivianBannerText: 'MEET MR TUNDE WHO SUFFERED FROM CHRONIC LIVER DISEASE FOR YEARS',
    aboutStory: [
      'Mr. Tunde had been battling elevated liver enzymes and chronic fatigue for over five years. Conventional medicine offered management but not recovery.',
      'His daughter discovered SALUD HERBAL and convinced him to try it alongside his prescribed treatment.',
      '"Within 8 weeks, my liver readings had improved significantly. My doctor asked what I had changed. SALUD HERBAL gave me my life back."',
    ],

    testimonials: [
      { name: 'Dr. Tunde F.', location: 'Lagos', role: 'Healthcare professional', text: 'I have recommended SALUD HERBAL to several patients with chronic inflammatory conditions. The feedback has been consistently positive. A remarkable natural product.' },
      { name: 'Mrs. Grace A.', location: 'Abuja', role: 'Verified buyer', text: 'I was dealing with chronic liver issues. Three months in and my liver enzyme readings have improved significantly. I am amazed.' },
      { name: 'Mr. Segun K.', location: 'Lagos', role: 'Verified buyer', text: 'My cardiovascular health has improved noticeably. My blood pressure is more stable and I feel so much more energetic day to day.' },
      { name: 'Mrs. Patience N.', location: 'Enugu', role: 'Verified buyer', text: 'I struggled with pile for years. SALUD HERBAL gave me relief within weeks. I wish I had found this product sooner.' },
    ],

    videos: [
      { id: 'REPLACE_WITH_YOUTUBE_ID', title: 'How SALUD HERBAL healed my body', person: 'Verified User' },
      { id: 'REPLACE_WITH_YOUTUBE_ID', title: 'SALUD HERBAL — my 30 day results', person: 'Verified User' },
      { id: 'REPLACE_WITH_YOUTUBE_ID', title: 'Why I switched to SALUD HERBAL', person: 'Verified User' },
    ],

    soWhatText: 'SO WHAT WILL YOU DO IF WE TELL YOU SALUD HERBAL CAN RESTORE YOUR HEALTH?',

    moreTestimonialsLabel: 'MORE TESTIMONIALS FROM OUR USERS',
    moreVideos: [
      { id: 'REPLACE_WITH_YOUTUBE_ID', title: 'My liver is healthy again', person: 'Verified User' },
      { id: 'REPLACE_WITH_YOUTUBE_ID', title: 'Inflammation gone in 6 weeks', person: 'Verified User' },
      { id: 'REPLACE_WITH_YOUTUBE_ID', title: 'SALUD HERBAL changed everything', person: 'Verified User' },
    ],

    practitionersLabel: 'WHAT HEALTH PRACTITIONERS SAY ABOUT SALUD HERBAL',
    practitionerVideos: [
      { id: 'REPLACE_WITH_YOUTUBE_ID', title: 'Doctor reviews SALUD HERBAL', person: 'Medical Doctor' },
      { id: 'REPLACE_WITH_YOUTUBE_ID', title: 'Nutritionist recommends SALUD', person: 'Nutritionist' },
      { id: 'REPLACE_WITH_YOUTUBE_ID', title: 'Pharmacist on stem cell supplements', person: 'Pharmacist' },
    ],

    statHeadline: 'MILLIONS SUFFER FROM CHRONIC DISEASE EVERY YEAR. WILL YOU BE ONE OF THEM?',
    statSubline: 'STATISTIC: Over 500,000 satisfied SALUD HERBAL users across Africa.',
    trustBadges: [
      'NAFDAC Approved.',
      '100% organic stem cell formulation.',
      'No harmful additives.',
      'Trusted by health professionals.',
    ],
    finalTagline: 'YOUR HEALTH IS YOUR GREATEST WEALTH.',

    footerTagline: 'IN THIS GENERATION MAKE HEALTH YOUR PRIORITY',
  },
  */

]

export default products

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
