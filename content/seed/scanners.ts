// Seed scanner/app data — rendered on the App & Scanner Comparison page when
// the Sanity CMS has no entry for a given slug. Sanity entries always take
// precedence over seed entries with the same slug.
//
// All verdicts are independent assessments. Evaluation criteria: what the
// technology actually does technically, peer-reviewed accuracy data (PubMed,
// JAAD, BJD), limitations not disclosed in marketing, and funding sources
// for company-cited studies.

import type { VerdictRating } from '@/components/scanner/VerdictBadge'

export interface SeedScanner {
  _id: string
  name: string
  slug: string
  technology: string
  verdictRating: VerdictRating
  verdict: string
  worthItFor: string[]
  notForYouIf: string[]
}

export const SEED_SCANNERS: SeedScanner[] = [
  {
    _id: 'seed-inci-beauty',
    name: 'INCI Beauty',
    slug: 'inci-beauty',
    technology: 'EU CosIng ingredient decoder — identification, regulatory status, origin',
    verdictRating: 'worth-it',
    verdict:
      'INCI Beauty is a French app that decodes ingredient lists using the EU CosIng database and published toxicological references. Unlike Think Dirty or EWG, it focuses on what an ingredient is rather than assigning it an arbitrary "danger" score. It shows EU regulatory status, common function categories, and known sensitisation potential — with appropriate context. The most honest and scientifically grounded ingredient scanner currently available for iOS and Android. Most useful for understanding unfamiliar INCI names; not a substitute for dermatological assessment of whether a product suits your specific skin.',
    worthItFor: [
      'Decoding unfamiliar INCI ingredient names',
      'Checking EU regulatory status of a specific ingredient',
      'Understanding what a functional category does (e.g. emollient vs. humectant)',
    ],
    notForYouIf: [
      'Assessing whether a complete formulation is suitable for your skin',
      'Diagnosing skin reactions — that requires a dermatologist or controlled patch testing',
    ],
  },
  {
    _id: 'seed-think-dirty',
    name: 'Think Dirty',
    slug: 'think-dirty',
    technology: 'Ingredient safety scanner — proprietary 0–10 "dirty" hazard score',
    verdictRating: 'limited',
    verdict:
      'Think Dirty assigns every ingredient a "dirty" score from 0–10 based on hazard classification data. The methodology conflates hazard with risk: an ingredient flagged as harmful at high doses in an animal study receives a high dirty score regardless of the trace concentration it appears in at in a face cream. This is the same logical error as rating water dangerous because humans can drown in it. The scores are not peer-reviewed, and the app operates a product marketplace that benefits commercially from high dirty scores on competitor ingredients. An ingredient lookup tool; not an accurate safety-assessment tool.',
    worthItFor: [
      'Looking up what an ingredient is called and what it does',
      'As a starting point before cross-referencing with CosIng or PubMed',
    ],
    notForYouIf: [
      'Making purchasing or safety decisions based on the numerical score alone',
      'Assessing ingredient safety at the concentrations actually used in the product',
    ],
  },
  {
    _id: 'seed-ewg-skin-deep',
    name: 'EWG Skin Deep',
    slug: 'ewg-skin-deep',
    technology: 'Online ingredient hazard database — 1–10 hazard score across 70,000+ products',
    verdictRating: 'limited',
    verdict:
      'The Environmental Working Group\'s Skin Deep database rates over 70,000 cosmetic products on a 1–10 hazard scale. Like Think Dirty, it uses hazard-based rather than risk-based assessment, without accounting for concentration or exposure context. The EWG is an advocacy organisation, not a scientific body, and its ratings are systematically more conservative than regulatory consensus — they frequently contradict positions held by the FDA, EU Scientific Committee on Consumer Safety (SCCS), and AAD. Useful as a large ingredient lookup; not reliable as a safety authority. The scoring methodology has been publicly criticised by toxicologists and dermatologists for creating unwarranted concern.',
    worthItFor: [
      'Cross-referencing ingredient names across a large product database',
      'Learning which ingredients are under active regulatory review',
    ],
    notForYouIf: [
      'Risk-based safety assessment at realistic use concentrations',
      'Making decisions based on the 1–10 score as a safety signal',
    ],
  },
  {
    _id: 'seed-cosdna',
    name: 'CosDNA',
    slug: 'cosdna',
    technology: 'Online ingredient analysis — comedogenicity and irritation scoring',
    verdictRating: 'limited',
    verdict:
      'CosDNA is widely used to check whether ingredients might be comedogenic (pore-clogging). The problem is its comedogenicity data source: rabbit ear assays conducted in the 1970s and 1980s that have been repeatedly criticised by dermatologists as poorly predictive of human acne. Multiple ingredients routinely flagged by CosDNA as high-comedogenicity are used safely by acne-prone individuals. The correlation between rabbit ear assay results and human comedogenicity is weak. Useful as an ingredient lookup tool; treat the comedogenicity scores — specifically the numerical ratings — with significant scepticism.',
    worthItFor: [
      'Looking up ingredient INCI names and general functions',
      'As a starting point before cross-referencing with primary literature',
    ],
    notForYouIf: [
      'Making acne-trigger decisions based on comedogenicity scores — the methodology is not validated for humans',
      'Replacing patch testing or dermatologist assessment of your specific skin reactions',
    ],
  },
  {
    _id: 'seed-skinvision',
    name: 'SkinVision',
    slug: 'skinvision',
    technology: 'AI skin lesion assessment — smartphone image analysis with risk classification',
    verdictRating: 'depends',
    verdict:
      'SkinVision uses AI pattern recognition to classify skin lesions from smartphone photos into risk categories. It holds CE marking as a Class IIa medical device in Europe and has published validation data showing approximately 77–80% sensitivity for malignant lesions under controlled study conditions. For context, trained dermatologists using a clinical dermoscope achieve sensitivity above 90% for melanoma. As a standalone diagnostic tool it is not sufficient, and a negative result should not be used to avoid professional evaluation. As a monitoring and early-alert tool for people with limited dermatology access, the value proposition is more defensible — but algorithm performance on dark skin tones has limited published validation, which is a meaningful gap.',
    worthItFor: [
      'Monitoring known lesions for changes over time as a supplement to professional care',
      'Initial triage in areas with limited or expensive dermatology access',
    ],
    notForYouIf: [
      'Replacing annual full-body skin checks by a dermatologist',
      'Ruling out skin cancer based on a low-risk result',
      'Very dark skin tones — validated performance data for deep skin tones is limited',
    ],
  },
  {
    _id: 'seed-miiskin',
    name: 'Miiskin',
    slug: 'miiskin',
    technology: 'Mole documentation and size-tracking — structured photo archive with comparison',
    verdictRating: 'worth-it',
    verdict:
      'Miiskin is not a diagnostic tool — it is a documentation tool, and that restraint is its strength. It helps users photograph, label, and track moles and skin lesions over time so that changes are objectively visible across months. The AAD recommends monthly self-skin exams, and consistent photo documentation is a rational complement to that practice. If you bring a structured, dated photo history to a dermatologist appointment, it may meaningfully improve the clinical encounter. Miiskin does not attempt to diagnose, which means it does not mislead. Verdict: worth it as a documentation discipline, within clearly stated limits.',
    worthItFor: [
      'Consistent mole documentation and change tracking over months or years',
      'Preparing for and enhancing annual dermatology appointments',
      'Following a dermatologist\'s instruction to monitor a specific lesion',
    ],
    notForYouIf: [
      'Diagnosing or risk-assessing lesions yourself — the app cannot and does not do this',
      'Replacing professional skin checks, which remain essential',
    ],
  },
  {
    _id: 'seed-curology',
    name: 'Curology',
    slug: 'curology',
    technology: 'Telehealth prescription skincare — custom compounded Rx formulas from licensed practitioners',
    verdictRating: 'worth-it',
    verdict:
      'Curology is qualitatively different from every other tool on this page: it provides actual prescriptions from licensed healthcare practitioners (physician assistants, nurse practitioners, and MDs) — not AI-generated recommendations. Formulations typically combine tretinoin (a prescription retinoid with one of the strongest evidence bases in dermatology) with ingredients like niacinamide, azelaic acid, or clindamycin. At roughly $30–40/month including consultations, it is significantly cheaper than a private dermatology appointment with comparable access to prescription-strength ingredients. Primary caveat: quality varies by practitioner, and a subscription business model may create conservative prescribing incentives. Not a replacement for in-person dermatology for complex conditions.',
    worthItFor: [
      'Access to prescription tretinoin without an in-person dermatology appointment',
      'Evidence-based acne treatment at substantially lower cost than a derm visit',
      'People without dermatology insurance coverage or in areas with long wait times',
    ],
    notForYouIf: [
      'Complex conditions requiring physical examination (possible skin cancer, severe cystic acne needing oral treatment, autoimmune skin conditions)',
      'Anyone who already has a good relationship with a dermatologist',
      'Expecting the same clinical depth as an in-person consultation',
    ],
  },
  {
    _id: 'seed-neutrogena-skin360',
    name: 'Neutrogena Skin360',
    slug: 'neutrogena-skin360',
    technology: 'Discontinued face scanner — 30× magnifying iPhone attachment with AI pore analysis',
    verdictRating: 'not-recommended',
    verdict:
      'Neutrogena launched the Skin360 face scanner in 2018 — a 30× magnifying iPhone attachment using fluorescent light and AI analysis to assess pores, dark spots, and fine lines. It was quietly discontinued within two years. The hardware is no longer available or supported. Included here as an important case study: a major consumer brand launched a premium "science-backed" skin scanner, positioned it as clinical-grade technology, and withdrew it without ever publishing peer-reviewed accuracy data or obtaining FDA clearance as a medical device. The pattern — consumer hardware scanner with clinical-sounding language, no independent validation, discontinued — is worth knowing because similar products continue to launch under different brand names.',
    worthItFor: ['N/A — product discontinued and no longer supported'],
    notForYouIf: ['Everyone — hardware is unavailable; included as a historical case study'],
  },
]
