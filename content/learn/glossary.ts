// Glossary of skin health terms. Used as hover tooltips inside articles
// (via <GlossaryTerm>) and as the full searchable dictionary at /learn/dictionary.

export type GlossaryCategory =
  | 'Ingredient'
  | 'Condition'
  | 'Anatomy'
  | 'Mechanism'
  | 'Product Type'
  | 'Treatment'
  | 'Measurement'

export interface GlossaryEntry {
  term: string
  definition: string
  category: GlossaryCategory
  relatedSlug?: string // learning hub article slug
}

export const GLOSSARY: Record<string, GlossaryEntry> = {

  // ── Ingredients ──────────────────────────────────────────────────────────
  'aha': {
    term: 'AHA (Alpha-Hydroxy Acid)',
    category: 'Ingredient',
    definition: 'Water-soluble chemical exfoliants (glycolic, lactic, mandelic) that loosen dead skin cells on the surface. Improve texture, tone, and fine lines. Require acidic pH to work and increase UV sensitivity.',
    relatedSlug: 'aha-bha-deep-dive',
  },
  'alpha-arbutin': {
    term: 'Alpha Arbutin',
    category: 'Ingredient',
    definition: 'A stabilised derivative of hydroquinone that inhibits tyrosinase to slow melanin production. Gentler than hydroquinone, used for hyperpigmentation at 1–2%.',
    relatedSlug: 'hyperpigmentation-types-guide',
  },
  'ascorbic-acid': {
    term: 'Ascorbic Acid (Vitamin C)',
    category: 'Ingredient',
    definition: 'The most potent and most studied form of vitamin C. A powerful antioxidant that brightens, boosts collagen, and neutralises UV-generated free radicals. Unstable — degrades to orange when oxidised.',
    relatedSlug: 'vitamin-c-guide',
  },
  'azelaic-acid': {
    term: 'Azelaic Acid',
    category: 'Ingredient',
    definition: 'A naturally-occurring dicarboxylic acid with anti-inflammatory, anti-bacterial, and tyrosinase-inhibiting effects. Treats acne, rosacea, and hyperpigmentation. OTC to 10%; prescription at 15–20%.',
    relatedSlug: 'azelaic-acid-guide',
  },
  'bakuchiol': {
    term: 'Bakuchiol',
    category: 'Ingredient',
    definition: 'A plant-derived compound from Psoralea corylifolia that activates retinoid receptors in the skin. An RCT (2019) showed results comparable to retinol with less irritation. Gentler retinol alternative.',
    relatedSlug: 'bakuchiol-retinol-alternative',
  },
  'benzoyl-peroxide': {
    term: 'Benzoyl Peroxide',
    category: 'Ingredient',
    definition: 'An antibacterial that kills Cutibacterium acnes bacteria and unclogs pores. One of the most effective OTC acne treatments. Can bleach fabrics. Start at 2.5% to minimise dryness.',
    relatedSlug: 'understanding-acne',
  },
  'bha': {
    term: 'BHA (Beta-Hydroxy Acid)',
    category: 'Ingredient',
    definition: 'Salicylic acid — an oil-soluble exfoliant that penetrates into pores and reduces blackheads, whiteheads, and inflammatory acne. Effective at 0.5–2%, requires low pH.',
    relatedSlug: 'aha-bha-deep-dive',
  },
  'ceramides': {
    term: 'Ceramides',
    category: 'Ingredient',
    definition: 'Lipids that make up ~50% of the outer skin barrier. Hold skin cells together and lock moisture in. Depleted by over-washing, harsh actives, and aging. Replacing them with skincare genuinely helps.',
    relatedSlug: 'ceramides-explained',
  },
  'centella-asiatica': {
    term: 'Centella Asiatica',
    category: 'Ingredient',
    definition: 'A herb with anti-inflammatory and wound-healing properties. Common in Korean skincare. Active compounds include madecassoside and asiaticoside. Good for sensitive, damaged, or post-procedure skin.',
  },
  'ferulic-acid': {
    term: 'Ferulic Acid',
    category: 'Ingredient',
    definition: 'A plant-based antioxidant that stabilises vitamin C and vitamin E formulas, significantly extending their potency. Commonly combined with 15% ascorbic acid + 1% tocopherol.',
    relatedSlug: 'vitamin-c-guide',
  },
  'glycerin': {
    term: 'Glycerin',
    category: 'Ingredient',
    definition: 'A humectant naturally produced in the skin. Draws water from the environment into the skin. Cheap, effective, and universally well-tolerated. Apply to damp skin for best effect.',
    relatedSlug: 'glycerin-squalane-guide',
  },
  'glycolic-acid': {
    term: 'Glycolic Acid',
    category: 'Ingredient',
    definition: 'The smallest AHA, with the deepest surface penetration. Most studied for fine lines, hyperpigmentation, and dullness. Most likely to cause irritation — start with lower concentrations (5–10%).',
    relatedSlug: 'aha-bha-deep-dive',
  },
  'hyaluronic-acid': {
    term: 'Hyaluronic Acid',
    category: 'Ingredient',
    definition: 'A glycosaminoglycan humectant that holds up to 1,000× its weight in water. Apply to damp skin and seal with moisturiser. In dry climates, can paradoxically dehydrate skin if used unsealed.',
    relatedSlug: 'hyaluronic-acid-explained',
  },
  'hydroquinone': {
    term: 'Hydroquinone',
    category: 'Ingredient',
    definition: 'The gold-standard tyrosinase inhibitor for hyperpigmentation and melasma. Prescription at 4%; OTC at 2% in the US. Requires SPF during use. Long-term high-concentration use can cause ochronosis (rare).',
    relatedSlug: 'hyperpigmentation-types-guide',
  },
  'kojic-acid': {
    term: 'Kojic Acid',
    category: 'Ingredient',
    definition: 'A brightening ingredient derived from fungi that inhibits tyrosinase. Used for hyperpigmentation at 1–4%. Less potent than hydroquinone but gentler. Can cause irritation in sensitive skin.',
  },
  'lactic-acid': {
    term: 'Lactic Acid',
    category: 'Ingredient',
    definition: 'A gentler AHA than glycolic, with a larger molecular size and slower penetration. Also mildly humectant. Good starting point for chemical exfoliation in sensitive or darker skin tones.',
    relatedSlug: 'aha-bha-deep-dive',
  },
  'mandelic-acid': {
    term: 'Mandelic Acid',
    category: 'Ingredient',
    definition: 'The largest, gentlest AHA, derived from bitter almonds. Very slow penetration makes it the safest AHA for sensitive and darker skin tones. Often used for acne and mild hyperpigmentation.',
    relatedSlug: 'aha-bha-deep-dive',
  },
  'niacinamide': {
    term: 'Niacinamide',
    category: 'Ingredient',
    definition: 'A form of vitamin B3 that supports the skin barrier, regulates sebum, fades hyperpigmentation, and calms redness. One of the most versatile skincare actives. Effective at 2–5%.',
    relatedSlug: 'niacinamide-complete-guide',
  },
  'panthenol': {
    term: 'Panthenol (Vitamin B5)',
    category: 'Ingredient',
    definition: 'A humectant and skin-conditioning agent that draws moisture into the skin and supports wound healing. Anti-inflammatory. Found in most moisturisers — widely used and very well tolerated.',
  },
  'peptides': {
    term: 'Peptides',
    category: 'Ingredient',
    definition: 'Short chains of amino acids that act as signalling molecules in the skin. Some types (matrixyl, argireline) have evidence for reducing fine lines and improving firmness. Less potent than retinoids.',
    relatedSlug: 'peptides-for-skin',
  },
  'polyglutamic-acid': {
    term: 'Polyglutamic Acid',
    category: 'Ingredient',
    definition: 'A humectant with a larger molecule than hyaluronic acid, so it sits on the skin surface. Can hold 4× more water than HA. Adds a film-forming, plumping effect. Often layered with HA.',
  },
  'retinaldehyde': {
    term: 'Retinaldehyde',
    category: 'Ingredient',
    definition: 'The aldehyde form of vitamin A, one step before retinoic acid in conversion. More potent than retinol with less irritation than tretinoin. Increasingly popular in OTC products at 0.05–0.1%.',
    relatedSlug: 'retinoids-mechanism-and-evidence',
  },
  'retinol': {
    term: 'Retinol',
    category: 'Ingredient',
    definition: 'The OTC gold standard vitamin A derivative. Converts in skin to retinoic acid. Effective for acne and visible aging at 0.025–1%. Can cause initial dryness and peeling — start low and build slowly.',
    relatedSlug: 'retinoids-mechanism-and-evidence',
  },
  'salicylic-acid': {
    term: 'Salicylic Acid',
    category: 'Ingredient',
    definition: 'The only BHA. Oil-soluble, so it penetrates into sebum-filled pores. Reduces blackheads, whiteheads, and inflammatory acne. Effective at 0.5–2%. Mild anti-inflammatory as well.',
    relatedSlug: 'aha-bha-deep-dive',
  },
  'squalane': {
    term: 'Squalane',
    category: 'Ingredient',
    definition: 'A stable, saturated form of squalene (not shark-derived in modern products — from sugarcane). A lightweight emollient and mild occlusive. Non-comedogenic, suits all skin types including oily.',
    relatedSlug: 'glycerin-squalane-guide',
  },
  'tocopherol': {
    term: 'Tocopherol (Vitamin E)',
    category: 'Ingredient',
    definition: 'A fat-soluble antioxidant that protects cell membranes from oxidative damage. Stabilises vitamin C formulas. Also emollient. Some people with sensitive skin react to high concentrations.',
  },
  'tranexamic-acid': {
    term: 'Tranexamic Acid',
    category: 'Ingredient',
    definition: 'Inhibits plasmin, reducing the chain of signals that cause excess melanin production. Strong clinical evidence for melasma at 2–5% topical. Gentler than hydroquinone and well tolerated.',
    relatedSlug: 'tranexamic-acid-guide',
  },
  'tretinoin': {
    term: 'Tretinoin',
    category: 'Ingredient',
    definition: 'Prescription retinoic acid — the active form of vitamin A. The most evidence-backed topical for acne and visible aging. Faster and more potent than retinol. Requires prescription in most countries.',
    relatedSlug: 'retinoids-mechanism-and-evidence',
  },
  'zinc-oxide': {
    term: 'Zinc Oxide',
    category: 'Ingredient',
    definition: 'A mineral UV filter blocking both UVA and UVB. Also anti-inflammatory. FDA-approved and photostable. Can leave a white cast at high concentrations — tinted formulas reduce this.',
    relatedSlug: 'zinc-for-skin',
  },

  // ── Conditions ───────────────────────────────────────────────────────────
  'acne-mechanica': {
    term: 'Acne Mechanica',
    category: 'Condition',
    definition: 'Acne caused by sustained friction, pressure, and heat against skin — helmet straps, chin straps, backpack straps. Prevented by moisture-wicking liners and prompt cleansing.',
    relatedSlug: 'acne-mechanica',
  },
  'acne-vulgaris': {
    term: 'Acne Vulgaris',
    category: 'Condition',
    definition: 'Common acne — a chronic inflammatory condition of the pilosebaceous unit. Involves excess sebum, follicle blockage, Cutibacterium acnes bacteria, and inflammation.',
    relatedSlug: 'understanding-acne',
  },
  'atopic-dermatitis': {
    term: 'Atopic Dermatitis (Eczema)',
    category: 'Condition',
    definition: 'A chronic inflammatory skin condition characterised by dry, itchy, inflamed skin. Often related to filaggrin gene mutations and a compromised skin barrier. Worsened by triggers like stress and certain detergents.',
    relatedSlug: 'eczema-trigger-and-repair',
  },
  'contact-dermatitis': {
    term: 'Contact Dermatitis',
    category: 'Condition',
    definition: 'Skin inflammation triggered by contact with an irritant (irritant contact dermatitis) or an allergen (allergic contact dermatitis). Patch testing identifies allergic triggers.',
  },
  'fungal-acne': {
    term: 'Fungal Acne (Malassezia Folliculitis)',
    category: 'Condition',
    definition: 'An overgrowth of Malassezia yeast in hair follicles that mimics acne. Does not respond to standard acne treatments. Treated with antifungals. Common in humid climates and after antibiotic use.',
  },
  'hyperpigmentation': {
    term: 'Hyperpigmentation',
    category: 'Condition',
    definition: 'Patches of skin darker than the surrounding area, caused by excess melanin. Subtypes include melasma, PIH, and sun spots. All respond better to SPF than actives alone.',
    relatedSlug: 'hyperpigmentation-types-guide',
  },
  'keratosis-pilaris': {
    term: 'Keratosis Pilaris',
    category: 'Condition',
    definition: 'Small, rough bumps usually on the upper arms, thighs, or cheeks caused by excess keratin blocking hair follicles. Harmless, common, and improved by AHAs (lactic acid) and urea.',
  },
  'melasma': {
    term: 'Melasma',
    category: 'Condition',
    definition: 'Patches of brown or grey-brown pigmentation, typically on the face, linked to UV exposure and hormonal changes (pregnancy, OCP). Notoriously difficult to treat; SPF is non-negotiable.',
    relatedSlug: 'hyperpigmentation-types-guide',
  },
  'milia': {
    term: 'Milia',
    category: 'Condition',
    definition: 'Tiny white cysts formed when dead skin cells become trapped under the skin surface. Common around the eyes. Not caused by poor hygiene. Treated by a dermatologist — do not attempt to extract at home.',
  },
  'perioral-dermatitis': {
    term: 'Perioral Dermatitis',
    category: 'Condition',
    definition: 'A rash of small papules clustering around the mouth, often caused by topical steroids. Worsened by most skincare products. Treatment involves stopping steroids and oral antibiotics.',
    relatedSlug: 'perioral-dermatitis',
  },
  'pih': {
    term: 'PIH (Post-Inflammatory Hyperpigmentation)',
    category: 'Condition',
    definition: 'Dark marks left after inflammation — acne, eczema, a scratch. More pronounced in darker skin tones. Fades over months with SPF and brightening actives. Prevention (reduce inflammation) matters most.',
    relatedSlug: 'hyperpigmentation-types-guide',
  },
  'psoriasis': {
    term: 'Psoriasis',
    category: 'Condition',
    definition: 'A chronic autoimmune condition causing rapid skin cell turnover, resulting in thick, scaly plaques. Often on elbows, knees, and scalp. Managed but not cured. Stress is a major trigger.',
  },
  'rosacea': {
    term: 'Rosacea',
    category: 'Condition',
    definition: 'A chronic inflammatory condition with four subtypes: erythematotelangiectatic (redness), papulopustular (acne-like bumps), phymatous (skin thickening), and ocular. Triggered by heat, UV, alcohol, and stress.',
    relatedSlug: 'rosacea-triggers-treatment',
  },
  'sebaceous-hyperplasia': {
    term: 'Sebaceous Hyperplasia',
    category: 'Condition',
    definition: 'Enlarged sebaceous (oil) glands that appear as small yellowish bumps with a central pore, typically on the nose and cheeks. Common in middle-aged skin. Treated with laser, electrocautery, or retinoids.',
  },

  // ── Anatomy ──────────────────────────────────────────────────────────────
  'collagen': {
    term: 'Collagen',
    category: 'Anatomy',
    definition: 'The main structural protein in the dermis. Provides skin with tensile strength and plumpness. Production slows from the late 20s. UV exposure accelerates collagen breakdown.',
  },
  'corneocyte': {
    term: 'Corneocyte',
    category: 'Anatomy',
    definition: 'Dead, flattened skin cells that form the outermost layer (stratum corneum). They sit in a lipid matrix like bricks in mortar, forming the skin barrier.',
  },
  'dermis': {
    term: 'Dermis',
    category: 'Anatomy',
    definition: 'The layer of skin beneath the epidermis. Contains collagen, elastin, blood vessels, hair follicles, and sweat glands. Most anti-aging actives aim to influence the dermis.',
  },
  'elastin': {
    term: 'Elastin',
    category: 'Anatomy',
    definition: 'A protein in the dermis that gives skin its elasticity and ability to snap back into shape. Degrades with age and UV exposure. Cannot be directly replaced topically.',
  },
  'epidermis': {
    term: 'Epidermis',
    category: 'Anatomy',
    definition: 'The outermost layer of skin, roughly 0.1mm thick. Contains keratinocytes, melanocytes, and Langerhans cells. The stratum corneum is its outermost sublayer.',
  },
  'fibroblast': {
    term: 'Fibroblast',
    category: 'Anatomy',
    definition: 'Cells in the dermis responsible for producing collagen, elastin, and hyaluronic acid. Retinoids and some peptides work partly by stimulating fibroblast activity.',
  },
  'hair-follicle': {
    term: 'Hair Follicle',
    category: 'Anatomy',
    definition: 'A tube-shaped structure in the skin from which hair grows. Also connected to the sebaceous gland. When follicles become blocked with sebum and dead cells, acne develops.',
  },
  'keratinocyte': {
    term: 'Keratinocyte',
    category: 'Anatomy',
    definition: 'The predominant cell type in the epidermis. Produces keratin and migrates upward from the basal layer, eventually dying and becoming corneocytes at the skin surface.',
  },
  'melanocyte': {
    term: 'Melanocyte',
    category: 'Anatomy',
    definition: 'Pigment-producing cells in the basal layer of the epidermis. Produce melanin in response to UV exposure and hormonal signals. The number of melanocytes is similar across skin tones — it\'s the activity that differs.',
  },
  'sebaceous-gland': {
    term: 'Sebaceous Gland',
    category: 'Anatomy',
    definition: 'Oil-producing glands attached to hair follicles throughout the face and body. Increase in activity during puberty due to androgens. Most concentrated on the face, chest, and back.',
  },
  'skin-barrier': {
    term: 'Skin Barrier',
    category: 'Anatomy',
    definition: 'The stratum corneum — the outermost skin layer that locks moisture in and keeps irritants out. When damaged, skin feels tight, stings, and flares more easily. Ceramides, fatty acids, and cholesterol maintain it.',
    relatedSlug: 'ceramides-explained',
  },
  'stratum-corneum': {
    term: 'Stratum Corneum',
    category: 'Anatomy',
    definition: 'The outermost sublayer of the epidermis, 15–20 layers of dead corneocytes embedded in lipids. The primary physical skin barrier. Actives must penetrate it to reach living cells.',
  },

  // ── Mechanisms ───────────────────────────────────────────────────────────
  'cell-turnover': {
    term: 'Cell Turnover',
    category: 'Mechanism',
    definition: 'The cycle by which new skin cells form in the basal layer, migrate upward, die, and shed from the stratum corneum. Roughly 28 days in young adults; slows with age. Retinoids and AHAs accelerate it.',
  },
  'comedone': {
    term: 'Comedone',
    category: 'Mechanism',
    definition: 'A plugged hair follicle. Open comedones (blackheads) are oxidised and dark; closed comedones (whiteheads) are covered by skin. The starting point for most acne lesions.',
    relatedSlug: 'acne-types-explained',
  },
  'cortisol': {
    term: 'Cortisol',
    category: 'Mechanism',
    definition: 'A stress hormone with androgen-like effects on skin. Elevated cortisol increases sebum and inflammation, which is why chronic stress worsens acne and eczema.',
    relatedSlug: 'stress-and-your-skin',
  },
  'desquamation': {
    term: 'Desquamation',
    category: 'Mechanism',
    definition: 'The natural shedding of dead skin cells from the stratum corneum. Happens continuously, invisibly. Impaired desquamation leads to dull skin, clogged pores, and rough texture.',
  },
  'filaggrin': {
    term: 'Filaggrin',
    category: 'Mechanism',
    definition: 'A protein that helps maintain the skin barrier and produces natural moisturising factors (NMF). Mutations in the filaggrin gene are strongly associated with eczema, dry skin, and allergies.',
    relatedSlug: 'eczema-trigger-and-repair',
  },
  'free-radicals': {
    term: 'Free Radicals',
    category: 'Mechanism',
    definition: 'Unstable molecules with unpaired electrons. Generated by UV exposure, pollution, and stress. They damage DNA, collagen, and cell membranes. Neutralised by antioxidants like vitamins C and E.',
  },
  'inflammation': {
    term: 'Inflammation',
    category: 'Mechanism',
    definition: 'The immune system\'s response to injury or irritation — redness, heat, swelling, and sometimes pain. Acute inflammation is protective; chronic skin inflammation drives acne, eczema, rosacea, and aging.',
  },
  'melanogenesis': {
    term: 'Melanogenesis',
    category: 'Mechanism',
    definition: 'The biological process of melanin production in melanocytes. Triggered by UV exposure and inflammatory signals. Tyrosinase is the key enzyme; most brightening ingredients inhibit it.',
    relatedSlug: 'hyperpigmentation-types-guide',
  },
  'oxidative-stress': {
    term: 'Oxidative Stress',
    category: 'Mechanism',
    definition: 'Cellular damage from an imbalance between free radicals and antioxidants. In the skin, it accelerates collagen breakdown, triggers inflammation, and contributes to visible aging.',
  },
  'photoaging': {
    term: 'Photoaging',
    category: 'Mechanism',
    definition: 'UV-induced aging: fine lines, wrinkles, hyperpigmentation, and loss of elasticity caused by long-term sun exposure. Accounts for ~80% of visible facial aging. The primary reason SPF matters daily.',
    relatedSlug: 'spf-the-one-non-negotiable',
  },
  'tewl': {
    term: 'TEWL (Transepidermal Water Loss)',
    category: 'Mechanism',
    definition: 'Water evaporating outward through the skin. A damaged skin barrier has elevated TEWL, leading to dryness and sensitivity. Occlusives reduce TEWL; ceramides repair the barrier to address the root cause.',
  },
  'tyrosinase': {
    term: 'Tyrosinase',
    category: 'Mechanism',
    definition: 'The enzyme that catalyses the first step of melanin production. The target of most brightening ingredients (vitamin C, kojic acid, azelaic acid, arbutin, tranexamic acid).',
    relatedSlug: 'hyperpigmentation-types-guide',
  },

  // ── Product Types ─────────────────────────────────────────────────────────
  'antioxidant': {
    term: 'Antioxidant',
    category: 'Product Type',
    definition: 'Ingredients that neutralise free radicals before they damage skin cells. Vitamin C, vitamin E, ferulic acid, and niacinamide are antioxidants. Most effective applied in the morning before UV exposure.',
  },
  'emollient': {
    term: 'Emollient',
    category: 'Product Type',
    definition: 'Ingredients that fill gaps between skin cells, making skin feel soft and smooth. Examples: fatty acids, squalane, plant oils. A key component of moisturisers alongside humectants and occlusives.',
    relatedSlug: 'moisturiser-ingredients-explained',
  },
  'humectant': {
    term: 'Humectant',
    category: 'Product Type',
    definition: 'Ingredients that draw water into the skin from the environment or deeper layers. Examples: glycerin, hyaluronic acid, urea. Work best applied to damp skin and sealed with an emollient or occlusive.',
    relatedSlug: 'moisturiser-ingredients-explained',
  },
  'occlusive': {
    term: 'Occlusive',
    category: 'Product Type',
    definition: 'Ingredients that form a physical film on the skin to slow water evaporation. Examples: petrolatum, shea butter, dimethicone. The most effective way to prevent TEWL. Key for very dry or damaged skin.',
    relatedSlug: 'moisturiser-ingredients-explained',
  },
  'non-comedogenic': {
    term: 'Non-Comedogenic',
    category: 'Product Type',
    definition: 'Formulated to be less likely to clog pores. A useful label for acne-prone skin, though no formula is universally pore-safe. Individual responses vary based on skin type and formula interactions.',
  },
  'sunscreen': {
    term: 'Sunscreen',
    category: 'Product Type',
    definition: 'A product that blocks or absorbs UV radiation. Chemical filters (avobenzone, octinoxate) absorb UV; mineral filters (zinc oxide, titanium dioxide) reflect it. Broad-spectrum means it protects against both UVA and UVB.',
    relatedSlug: 'spf-the-one-non-negotiable',
  },

  // ── Treatments ────────────────────────────────────────────────────────────
  'chemical-peel': {
    term: 'Chemical Peel',
    category: 'Treatment',
    definition: 'A professional treatment applying a high-concentration acid solution (AHA, BHA, TCA, phenol) to exfoliate the skin. Depth ranges from superficial to deep. Used for pigmentation, texture, and fine lines.',
  },
  'ipl': {
    term: 'IPL (Intense Pulsed Light)',
    category: 'Treatment',
    definition: 'A non-laser light treatment targeting melanin and blood vessels. Used for hyperpigmentation, redness, and rosacea. Multiple sessions needed. Not suitable for darker skin tones without careful calibration.',
  },
  'isotretinoin': {
    term: 'Isotretinoin (Accutane)',
    category: 'Treatment',
    definition: 'An oral vitamin A derivative for severe acne. The most effective acne treatment available. Requires blood monitoring and strict contraception (teratogenic). Typical course is 4–6 months.',
    relatedSlug: 'understanding-acne',
  },
  'microneedling': {
    term: 'Microneedling',
    category: 'Treatment',
    definition: 'A procedure using fine needles to create micro-injuries in the skin, stimulating collagen production. Used for scars, texture, and fine lines. Higher risk of PIH in darker skin tones — choose a skilled provider.',
  },
  'spironolactone': {
    term: 'Spironolactone',
    category: 'Treatment',
    definition: 'An oral anti-androgen medication prescribed off-label for hormonal acne in women. Reduces sebum by blocking androgen receptors. Typically 50–100mg/day. Not suitable during pregnancy.',
    relatedSlug: 'hormonal-acne',
  },

  // ── Measurements ──────────────────────────────────────────────────────────
  'broad-spectrum': {
    term: 'Broad-Spectrum',
    category: 'Measurement',
    definition: 'A sunscreen label indicating protection against both UVA (aging rays) and UVB (burning rays). Required labelling in many countries. Look for this alongside SPF 30+ for meaningful daily protection.',
    relatedSlug: 'spf-the-one-non-negotiable',
  },
  'pa-rating': {
    term: 'PA Rating',
    category: 'Measurement',
    definition: 'An Asian UVA protection rating system: PA+, PA++, PA+++, PA++++ (most protective). More informative than "broad-spectrum" alone for UVA. Found on Japanese and Korean sunscreens.',
    relatedSlug: 'spf-numbers-explained',
  },
  'ph': {
    term: 'pH',
    category: 'Measurement',
    definition: 'A scale measuring acidity (0–14). Skin\'s natural pH is ~4.5–5.5 (mildly acidic). AHAs and BHAs need a pH below 4.5 to be effective. Alkaline cleansers disrupt the acid mantle and damage the barrier.',
  },
  'ppd': {
    term: 'PPD (Persistent Pigment Darkening)',
    category: 'Measurement',
    definition: 'A measurement of UVA protection used in European and Asian sunscreens. PPD 10 means the skin takes 10× longer to show UVA-induced darkening. More precise than the broad-spectrum designation.',
    relatedSlug: 'spf-numbers-explained',
  },
  'spf': {
    term: 'SPF (Sun Protection Factor)',
    category: 'Measurement',
    definition: 'Measures how much longer skin takes to burn with sunscreen vs without. SPF 30 blocks ~97% of UVB; SPF 50 blocks ~98%. Measures UVB only — does not indicate UVA protection.',
    relatedSlug: 'spf-numbers-explained',
  },
  'uv-index': {
    term: 'UV Index',
    category: 'Measurement',
    definition: 'An international scale (0–11+) measuring UV radiation intensity at a given time and place. Above 3: apply SPF. Above 6: seek shade during peak hours. Peaks midday; increases with altitude.',
    relatedSlug: 'uv-index-explained',
  },
  'uva': {
    term: 'UVA',
    category: 'Measurement',
    definition: 'Ultraviolet A radiation (320–400nm). Penetrates deeper than UVB, reaching the dermis. Causes photoaging, collagen breakdown, and contributes to skin cancer. Present year-round and through glass.',
    relatedSlug: 'spf-the-one-non-negotiable',
  },
  'uvb': {
    term: 'UVB',
    category: 'Measurement',
    definition: 'Ultraviolet B radiation (280–320nm). Causes sunburn, directly damages DNA, and drives most skin cancers. Stronger in summer and at midday. Blocked by glass. What SPF primarily measures.',
    relatedSlug: 'spf-the-one-non-negotiable',
  },
  'upf': {
    term: 'UPF (Ultraviolet Protection Factor)',
    category: 'Measurement',
    definition: 'The clothing equivalent of SPF. UPF 50 means only 1/50th of UV passes through the fabric. More reliable than sunscreen for covered areas since it needs no reapplication.',
    relatedSlug: 'outdoor-sports-sun-protection',
  },
}

export const GLOSSARY_LIST = Object.entries(GLOSSARY)
  .map(([id, entry]) => ({ id, ...entry }))
  .sort((a, b) => a.term.localeCompare(b.term))
