// Seeds the App & Scanner Comparison (Tool 1) with researched profiles of
// real, popular skincare apps and scanners. Writes directly to Sanity.
//
//   set -a; source .env.local; set +a; node scripts/seed-scanners.mjs
//
// Idempotent: createOrReplace with deterministic _ids.
//
// SOURCING: claims are grounded in independent research where it exists
// (BMJ/Cochrane systematic reviews, BJD 2022, the 2015 FTC actions) and
// company/vendor statements are labelled as such. Nothing is fabricated.

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!PROJECT_ID || !TOKEN) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in env.')
  process.exit(1)
}

const SCANNERS = [
  {
    id: 'curology',
    name: 'Curology',
    technology: 'Teledermatology — asynchronous photo review by licensed providers + custom-compounded prescriptions',
    whatItActuallyDoes: [
      'You submit photos and a skin history; a licensed medical provider reviews them and prescribes a custom topical that mixes prescription actives — commonly tretinoin, clindamycin, and azelaic acid — delivered by subscription.',
      'Crucially, this is real medical care reviewed by a person, not an algorithm scoring your selfie. The "personalization" is a clinician choosing actives and strengths for you.',
    ],
    researchAccuracy: [
      'The underlying actives (e.g. tretinoin for acne and photoaging) have strong human clinical evidence. The delivery model — teledermatology — is itself well validated for managing many acne cases.',
      'The honest caveat: asynchronous, photo-only review can miss what an in-person exam would catch, and care quality varies by individual provider.',
    ],
    knownLimitations: [
      'Conditions that mimic acne — rosacea, folliculitis, perioral dermatitis, fungal "acne", hidradenitis suppurativa — can be misjudged without an in-person assessment. Severe cystic acne, scarring, and pregnancy need closer, tailored care.',
      'It is a subscription: you are billed on an ongoing basis, and cancelling can take effort.',
    ],
    conflictOfInterest: [
      'Curology profits from ongoing prescriptions and selling its own formulations, so there is a commercial incentive to keep you subscribed — even though licensed providers are genuinely in the loop.',
    ],
    verdictRating: 'worth-it',
    verdict:
      'The most legitimately useful tool here — precisely because it is real medical care, not an algorithm grading a selfie. For mild-to-moderate acne, custom prescription topicals chosen by a licensed provider genuinely work, and the ingredients are well-evidenced. Just know it is a subscription, asynchronous review has limits, and anything severe or atypical still needs an in-person dermatologist.',
    worthItFor: [
      'Mild-to-moderate acne when seeing a dermatologist in person is hard',
      'People who want prescription-strength actives (like tretinoin) with provider oversight',
    ],
    notForYouIf: [
      'You have severe cystic acne, scarring, or possible rosacea / other mimics that need in-person diagnosis',
      'You are pregnant or breastfeeding (some actives are off-limits and need tailored care)',
      'You do not want a recurring subscription',
    ],
    citations: [
      { label: 'Healthline — independent Curology review', url: 'https://www.healthline.com/health/skin/curology-review' },
      { label: 'PubMed — teledermatology for acne (evidence base)', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=teledermatology+acne+management' },
    ],
  },
  {
    id: 'skinvision',
    name: 'SkinVision',
    technology: 'AI image analysis of a single mole/lesion (smartphone camera) + skin-cancer risk algorithm',
    whatItActuallyDoes: [
      'You photograph one specific mole or spot; a convolutional-neural-network algorithm returns a low/high risk rating and tells you whether to get it checked. Some markets add review by a dermatologist and lesion tracking over time.',
      'It is a medical-risk triage tool aimed at skin cancer — not a cosmetic or routine-building app.',
    ],
    researchAccuracy: [
      'Independent evidence is weaker and messier than the company’s headline numbers. SkinVision cites studies reporting ~95% sensitivity; a 2020 BMJ systematic review pooled the evidence at roughly 80% sensitivity and 78% specificity and judged the studies small and low-quality.',
      'A 2022 prospective study of 1,204 lesions found the app over-flagged many benign spots and that performance swung widely (sensitivity ~41–83%) depending on the reference standard used. These are human-lesion studies, but prone to selective recruitment.',
    ],
    knownLimitations: [
      'It can miss real melanomas (false negatives) and over-flag harmless spots (false positives), driving anxiety and unnecessary visits. Real-world accuracy by ordinary users is likely worse than in studies.',
      'It assesses one spot at a time, struggles with hard-to-photograph areas, and its CE Class I mark is largely self-certified — not the same as rigorous diagnostic clearance.',
    ],
    conflictOfInterest: [
      'Several of the strongest accuracy figures come from studies funded or co-authored by the company, and independent reviewers have argued its reported sensitivity/specificity were likely overestimated by study design. It is a paid product, so there is incentive to emphasise favourable numbers.',
    ],
    verdictRating: 'depends',
    verdict:
      'A genuine medical-risk tool, not a cosmetic gimmick — but treat it strictly as a prompt to see a doctor, never a substitute for one. It is CE-marked in Europe and NOT FDA-cleared in the US, and independent research says it both misses some cancers and over-flags benign spots. Useful as an extra nudge to get a worrying mole examined; dangerous if a "low risk" result falsely reassures you.',
    worthItFor: [
      'People in the EU who want a low-cost nudge to get a changing mole professionally checked',
      'Tracking a known spot over time alongside — never instead of — dermatologist visits',
    ],
    notForYouIf: [
      'You are in the US and expect an FDA-cleared diagnosis (it is not)',
      'You would use a "low risk" result to avoid seeing a doctor about a worrying mole',
      'You want cosmetic or routine analysis — that is not what this does',
    ],
    citations: [
      { label: 'BMJ (2020) — systematic review of skin-cancer risk apps (Freeman et al.)', url: 'https://pubmed.ncbi.nlm.nih.gov/32041693/' },
      { label: 'Dermatology (2022) — over-detection of melanoma-suspect lesions by a CE-certified app', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9367531/' },
      { label: 'SkinVision — company’s own scientific-evidence page (vendor claims)', url: 'https://www.skinvision.com/scientific-evidence' },
    ],
  },
  {
    id: 'effaclar-spotscan',
    name: 'La Roche-Posay Effaclar Spotscan+',
    technology: 'AI acne face-mapping from 3 photos → severity grade (0 to 4+) + product recommendations (L’Oréal / La Roche-Posay)',
    whatItActuallyDoes: [
      'You take three photos; the app counts blackheads, inflammatory spots, and post-acne marks, then assigns an overall acne severity grade modelled on clinical grading scales. It tracks progress over time and recommends La Roche-Posay products.',
    ],
    researchAccuracy: [
      'More grounded than generic "skin score" apps, because acne lesion grading is a recognised clinical task. La Roche-Posay built the algorithm on 6,000+ images graded by dermatologists across skin types and acne severities.',
      'That said, we found no independent peer-reviewed accuracy study, and like all photo grading it remains sensitive to lighting and image quality.',
    ],
    knownLimitations: [
      'It grades acne severity — it does not diagnose. It cannot reliably tell acne apart from look-alike conditions, and all recommendations are confined to one brand’s range.',
      'Not a substitute for a dermatologist for moderate-to-severe or scarring acne.',
    ],
    conflictOfInterest: [
      'A free tool owned by L’Oréal / La Roche-Posay that recommends the brand’s own products. Useful, but the incentive is brand-aligned.',
    ],
    verdictRating: 'depends',
    verdict:
      'One of the more grounded brand tools, because acne grading is a real clinical task and it was trained on dermatologist-graded images. Genuinely handy for tracking breakout severity over time for free — just remember it grades rather than diagnoses, and every recommendation is a La Roche-Posay product.',
    worthItFor: [
      'Tracking mild-to-moderate acne severity and progress for free',
      'A starting point before deciding whether to see a dermatologist',
    ],
    notForYouIf: [
      'You have moderate-to-severe, painful, or scarring acne (see a dermatologist)',
      'You want recommendations beyond a single brand’s range',
    ],
    citations: [
      { label: 'L’Oréal — La Roche-Posay Spotscan+ (vendor)', url: 'https://www.loreal.com/en/articles/science-and-technology/la-roche-posay-spotscan/' },
      { label: 'Strategy — La Roche-Posay launches AI acne analysis', url: 'https://strategyonline.ca/2019/03/28/la-roche-posay-offers-acne-analyses-via-ai/' },
    ],
  },
  {
    id: 'proven-skincare',
    name: 'Proven Skincare (MUSE)',
    technology: 'Questionnaire-driven recommendation engine (a proprietary "Skin Genome" database) → custom-blended products',
    whatItActuallyDoes: [
      'You answer a detailed questionnaire about your skin, environment, and lifestyle; an algorithm matches your answers against a large database of ingredients, products, and reviews to produce custom-blended skincare.',
      'There is no image analysis here — it is recommendation matching, not diagnosis.',
    ],
    researchAccuracy: [
      'The "AI" is a recommendation system over a proprietary database, not a clinically validated diagnostic. The individual actives it selects may be evidence-based, but we found no independent peer-reviewed evidence that its custom blends outperform a well-chosen off-the-shelf routine.',
    ],
    knownLimitations: [
      'Personalization is only as good as a self-reported questionnaire. "Custom" does not guarantee better results than a simple, evidence-based routine — and it is a subscription.',
    ],
    conflictOfInterest: [
      'The company sells the formulas its own algorithm recommends, and the "AI / skin genome" framing is itself a marketing differentiator.',
    ],
    verdictRating: 'depends',
    verdict:
      'A questionnaire-based product-matching service dressed in "AI" and "skin genome" language. The actives can be perfectly fine, but there is no independent evidence the custom blends beat a sensible off-the-shelf routine. Worth it only if you value the convenience of personalization — not because the "AI" is doing anything clinically proven.',
    worthItFor: [
      'People who want a guided, convenient personalized routine and do not mind a subscription',
    ],
    notForYouIf: [
      'You want proof that "custom" outperforms standard evidence-based products (there is not any)',
      'You prefer to choose individual, well-studied actives yourself',
    ],
    citations: [
      { label: 'PubMed — evidence base for questionnaire-based personalized skincare', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=personalized+skincare+efficacy' },
    ],
  },
  {
    id: 'youcam-perfect-corp',
    name: 'YouCam / Perfect Corp Skin Analysis',
    technology: 'Selfie-based AI "skin score" (computer vision) — consumer app and brand retail tool',
    whatItActuallyDoes: [
      'From a single selfie it scores attributes like moisture, oiliness, redness, acne, spots, wrinkles, texture, and dark circles, gives an overall "skin score", and recommends products. It is also deployed widely by beauty brands as an e-commerce conversion tool.',
    ],
    researchAccuracy: [
      'The company says the model was trained on 70,000+ clinical images and "verified by dermatologists." We found no independent, peer-reviewed validation of its accuracy.',
      'Photo-based scoring is highly sensitive to lighting, camera, and angle, and "skin score" is not a standardised clinical metric. Treat the numbers as engagement features, not measurements.',
    ],
    knownLimitations: [
      'Scores can swing with lighting and filters; the "skin score" is proprietary and not comparable to any clinical scale; recommendations steer toward the deploying brand’s products.',
    ],
    conflictOfInterest: [
      'This is fundamentally a sales tool — Perfect Corp markets a ~14x sales uplift to brands that deploy it. The incentive is conversion, not neutral assessment, and product recommendations favour whichever brand is running it.',
    ],
    verdictRating: 'limited',
    verdict:
      'Fun and slick, but be clear about what it is: a beauty-retail conversion tool, not a clinical assessment. The "skin score" is not a standardised medical metric, the accuracy is not independently validated, and the recommendations exist to sell product. Fine as a mirror with opinions; do not make health decisions on it.',
    worthItFor: [
      'A rough, free starting point to notice areas you might want to read up on',
      'Playing with virtual try-on and product visualization',
    ],
    notForYouIf: [
      'You want an objective or clinical skin assessment',
      'You will treat the product recommendations as unbiased advice',
    ],
    citations: [
      { label: 'Cosmetics Business — how Perfect Corp’s YouCam skin analysis works', url: 'https://cosmeticsbusiness.com/perfect-corp-helps-consumers-understand-their-skin-with-diagnostic-app-170106' },
      { label: 'Perfect Corp — enterprise skin analysis (vendor; markets sales uplift)', url: 'https://www.perfectcorp.com/business' },
    ],
  },
  {
    id: 'olay-skin-advisor',
    name: 'Olay Skin Advisor',
    technology: 'Selfie-based AI "Skin Age" estimate + questionnaire → Olay product matching (P&G)',
    whatItActuallyDoes: [
      'Take a selfie; a model trained on ~50,000 selfies estimates a "skin age" and flags the zones driving it, then asks follow-up questions and recommends Olay products.',
    ],
    researchAccuracy: [
      'Olay reports ~90% accuracy for its skin-age estimate — a company figure. "Skin age" is a constructed, proprietary metric, not a clinical diagnosis, and we found no independent peer-reviewed validation.',
      'P&G has publicly noted the tool drove a ~200% conversion uplift, which tells you its primary job.',
    ],
    knownLimitations: [
      'The "skin age" number can feel authoritative but is not medically standardised, and every recommendation is confined to Olay’s catalogue.',
    ],
    conflictOfInterest: [
      'Built and owned by the brand whose products it recommends; its documented success metric is conversion, not accuracy.',
    ],
    verdictRating: 'limited',
    verdict:
      'A polished selfie-to-"skin age" marketing tool from a single brand. The skin-age number is a proprietary construct, not a clinical measure, and every recommendation routes to Olay. Harmless fun; not a neutral or medical assessment.',
    worthItFor: [
      'A free, lighthearted look at which zones photograph as "older"',
      'Olay shoppers who want a product starting point',
    ],
    notForYouIf: ['You want brand-neutral or clinically meaningful analysis'],
    citations: [
      { label: 'Global Cosmetic Industry — Olay Skin Advisor', url: 'https://www.gcimagazine.com/brands-products/skin-care/news/21853708/skin-analysis-thats-a-snap-of-a-selfie-thanks-to-olay' },
    ],
  },
  {
    id: 'foreo-luna',
    name: 'FOREO LUNA (fofo / play smart)',
    technology: 'Handheld cleansing-brush device with moisture / "skin age" sensors + companion app',
    whatItActuallyDoes: [
      'A cleansing-brush device with sensors you hold to different face zones; the app reports a moisture index and a "skin age", then syncs a customised cleansing intensity and duration back to the device.',
    ],
    researchAccuracy: [
      'The "skin analysis" is a simple moisture/impedance-style sensor reading plus an app-generated "skin age" — not validated diagnostic measurement. We found no independent peer-reviewed accuracy evidence; the analysis mainly exists to personalise and sell the cleansing device.',
    ],
    knownLimitations: [
      'Single-sensor moisture readings are crude and momentary, "skin age" is a proprietary number, and the whole analysis is tied to a device you must buy.',
    ],
    conflictOfInterest: [
      'The "analysis" is a feature that helps sell hardware; the incentive is device sales, not neutral measurement.',
    ],
    verdictRating: 'limited',
    verdict:
      'The skin "analysis" is essentially a moisture sensor plus a made-up "skin age", bundled to justify a cleansing gadget. The cleansing brush itself may be pleasant to use, but do not buy it for the analytics — there is no independent evidence the readings mean much.',
    worthItFor: [
      'People who already want a cleansing device and treat the readings as a novelty',
    ],
    notForYouIf: ['You are buying it for meaningful skin measurement or diagnosis'],
    citations: [
      { label: 'FOREO — LUNA play smart skin analysis (vendor)', url: 'https://www.foreo.com/luna-play-smart-collection' },
    ],
  },
  {
    id: 'generic-ai-skin-score-apps',
    name: 'Generic AI "Skin Score" Selfie Apps',
    technology: 'App-store selfie apps (Skincare Pro, Face Age, GlamAR, Skinive, and many more) that output an AI "skin score" plus routine and product recommendations',
    whatItActuallyDoes: [
      'A large genre of app-store apps take a selfie and return scores across "concerns" (wrinkles, pores, spots, hydration, and so on), generate a routine, and surface product links or subscriptions. A few (e.g. Skinive) carry a CE mark for skin-condition assessment; most are wellness or entertainment apps.',
    ],
    researchAccuracy: [
      'As a category, independent evidence is weak. Systematic reviews of consumer skin apps (BMJ 2020; Cochrane) found small, low-quality studies and real-world performance likely worse than advertised — and that is for the medically-oriented ones. The purely cosmetic "skin score" apps generally have no peer-reviewed validation at all.',
      'Results vary with lighting, camera, and filters, and "scores" are not comparable between apps.',
    ],
    knownLimitations: [
      'Scores are not standardised or meaningful across apps; many push subscriptions or affiliate product links; headline claims like "250+ concerns from one selfie" are marketing, not medicine.',
    ],
    conflictOfInterest: [
      'Most monetise through subscriptions, affiliate product links, or by selling the analysis as a SaaS tool to brands — every one of those incentives favours engagement and conversion over accuracy.',
    ],
    verdictRating: 'limited',
    verdict:
      'Treat the whole genre as entertainment with a sales funnel attached. A selfie "skin score" is not a standardised or independently validated metric, it shifts with your lighting, and the recommendations usually exist to sell you something. Useful as a mirror that points you toward topics to read up on here — not as measurement or diagnosis.',
    worthItFor: [
      'A free, casual nudge toward which topics to learn about',
      'People who enjoy tracking selfies over time and take the numbers with a grain of salt',
    ],
    notForYouIf: [
      'You want objective measurement, clinical accuracy, or unbiased recommendations',
      'You would pay a subscription expecting medical-grade analysis',
    ],
    citations: [
      { label: 'BMJ (2020) — systematic review of skin-cancer risk apps', url: 'https://pubmed.ncbi.nlm.nih.gov/32041693/' },
      { label: 'Cochrane — how accurate are melanoma-detection apps?', url: 'https://www.cochrane.org/CD013192/SKIN_how-accurate-are-smartphone-applications-apps-detecting-melanoma-adults' },
    ],
  },
  {
    id: 'melapp-mole-detective',
    name: 'MelApp & Mole Detective (FTC-sanctioned)',
    technology: 'Photo + questionnaire "melanoma risk" calculators (now discontinued)',
    whatItActuallyDoes: [
      'These apps asked users to photograph a mole and answer questions, then output a low / medium / high melanoma risk. They were marketed as able to assess melanoma risk, including in early stages.',
    ],
    researchAccuracy: [
      'There was no adequate scientific evidence the apps could do what they claimed. They are a documented example of consumer skin tech making medical claims it could not support.',
    ],
    knownLimitations: [
      'A risk score from a snapshot can falsely reassure someone who actually has a melanoma — a potentially deadly failure mode.',
    ],
    conflictOfInterest: [
      'This is the accountability lesson: in 2015 the U.S. FTC charged the marketers with deceptive advertising for unsubstantiated melanoma-detection claims. Both settled — Health Discovery Corp. (MelApp) and New Consumer Solutions (Mole Detective) — and were barred from making such claims without scientific evidence.',
    ],
    verdictRating: 'not-recommended',
    verdict:
      'Included as a cautionary case study, not a recommendation. These melanoma-risk apps were sanctioned by the U.S. FTC in 2015 for deceptive claims they could not back up. They are the clearest example of why "AI can detect your skin cancer" marketing deserves deep skepticism — a falsely reassuring result can be dangerous.',
    worthItFor: [
      'Understanding why melanoma-detection claims demand FDA-level evidence, not marketing copy',
    ],
    notForYouIf: [
      'Any actual skin-cancer concern — see a board-certified dermatologist',
    ],
    citations: [
      { label: 'U.S. FTC (2015) — action against MelApp & Mole Detective marketers', url: 'https://www.ftc.gov/news-events/news/press-releases/2015/02/ftc-cracks-down-marketers-melanoma-detection-apps' },
    ],
  },
]

// --- helpers ---

function toBlocks(paragraphs, prefix) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `${prefix}-b${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${prefix}-b${i}-s0`, text, marks: [] }],
  }))
}

function toCitations(arr) {
  return arr.map((c, i) => ({ _key: `cite-${i}`, label: c.label, url: c.url }))
}

const mutations = SCANNERS.map((s) => ({
  createOrReplace: {
    _id: `appscanner-${s.id}`,
    _type: 'appScanner',
    name: s.name,
    slug: { _type: 'slug', current: s.id },
    technology: s.technology,
    whatItActuallyDoes: toBlocks(s.whatItActuallyDoes, 'does'),
    researchAccuracy: toBlocks(s.researchAccuracy, 'acc'),
    knownLimitations: toBlocks(s.knownLimitations, 'lim'),
    conflictOfInterest: toBlocks(s.conflictOfInterest, 'coi'),
    verdictRating: s.verdictRating,
    verdict: s.verdict,
    worthItFor: s.worthItFor,
    notForYouIf: s.notForYouIf,
    citations: toCitations(s.citations),
  },
}))

const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}?returnIds=true`

const res = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
  body: JSON.stringify({ mutations }),
})

const json = await res.json()
if (!res.ok) {
  console.error('Seed failed:', JSON.stringify(json, null, 2))
  process.exit(1)
}
console.log(`Seeded ${SCANNERS.length} app/scanner profiles:`)
console.log(SCANNERS.map((s) => `  • ${s.name} [${s.verdictRating}]`).join('\n'))
