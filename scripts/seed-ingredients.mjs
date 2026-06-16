// Seeds the Ingredient Explainer (Tool 2) with a starter set of actives.
// Writes directly to Sanity via the mutations API — no Studio needed.
//
// Reads SANITY_API_TOKEN + NEXT_PUBLIC_SANITY_PROJECT_ID from the env.
// Idempotent: uses createOrReplace with deterministic _ids, so re-running
// updates the same documents instead of creating duplicates.
//
//   set -a; source .env.local; set +a; node scripts/seed-ingredients.mjs
//
// NOTE ON CITATIONS: these are real, valid pointers to the literature
// (PubMed topic searches) and to the AAD, chosen so nothing is fabricated.
// Upgrade them to exact landmark-article links before a public launch.

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!PROJECT_ID || !TOKEN) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in env.')
  process.exit(1)
}

const pubmed = (q) =>
  `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}`

// id is the slug; name; summary (plain); mechanism/research/marketing are
// arrays of paragraphs (→ portable text); studyTypes; concentration;
// verdict (plain); citations [{label,url}]; related (slugs).
const INGREDIENTS = [
  {
    id: 'niacinamide',
    name: 'Niacinamide',
    summary:
      'Niacinamide (vitamin B3) is one of the few "do-a-bit-of-everything" actives with real human evidence behind several of its claims. It strengthens the skin barrier, calms inflammation, and modestly fades dark spots. It is well tolerated and plays nicely with almost everything — but it is not the miracle some marketing implies.',
    mechanism: [
      'Niacinamide is a precursor to coenzymes (NAD+/NADP+) that skin cells use for energy and repair. Topically, it boosts production of ceramides and other barrier lipids, which reduces the amount of water your skin loses to the air (trans-epidermal water loss).',
      'It also dampens inflammatory signalling and interferes with the transfer of pigment (melanosomes) from pigment-producing cells to surface skin cells — which is the mechanism behind its modest effect on dark spots.',
    ],
    research: [
      'Human clinical trials are the strongest part of niacinamide’s story: controlled studies show measurable improvements in barrier function, redness, and hyperpigmentation over 8–12 weeks, typically at 2–5%.',
      'The effect sizes are real but moderate — think "visibly better," not "transformed." Evidence for sebum/oil control and pore appearance is weaker and less consistent.',
    ],
    marketing: [
      'Brands often imply niacinamide dramatically shrinks pores or controls oil. The pore/oil evidence is thin compared with its barrier and pigment effects. Very high percentages (10%+) are marketed as "stronger," but studies don’t show added benefit over ~5%, and higher concentrations can cause flushing or irritation in some people.',
    ],
    studyTypes: ['Human clinical trial', 'In vitro'],
    concentration: '2–5% (most clinical evidence sits here; higher is not better)',
    verdict:
      'A genuinely useful, low-risk active with solid human evidence for barrier support, calming redness, and gradually fading dark spots. Skip the 10%+ "extra strength" hype — around 5% is where the evidence lives.',
    citations: [
      { label: 'PubMed — clinical studies on topical niacinamide and skin', url: pubmed('topical niacinamide skin clinical trial') },
      { label: 'PubMed — niacinamide and hyperpigmentation', url: pubmed('niacinamide hyperpigmentation') },
    ],
    related: ['vitamin-c', 'ceramides'],
  },
  {
    id: 'retinol',
    name: 'Retinol',
    summary:
      'Retinol is an over-the-counter member of the retinoid family — the single best-evidenced category for visible skin aging. It speeds up skin-cell turnover and stimulates collagen. It works, but slowly (months), and it commonly causes irritation while your skin adjusts.',
    mechanism: [
      'Retinoids are converted in the skin to retinoic acid, which binds receptors in skin cells and changes how they behave: cell turnover accelerates, collagen production increases, and the breakdown of existing collagen slows.',
      'Retinol is a weaker, OTC form — your skin must convert it through two steps to reach active retinoic acid, so it is gentler but less potent than prescription tretinoin.',
    ],
    research: [
      'The retinoid category has the strongest human evidence in all of skincare for photoaging: numerous randomized controlled trials show reductions in fine lines and improved texture and tone, especially for prescription tretinoin.',
      'Evidence specifically for OTC retinol is more modest than for tretinoin, but consistently positive. Results take 12–24+ weeks; this is not a quick fix.',
    ],
    marketing: [
      'Watch for vague "retinol-like" or "plant retinol alternative" claims with far weaker evidence than actual retinoids. "Encapsulated" and percentage claims can be meaningful for tolerability, but a higher number does not automatically mean better results — consistency over months matters more.',
    ],
    studyTypes: ['Human clinical trial', 'Meta-analysis'],
    concentration: 'Typically 0.1–1% retinol OTC; introduce slowly to limit irritation',
    verdict:
      'If you only adopt one anti-aging active, a retinoid is the evidence-backed choice. Expect dryness and flaking early on, go slow, and use sunscreen daily. Prescription tretinoin is stronger if OTC retinol isn’t enough.',
    citations: [
      { label: 'PubMed — randomized trials of topical retinoids for photoaging', url: pubmed('topical retinoid photoaging randomized controlled trial') },
      { label: 'AAD — retinoid / retinol guidance', url: 'https://www.aad.org/public/everyday-care/skin-care-basics' },
    ],
    related: ['vitamin-c', 'niacinamide'],
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C (L-ascorbic acid)',
    summary:
      'Topical vitamin C is an antioxidant that can help brighten skin tone and support collagen, and it complements sunscreen. The catch is formulation: pure L-ascorbic acid is notoriously unstable and oxidizes (turning yellow-brown) once exposed to air and light.',
    mechanism: [
      'Vitamin C is an antioxidant that neutralizes some of the free radicals generated by UV and pollution. It is also a required cofactor for the enzymes that build collagen, and it can interfere with excess pigment production.',
      'L-ascorbic acid is the most-studied form but needs a low pH and stable packaging to remain active; many gentler derivatives exist but generally have less direct evidence.',
    ],
    research: [
      'Evidence is moderate and somewhat mixed. Multiple small human studies support brightening and an antioxidant "boost" to daytime sun protection, with some support for fine lines over time.',
      'A lot of mechanistic data is in-vitro; the jump from "works in a dish" to "works on your face at this concentration in this bottle" is exactly where marketing tends to overreach.',
    ],
    marketing: [
      'Claims often ignore stability — an oxidized vitamin C serum can be inactive or even pro-oxidant. "20% vitamin C" sounds potent but is irrelevant if it has degraded. Derivative forms are frequently marketed as equivalent to L-ascorbic acid despite weaker evidence.',
    ],
    studyTypes: ['Human clinical trial', 'In vitro'],
    concentration: '10–20% L-ascorbic acid at low pH; protect from air and light',
    verdict:
      'A reasonable antioxidant addition that pairs well with morning sunscreen — if the formula is stable and you actually use it before it browns. Manage expectations: brightening and antioxidant support, not dramatic anti-aging.',
    citations: [
      { label: 'PubMed — topical vitamin C (ascorbic acid) and skin', url: pubmed('topical vitamin C ascorbic acid skin') },
    ],
    related: ['niacinamide', 'retinol'],
  },
  {
    id: 'hyaluronic-acid',
    name: 'Hyaluronic Acid',
    summary:
      'Hyaluronic acid is a humectant — it binds water and holds it at the skin surface, giving an immediate plumper, more hydrated look. That hydration is real but temporary, and topical HA is not the same thing as the injectable fillers that share the name.',
    mechanism: [
      'Hyaluronic acid is a naturally occurring sugar molecule that can hold many times its weight in water. Applied topically, it draws moisture into the upper layers of skin, temporarily improving hydration and the appearance of fine "dehydration" lines.',
      'In very dry air it can pull water from deeper skin rather than the environment, which is why HA works best when layered under a moisturizer that seals it in.',
    ],
    research: [
      'Human studies consistently show improved surface hydration and short-term smoothing. This is one of HA’s better-supported claims.',
      'Claims that topical HA "rebuilds" or "restores volume" like dermal fillers are not supported — injected HA filler is a different, in-office treatment. Topical benefit is surface hydration, not structural volume.',
    ],
    marketing: [
      '"Plumps and fills wrinkles" blurs the line with injectables. "Multiple molecular weights penetrate deeply" is a common claim with limited independent evidence. The effect is genuine hydration — not a permanent or volumizing change.',
    ],
    studyTypes: ['Human clinical trial'],
    concentration: 'Commonly 0.1–2%; layer under an occlusive moisturizer to lock it in',
    verdict:
      'A safe, effective hydrator for an immediate dewy, smoother look — just don’t expect filler-like results from a serum. Apply to damp skin and seal with moisturizer for the best effect.',
    citations: [
      { label: 'PubMed — topical hyaluronic acid and skin hydration', url: pubmed('topical hyaluronic acid skin hydration') },
    ],
    related: ['ceramides', 'niacinamide'],
  },
  {
    id: 'salicylic-acid',
    name: 'Salicylic Acid (BHA)',
    summary:
      'Salicylic acid is an oil-soluble exfoliant (a beta hydroxy acid) that can get into pores and clear out the debris that drives blackheads and whiteheads. It is a mainstay for oily, congestion-prone skin and mild acne.',
    mechanism: [
      'Because it is oil-soluble, salicylic acid penetrates the sebum inside pores and loosens the "glue" between dead skin cells, helping to unclog pores (a comedolytic effect). It is also mildly anti-inflammatory.',
    ],
    research: [
      'Human evidence supports salicylic acid for mild comedonal acne and general exfoliation. It is well established as an OTC acne ingredient, though for moderate-to-severe acne it is usually not enough on its own.',
    ],
    marketing: [
      '"Deep pore detox" language oversells it — it clears pore contents, it doesn’t "detox." Higher concentrations are not automatically better for daily use and can over-dry or irritate.',
    ],
    studyTypes: ['Human clinical trial'],
    concentration: '0.5–2% OTC for leave-on or wash-off products',
    verdict:
      'A reliable, well-tolerated choice for blackheads, congestion, and mild breakouts in oilier skin. For inflammatory acne, pair it with or step up to benzoyl peroxide or see a dermatologist.',
    citations: [
      { label: 'PubMed — salicylic acid for acne', url: pubmed('salicylic acid acne clinical trial') },
      { label: 'AAD — acne overview', url: 'https://www.aad.org/public/diseases/acne' },
    ],
    related: ['benzoyl-peroxide', 'azelaic-acid'],
  },
  {
    id: 'benzoyl-peroxide',
    name: 'Benzoyl Peroxide',
    summary:
      'Benzoyl peroxide is one of the most effective OTC treatments for inflammatory acne (the red, pus-filled kind). It kills acne-driving bacteria and, importantly, bacteria don’t become resistant to it the way they do to antibiotics.',
    mechanism: [
      'Benzoyl peroxide releases oxygen into the pore, which kills Cutibacterium acnes (the bacteria involved in inflammatory acne). It is also mildly comedolytic, helping to keep pores clear.',
      'Unlike topical antibiotics, it doesn’t breed antibiotic resistance — which is why dermatologists often pair it with antibiotics to protect their effectiveness.',
    ],
    research: [
      'Strong human evidence supports benzoyl peroxide for inflammatory acne, both alone and in combination. Notably, controlled studies find lower concentrations (around 2.5%) work about as well as higher ones (5–10%) with less irritation.',
    ],
    marketing: [
      '"Maximum strength 10%" is marketed as superior, but the evidence says 2.5–5% usually delivers similar results with far less dryness and irritation. It also bleaches fabric — towels, pillowcases, dark clothing.',
    ],
    studyTypes: ['Human clinical trial', 'Meta-analysis'],
    concentration: '2.5–5% is the evidence-backed sweet spot (10% mostly adds irritation)',
    verdict:
      'A first-line, no-resistance option for red inflammatory breakouts. Start at 2.5–5%, expect some dryness, and protect your fabrics. If acne is widespread or scarring, see a dermatologist.',
    citations: [
      { label: 'PubMed — benzoyl peroxide for acne (concentration comparisons)', url: pubmed('benzoyl peroxide acne concentration randomized') },
      { label: 'AAD — acne overview', url: 'https://www.aad.org/public/diseases/acne' },
    ],
    related: ['salicylic-acid', 'azelaic-acid'],
  },
  {
    id: 'azelaic-acid',
    name: 'Azelaic Acid',
    summary:
      'Azelaic acid is an underrated multitasker: it calms inflammation, has some antibacterial action, and gently fades post-acne dark marks. It is a go-to for rosacea and for acne in people who also struggle with hyperpigmentation, and it is generally well tolerated — including in pregnancy (confirm with your doctor).',
    mechanism: [
      'Azelaic acid reduces inflammation, has antibacterial activity against acne bacteria, and inhibits tyrosinase — the enzyme involved in producing excess pigment — which is why it helps fade dark marks left behind by breakouts.',
    ],
    research: [
      'Human evidence supports azelaic acid for both rosacea and acne, and it is a recognized option for post-inflammatory hyperpigmentation. Prescription strengths (15–20%) have the most data; ~10% OTC products are milder.',
    ],
    marketing: [
      'OTC products at low percentages are sometimes marketed with the same expectations as prescription 15–20% formulas. The active is real, but concentration and consistency drive results.',
    ],
    studyTypes: ['Human clinical trial'],
    concentration: '15–20% (prescription) for strongest evidence; ~10% in many OTC products',
    verdict:
      'A versatile, gentle choice especially if you deal with redness, breakouts, and leftover dark spots at once. For rosacea or stubborn pigmentation, the prescription strength is worth asking a dermatologist about.',
    citations: [
      { label: 'PubMed — azelaic acid for rosacea and acne', url: pubmed('azelaic acid rosacea acne') },
    ],
    related: ['niacinamide', 'salicylic-acid'],
  },
  {
    id: 'ceramides',
    name: 'Ceramides',
    summary:
      'Ceramides are the lipids (fats) that make up much of your skin’s outer barrier — the "mortar" between skin-cell "bricks." Topical ceramides help replenish that barrier, reduce water loss, and soothe dry, sensitive, or compromised skin.',
    mechanism: [
      'Your skin barrier is built from ceramides, cholesterol, and fatty acids. When that mix is depleted — by harsh products, weather, or conditions like eczema — skin loses water and lets irritants in. Applying ceramides helps top up the barrier and restore its function.',
    ],
    research: [
      'Human evidence supports ceramide-containing moisturizers for improving barrier function and symptoms in dry skin and eczema-prone skin. The clearest benefit is barrier repair and hydration.',
    ],
    marketing: [
      'Ceramides are increasingly marketed as "anti-aging." Their well-supported role is barrier repair and hydration — framing them as wrinkle treatments overstates the evidence. Barrier health does make skin look better, but that’s not the same as reversing aging.',
    ],
    studyTypes: ['Human clinical trial'],
    concentration: 'Effect depends on the overall barrier-lipid formulation, not a single %',
    verdict:
      'An excellent, low-risk pick for dry, sensitive, or over-exfoliated skin — they help rebuild the barrier that everything else depends on. Treat them as barrier support, not an anti-wrinkle active.',
    citations: [
      { label: 'PubMed — ceramides and skin barrier repair', url: pubmed('ceramide skin barrier repair moisturizer') },
    ],
    related: ['hyaluronic-acid', 'niacinamide'],
  },
]

// --- helpers: turn plain content into Sanity’s expected shapes ---

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

function toRelated(slugs) {
  return slugs.map((slug, i) => ({
    _type: 'reference',
    _key: `rel-${i}`,
    _ref: `ingredient-${slug}`,
  }))
}

const mutations = INGREDIENTS.map((ing) => ({
  createOrReplace: {
    _id: `ingredient-${ing.id}`,
    _type: 'ingredient',
    name: ing.name,
    slug: { _type: 'slug', current: ing.id },
    summary: ing.summary,
    biologicalMechanism: toBlocks(ing.mechanism, 'mech'),
    researchSummary: toBlocks(ing.research, 'res'),
    marketingClaims: toBlocks(ing.marketing, 'mkt'),
    studyTypes: ing.studyTypes,
    evidenceBasedConcentration: ing.concentration,
    honestVerdict: ing.verdict,
    citations: toCitations(ing.citations),
    relatedIngredients: toRelated(ing.related),
  },
}))

const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}?returnIds=true`

const res = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
  body: JSON.stringify({ mutations }),
})

const json = await res.json()
if (!res.ok) {
  console.error('Seed failed:', JSON.stringify(json, null, 2))
  process.exit(1)
}
console.log(`Seeded ${INGREDIENTS.length} ingredients:`)
console.log(INGREDIENTS.map((i) => `  • ${i.name}`).join('\n'))
