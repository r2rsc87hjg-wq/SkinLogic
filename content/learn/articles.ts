import type { Article } from './types'

export const ARTICLES: Article[] = [

  // ══════════════════════════════════════════
  // PATH: SKINCARE FUNDAMENTALS
  // ══════════════════════════════════════════

  {
    slug: 'build-your-first-routine',
    title: 'Build Your First Skincare Routine',
    summary: 'The three steps that actually matter, why order matters, and how to start without wasting money.',
    level: 'beginner', topic: 'Routines',
    pathId: 'skincare-fundamentals', pathOrder: 1, xpReward: 40,
    readingMinutes: 4, published: '2026-01-12',
    related: ['identify-your-skin-type', 'spf-the-one-non-negotiable'],
    externalSources: [
      { title: 'Skin Care Basics', url: 'https://www.aad.org/public/everyday-care/skin-care-basics', source: 'AAD' },
      { title: 'How to Build a Simple Skincare Routine', url: 'https://dermnetnz.org/topics/skin-care', source: 'DermNet NZ' },
    ],
    body: [
      { type: 'paragraph', text: 'A good routine is shorter than the internet makes it look. For almost everyone, three steps cover the fundamentals: cleanse, moisturise, and protect from the sun. Everything else is optional and built on top of that foundation once you know how your skin reacts.' },
      { type: 'heading', text: 'The core three steps', id: 'core-three' },
      { type: 'list', ordered: true, items: [
        'Cleanse — a gentle wash removes oil, sweat, and grime without stripping your {{skin-barrier|skin barrier}}. Once at night is enough for most people; a plain water rinse in the morning is fine.',
        'Moisturise — replaces water and lipids so the barrier stays intact. Even oily skin benefits; skipping it can actually drive more oil production.',
        'Protect — a broad-spectrum {{spf|SPF}} 30+ every morning is the single highest-impact step for long-term skin health.',
      ]},
      { type: 'callout', variant: 'tip', title: 'Start with one change at a time', text: 'Introduce a single new product and use it for two weeks before adding another. If something stings, breaks you out, or flakes, you will know exactly what caused it.' },
      { type: 'heading', text: 'Why order matters', id: 'order' },
      { type: 'paragraph', text: 'Apply products thinnest to thickest. Watery serums go on before creams so they can reach the skin, and sunscreen always goes last in the morning. At night you can skip sunscreen entirely.' },
      { type: 'callout', variant: 'note', text: 'You do not need a toner, an essence, an eye cream, and seven serums. Those are refinements, not requirements. Master the core three first.' },
      { type: 'faq', items: [
        { q: 'Do I need different products for morning and night?', a: 'Not necessarily. The main difference is that sunscreen is a morning-only step, and any active that increases sun sensitivity (like a {{retinoid|retinoid}}) is best used at night.' },
        { q: 'How long until I see results?', a: 'Hydration and comfort can improve within days. Changes in texture or tone typically take 8–12 weeks — a full skin-cell turnover cycle.' },
        { q: 'Is expensive always better?', a: 'No. Price often reflects packaging and marketing more than formulation. Many inexpensive moisturisers and sunscreens perform as well as luxury ones.' },
      ]},
      { type: 'quiz', questions: [
        { q: 'Which three steps form the foundation of a routine?', options: ['Exfoliate, tone, mask', 'Cleanse, moisturise, protect', 'Serum, oil, essence', 'Retinoid, acid, vitamin C'], answer: 1, explanation: 'Cleanse, moisturise, and sun protection cover the fundamentals for nearly everyone. Everything else is optional.' },
        { q: 'When should sunscreen be applied?', options: ['Last step in the morning', 'First step at night', 'Only on sunny days', 'After moisturiser at night'], answer: 0, explanation: 'Sunscreen sits on top as a protective film, so it goes on last in the morning — and is needed even on cloudy days.' },
      ]},
    ],
  },

  {
    slug: 'identify-your-skin-type',
    title: 'How to Identify Your Skin Type',
    summary: 'Oily, dry, combination, sensitive, or acne-prone? A simple at-home method to figure out what you are actually working with.',
    level: 'beginner', topic: 'Skin types',
    pathId: 'skincare-fundamentals', pathOrder: 2, xpReward: 30,
    readingMinutes: 3, published: '2026-01-20',
    related: ['build-your-first-routine', 'understanding-acne'],
    externalSources: [
      { title: 'Skin Types', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/normal/skin-types', source: 'AAD' },
    ],
    prerequisiteSlug: 'build-your-first-routine',
    body: [
      { type: 'paragraph', text: 'Knowing your skin type is the difference between a routine that works and one that fights you. The good news: you can get a reliable read at home in a couple of hours, no gadgets required.' },
      { type: 'heading', text: 'The bare-face test', id: 'bare-face' },
      { type: 'paragraph', text: 'Wash with a gentle cleanser, then apply nothing. Wait two hours and notice how your skin feels and looks, paying attention to your forehead, nose, and cheeks separately.' },
      { type: 'list', items: [
        'Oily — shine across most of the face, visible on the cheeks too.',
        'Dry — tightness, flaking, or a rough feel; little to no shine. Often linked to higher {{transepidermal-water-loss|water loss}}.',
        'Combination — an oily T-zone (forehead and nose) with normal or dry cheeks. Very common.',
        'Sensitive — stinging, redness, or reactivity to many products regardless of oiliness.',
        'Acne-prone — a recurring tendency to form clogged pores and breakouts, which can co-exist with any of the above.',
      ]},
      { type: 'callout', variant: 'warning', title: 'Skin type is not fixed', text: 'It shifts with season, climate, hormones, age, and the products you use. A harsh routine can make normal skin behave like dry or sensitive skin — so retest if your routine changes.' },
      { type: 'faq', items: [
        { q: 'Can my skin type change with the seasons?', a: 'Yes. Cold, dry winter air commonly pushes skin toward the dry end, while heat and humidity increase oil. Adjusting your moisturiser weight seasonally is normal.' },
        { q: 'I am oily but also flaky — what gives?', a: 'That is often a damaged barrier or over-exfoliation, not true dryness. Easing off harsh products and adding a simple moisturiser usually resolves it.' },
      ]},
      { type: 'quiz', questions: [
        { q: 'An oily T-zone with dry cheeks describes which type?', options: ['Oily', 'Combination', 'Sensitive', 'Dry'], answer: 1, explanation: 'Combination skin shows different behaviour in different zones — typically an oily forehead and nose with drier cheeks.' },
        { q: 'What best defines sensitive skin?', options: ['High oil production', 'Reactivity and irritation', 'Visible pores', 'Frequent breakouts'], answer: 1, explanation: 'Sensitivity is about how reactive skin is — stinging and redness — independent of how oily or dry it is.' },
      ]},
    ],
  },

  {
    slug: 'double-cleansing-guide',
    title: 'Double Cleansing: Is It Worth It?',
    summary: 'Why two cleansers outperform one for removing sunscreen and makeup, how to do it without stripping your barrier, and who actually needs it.',
    level: 'beginner', topic: 'Routines',
    pathId: 'skincare-fundamentals', pathOrder: 3, xpReward: 35,
    readingMinutes: 3, published: '2026-02-01',
    related: ['build-your-first-routine', 'identify-your-skin-type'],
    prerequisiteSlug: 'identify-your-skin-type',
    body: [
      { type: 'paragraph', text: 'Double cleansing means using an oil-based cleanser first, then a water-based one. The idea is simple chemistry: oil dissolves oil. Sunscreen, sebum, and most makeup are oil-based, and a water-based cleanser alone can struggle to fully remove them.' },
      { type: 'heading', text: 'Step one: the oil phase', id: 'oil-phase' },
      { type: 'paragraph', text: 'A cleansing oil, balm, or micellar water breaks down sunscreen and makeup quickly. Massage it into dry skin for about 30 seconds, then rinse. You do not need anything expensive — drugstore cleansing oils work as well as luxury ones here.' },
      { type: 'heading', text: 'Step two: the water phase', id: 'water-phase' },
      { type: 'paragraph', text: 'Follow with your regular gentle gel or cream cleanser to remove residue and water-soluble impurities. This second step should be the same low-irritation cleanser you already use.' },
      { type: 'callout', variant: 'tip', title: 'Only at night', text: 'Double cleansing is an evening step. In the morning, a single gentle rinse or light cleanser is enough — you are only removing overnight products and light sweat, not SPF.' },
      { type: 'myth-fact', myth: 'Double cleansing strips and dries out skin.', fact: 'Done correctly — with a gentle oil cleanser and a non-stripping water cleanser — double cleansing is gentler than one harsh cleanser. The key is keeping both steps mild.' },
      { type: 'callout', variant: 'note', text: 'If you do not wear sunscreen or makeup, you likely do not need to double cleanse. A single gentle cleanser at night is fine for bare or minimal-product skin.' },
      { type: 'quiz', questions: [
        { q: 'Why does an oil cleanser remove sunscreen better than water-based cleansers?', options: ['It costs more', 'Oil dissolves oil-based products', 'It is hotter', 'It has more fragrance'], answer: 1, explanation: 'Sunscreen and sebum are oil-based, so a like-dissolves-like oil cleanser breaks them down much more effectively than water-based formulas.' },
        { q: 'When should you double cleanse?', options: ['Morning only', 'Every morning and night', 'Evening only', 'Only when wearing heavy makeup'], answer: 2, explanation: 'Double cleansing is an evening routine to remove the day\'s sunscreen and buildup. Morning skin just needs a light refresh.' },
      ]},
    ],
  },

  {
    slug: 'skin-cycling-explained',
    title: 'Skin Cycling Explained',
    summary: 'The four-night rotation that helps you use powerful actives without overwhelming your skin — and whether the hype matches the evidence.',
    level: 'beginner', topic: 'Routines',
    pathId: 'skincare-fundamentals', pathOrder: 4, xpReward: 40,
    readingMinutes: 3, published: '2026-02-10',
    related: ['build-your-first-routine', 'retinoids-mechanism-and-evidence'],
    prerequisiteSlug: 'double-cleansing-guide',
    body: [
      { type: 'paragraph', text: 'Skin cycling is a structured four-night rotation popularised by dermatologists as a way to use strong actives — specifically exfoliants and retinoids — without the irritation that comes from using them every night.' },
      { type: 'heading', text: 'The four-night schedule', id: 'schedule' },
      { type: 'list', ordered: true, items: [
        'Night 1: Exfoliation — use an AHA (glycolic, lactic) or BHA (salicylic). No retinoid this night.',
        'Night 2: Retinoid — apply your retinol or prescription retinoid. No exfoliant this night.',
        'Night 3: Recovery — focus on hydration and barrier support. Ceramides, peptides, hyaluronic acid, a rich moisturiser.',
        'Night 4: Recovery again — same as night 3. Let the skin consolidate the work.',
      ]},
      { type: 'callout', variant: 'tip', text: 'After recovery, the cycle resets to night 1. Some people extend recovery nights further when first starting out or when their skin feels irritated.' },
      { type: 'heading', text: 'Who benefits most', id: 'who' },
      { type: 'paragraph', text: 'Skin cycling is most useful if you are new to retinoids or acids, have sensitive skin, or have previously over-exfoliated. If your skin is already well-adapted to daily actives, a fixed routine may suit you better. The underlying principle — separating your most irritating ingredients and building in recovery — is what matters.' },
      { type: 'myth-fact', myth: 'You must follow exactly four nights to get the benefit.', fact: 'The structure is a helpful framework, not a rigid rule. What matters is the principle: active nights followed by recovery nights. Adjust the ratio to your skin.' },
      { type: 'quiz', questions: [
        { q: 'In the classic skin-cycling schedule, how many nights are recovery nights?', options: ['One', 'Two', 'Three', 'Four'], answer: 1, explanation: 'Nights 3 and 4 are both recovery nights — giving the skin time to repair and consolidate before the next active step.' },
        { q: 'What is the main purpose of skin cycling?', options: ['To use more products', 'To use actives without over-irritating the barrier', 'To increase SPF absorbency', 'To moisturise twice as much'], answer: 1, explanation: 'Skin cycling separates strong actives and adds recovery nights specifically to reduce cumulative irritation.' },
      ]},
    ],
  },

  {
    slug: 'the-moisture-sandwich',
    title: 'The Moisture Sandwich Technique',
    summary: 'Layering your moisturiser between two hits of water to lock in lasting hydration — the method, the science, and who it helps most.',
    level: 'beginner', topic: 'Routines',
    pathId: 'skincare-fundamentals', pathOrder: 5, xpReward: 35,
    readingMinutes: 3, published: '2026-02-18',
    related: ['build-your-first-routine', 'ceramides-explained'],
    prerequisiteSlug: 'skin-cycling-explained',
    body: [
      { type: 'paragraph', text: 'The moisture sandwich is a layering technique designed to maximise hydration: dampen skin with water or a hydrating toner, apply your moisturiser while skin is still damp, then optionally mist again to seal the surface.' },
      { type: 'heading', text: 'Why dampness matters', id: 'why' },
      { type: 'paragraph', text: 'Humectants in moisturisers — like hyaluronic acid and glycerin — work by drawing water toward the skin. When applied to already-damp skin, they have water immediately available to bind, rather than pulling it from deeper skin layers (which can paradoxically cause dehydration in dry environments).' },
      { type: 'ingredient-spotlight', name: 'Hyaluronic Acid', whatItDoes: 'A humectant that binds up to 1,000× its weight in water, drawing moisture to the surface layers of skin.', goodFor: ['Dry skin', 'Dehydrated skin', 'Any skin type as a hydration booster'], avoidIf: ['Very dry climates with no occlusive layer on top — it can draw moisture out of the skin instead'] },
      { type: 'callout', variant: 'tip', title: 'Seal it', text: 'In dry climates, finish with a thin occlusive layer — a balm, facial oil, or rich cream — to prevent water evaporating back out after you layer it in.' },
      { type: 'callout', variant: 'note', text: 'The moisture sandwich is most helpful for dry or dehydrated skin. If your skin is oily, a lighter routine may suit you better — heavy layering can feel uncomfortable.' },
      { type: 'quiz', questions: [
        { q: 'Why apply moisturiser to damp skin rather than dry skin?', options: ['It smells better', 'Humectants bind available surface water, boosting hydration', 'It saves product', 'Dry skin rejects moisturiser'], answer: 1, explanation: 'Humectants draw water to skin — if the surface is already damp, they have water to work with right away rather than pulling from deeper layers.' },
      ]},
    ],
  },

  {
    slug: 'patch-testing-guide',
    title: 'How to Patch Test (and Why You Should)',
    summary: 'The two-minute habit that prevents breakouts, reactions, and wasted products — exactly where to test, for how long, and what to look for.',
    level: 'beginner', topic: 'Routines',
    pathId: 'skincare-fundamentals', pathOrder: 6, xpReward: 25,
    readingMinutes: 3, published: '2026-02-25',
    related: ['identify-your-skin-type', 'build-your-first-routine'],
    prerequisiteSlug: 'the-moisture-sandwich',
    body: [
      { type: 'paragraph', text: 'Patch testing is applying a small amount of a new product to a discreet area of skin before using it on your whole face. It takes minutes and can save you weeks of healing from an avoidable reaction.' },
      { type: 'heading', text: 'How to do it', id: 'how' },
      { type: 'list', ordered: true, items: [
        'Choose a test site — the inner arm or behind the ear are low-stakes areas. Some prefer the jaw or neck for a more face-accurate test.',
        'Apply a small amount of the new product to that spot once or twice a day.',
        'Wait 48–72 hours before drawing conclusions. Some reactions take a couple of days to show up.',
        'If there is no redness, swelling, itching, or breakout, you can reasonably introduce it to your face.',
      ]},
      { type: 'callout', variant: 'warning', title: 'Patch testing is not foolproof', text: 'Your arm skin differs from your face. A clean patch test is reassuring but not a guarantee — introduce new products to the face one at a time so you can still trace reactions.' },
      { type: 'callout', variant: 'tip', text: 'If you are introducing multiple new products, test them sequentially — not at the same time. If a reaction appears, you need to know which product caused it.' },
      { type: 'quiz', questions: [
        { q: 'How long should you wait to read a patch test?', options: ['5 minutes', '24 hours', '48–72 hours', '2 weeks'], answer: 2, explanation: 'Some reactions are delayed. Waiting 48–72 hours gives a much more reliable result than checking after a few hours.' },
      ]},
    ],
  },

  {
    slug: 'morning-vs-night-routine',
    title: 'Morning vs. Night Routine: What Changes and Why',
    summary: 'Your skin has different needs in the morning (defend) and at night (repair). Here is what to keep, swap, and drop in each routine.',
    level: 'beginner', topic: 'Routines',
    pathId: 'skincare-fundamentals', pathOrder: 7, xpReward: 30,
    readingMinutes: 5, published: '2026-03-01',
    related: ['build-your-first-routine', 'skin-cycling-explained'],
    prerequisiteSlug: 'patch-testing-guide',
    body: [
      { type: 'paragraph', text: 'Morning and night routines serve opposite purposes. In the morning you are building a shield — antioxidants (like vitamin C) neutralise free radicals from UV and pollution, and SPF blocks UV before it reaches your skin. At night your skin shifts into repair mode, producing new cells and absorbing actives more effectively without competing with sunlight.' },
      { type: 'heading', text: 'What belongs in each routine', id: 'am-pm' },
      { type: 'list', items: [
        'AM: gentle cleanser (optional if skin is not oily), antioxidant serum, moisturiser, SPF — always last.',
        'PM: cleanser (always), treatment actives (retinoids, AHAs/BHAs), richer moisturiser or facial oil.',
        'SPF is morning-only — applying it at night provides no benefit.',
        'Retinoids and strong exfoliating acids are best used at night — UV can degrade them and they increase photosensitivity.',
        'You do not need different products for AM and PM unless you are using actives that specify timing.',
      ]},
      { type: 'callout', variant: 'tip', text: 'If you work nights or rarely go outside, the AM vs PM rule matters less than ensuring your actives are shielded from UV when you do step out. Apply SPF any time you will be exposed to daylight.' },
      { type: 'pip-links', items: [
        { title: 'Skin Care on a Budget', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-budget', source: 'AAD' },
        { title: 'Moisturisers and Emollients', url: 'https://dermnetnz.org/topics/moisturisers-and-emollients', source: 'DermNet NZ' },
        { title: 'The Skin Care Routine Order You Should Be Following', url: 'https://www.healthline.com/health/beauty-skin-care/skin-care-routine-order', source: 'Healthline' },
      ]},
    ],
  },

  {
    slug: 'choosing-a-cleanser',
    title: 'Choosing the Right Cleanser for Your Skin',
    summary: 'Gel, cream, foam, oil, bar — what each cleanser type actually does and how to match one to your skin type without trial and error.',
    level: 'beginner', topic: 'Routines',
    pathId: 'skincare-fundamentals', pathOrder: 8, xpReward: 30,
    readingMinutes: 5, published: '2026-03-08',
    related: ['identify-your-skin-type', 'double-cleansing-guide'],
    prerequisiteSlug: 'morning-vs-night-routine',
    body: [
      { type: 'paragraph', text: 'A cleanser is the one product every skin type uses twice a day, yet most people pick one based on packaging rather than formulation. The goal is simple: remove dirt, oil, sunscreen, and makeup without stripping the skin\'s protective acid mantle (pH 4.5–5.5). The wrong cleanser leaves skin feeling tight, squeaky, or paradoxically greasier.' },
      { type: 'heading', text: 'Which type suits your skin', id: 'types' },
      { type: 'list', items: [
        'Gel cleansers: water-based, suit oily and acne-prone skin, good at removing excess sebum.',
        'Cream or lotion cleansers: gentle, hydrating, best for dry or sensitive skin.',
        'Foam cleansers: feel light and rinse clean — check pH; many foam cleansers are alkaline and over-strip.',
        'Oil and balm cleansers: dissolve sunscreen and makeup effectively, excellent as the first step in double cleansing for all skin types.',
        'Micellar water: great for travel or minimal routines, but may leave residue — follow with a rinse-off cleanser if you wear SPF.',
      ]},
      { type: 'callout', variant: 'tip', text: 'If your skin feels tight or "squeaky clean" after washing, your cleanser is too harsh. Skin should feel comfortable and not stripped — not like it is about to flake.' },
      { type: 'pip-links', items: [
        { title: 'How to Choose a Facial Cleanser', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/dry/face-washing-101', source: 'AAD' },
        { title: 'Cleansers', url: 'https://dermnetnz.org/topics/cleansers', source: 'DermNet NZ' },
        { title: 'How to Find the Best Face Wash for Your Skin Type', url: 'https://www.healthline.com/health/beauty-skin-care/how-to-choose-a-face-wash', source: 'Healthline' },
      ]},
    ],
  },

  {
    slug: 'moisturiser-ingredients-explained',
    title: 'Moisturiser Ingredients: Humectants, Emollients, Occlusives',
    summary: 'The three categories of moisturising ingredients, what each does in the skin, and how to build hydration that actually lasts.',
    level: 'beginner', topic: 'Ingredients',
    pathId: 'skincare-fundamentals', pathOrder: 9, xpReward: 35,
    readingMinutes: 6, published: '2026-03-15',
    related: ['the-moisture-sandwich', 'ceramides-explained'],
    prerequisiteSlug: 'choosing-a-cleanser',
    body: [
      { type: 'paragraph', text: 'Most moisturisers are blends of three ingredient categories that each do a distinct job. Understanding what they are means you can decode any moisturiser label, fill in gaps in your routine, and stop spending money on marketing-driven products that do not suit your skin.' },
      { type: 'heading', text: 'The three categories', id: 'categories' },
      { type: 'list', items: [
        'Humectants draw water into the skin from the environment and deeper skin layers. Examples: glycerin, hyaluronic acid, urea, aloe vera. Apply to damp skin for best results.',
        'Emollients fill the gaps between skin cells and make skin feel smooth and soft. Examples: fatty acids, squalane, ceramides, plant oils.',
        'Occlusives form a physical layer on top of skin to slow water loss. Examples: petrolatum (the most effective), shea butter, beeswax, dimethicone.',
        'Layering order: humectant serum → emollient moisturiser → occlusive (if needed, especially at night for dry skin).',
        'Most moisturisers combine all three. If your skin is very dry, look for petrolatum or shea high in the ingredients list.',
      ]},
      { type: 'callout', variant: 'tip', text: 'Petrolatum (Vaseline) is one of the most effective occlusives available and costs almost nothing. It is not comedogenic for most people — the "clogs pores" reputation is not supported by evidence.' },
      { type: 'pip-links', items: [
        { title: 'Moisturisers and Emollients', url: 'https://dermnetnz.org/topics/moisturisers-and-emollients', source: 'DermNet NZ' },
        { title: 'Dry Skin: Overview', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/dry/dry-skin-overview', source: 'AAD' },
        { title: 'Humectants vs. Occlusives vs. Emollients', url: 'https://www.healthline.com/health/beauty-skin-care/occlusive-moisturizer', source: 'Healthline' },
      ]},
    ],
  },

  // ══════════════════════════════════════════
  // PATH: INGREDIENT SCIENCE
  // ══════════════════════════════════════════

  {
    slug: 'niacinamide-complete-guide',
    title: 'Niacinamide: The Multitasker Worth Knowing',
    summary: 'Why this form of vitamin B3 is one of the most versatile and well-tolerated ingredients in skincare — what it does, what it does not do, and how to use it.',
    level: 'intermediate', topic: 'Ingredients',
    pathId: 'ingredient-science', pathOrder: 1, xpReward: 45,
    readingMinutes: 4, published: '2026-02-05',
    related: ['ceramides-explained', 'retinoids-mechanism-and-evidence'],
    externalSources: [
      { title: 'Niacinamide — Research & Evidence', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=niacinamide+skin+clinical+trial', source: 'PubMed' },
      { title: 'Niacinamide', url: 'https://dermnetnz.org/topics/niacinamide', source: 'DermNet NZ' },
    ],
    body: [
      { type: 'paragraph', text: '{{niacinamide|Niacinamide}} is vitamin B3 in a form your skin can use directly. Unlike many actives, it addresses several concerns at once without being harsh — which is why you see it in almost every skin-type category.' },
      { type: 'heading', text: 'What niacinamide actually does', id: 'what' },
      { type: 'list', items: [
        'Strengthens the {{skin-barrier|skin barrier}} by increasing ceramide and fatty-acid production.',
        'Reduces oil production — shown in studies at 2–4% to decrease sebum output.',
        'Fades hyperpigmentation by interrupting the transfer of melanin to skin cells.',
        'Calms redness and visible inflammation.',
        'Pairs well with almost everything — retinoids, acids, vitamin C — making it a versatile supporting ingredient.',
      ]},
      { type: 'ingredient-spotlight', name: 'Niacinamide', whatItDoes: 'Vitamin B3 derivative that strengthens the barrier, regulates sebum, fades dark spots, and soothes inflammation.', goodFor: ['Oily and acne-prone skin', 'Hyperpigmentation', 'Sensitive skin', 'Rosacea-adjacent redness'], avoidIf: ['Genuine niacinamide allergies (rare)', 'Very high concentrations (10%+) can cause flushing in some people — start at 5% or below'] },
      { type: 'heading', text: 'Concentrations and what to expect', id: 'concentrations' },
      { type: 'paragraph', text: 'Studies show effect at 2–5%. Most serums are in the 5–10% range. Higher is not always better — concentrations above 10% are more likely to cause temporary flushing in sensitive skin. The sweet spot for most people is 5%.' },
      { type: 'myth-fact', myth: 'Niacinamide and vitamin C cancel each other out.', fact: 'This idea comes from old chemistry involving a different form of niacin. Modern studies show niacinamide and stable vitamin C derivatives work well together at normal skincare concentrations.' },
      { type: 'callout', variant: 'tip', text: 'Niacinamide is one of the best ingredients to add when introducing a retinoid. It supports the barrier while the skin adapts, reducing the flaking and redness of early retinoid use.' },
      { type: 'quiz', questions: [
        { q: 'At what concentrations does niacinamide show evidence of effect?', options: ['0.1–0.5%', '2–5%', '15–20%', 'Only at prescription strength'], answer: 1, explanation: 'Studies demonstrating sebum reduction and barrier support use 2–5% niacinamide. Higher concentrations are not better and can cause flushing.' },
        { q: 'Which of the following is NOT a proven effect of niacinamide?', options: ['Reducing oil production', 'Strengthening the barrier', 'Increasing sun protection', 'Fading hyperpigmentation'], answer: 2, explanation: 'Niacinamide does not block UV and cannot replace sunscreen. Its benefits are barrier support, oil reduction, and pigment-transfer interruption.' },
      ]},
    ],
  },

  {
    slug: 'ceramides-explained',
    title: 'Ceramides: Your Skin Barrier\'s Main Ingredient',
    summary: 'Ceramides make up 50% of the outer skin barrier. What they are, how they work, and why replacing them with skincare products actually helps.',
    level: 'intermediate', topic: 'Ingredients',
    pathId: 'ingredient-science', pathOrder: 2, xpReward: 45,
    readingMinutes: 4, published: '2026-02-12',
    related: ['niacinamide-complete-guide', 'the-moisture-sandwich'],
    externalSources: [
      { title: 'Ceramides & the Skin Barrier', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=ceramides+skin+barrier+atopic+dermatitis', source: 'PubMed' },
      { title: 'Ceramide', url: 'https://dermnetnz.org/topics/ceramide', source: 'DermNet NZ' },
    ],
    prerequisiteSlug: 'niacinamide-complete-guide',
    body: [
      { type: 'paragraph', text: 'Your outer skin barrier is often compared to a brick wall. The "bricks" are dead skin cells; the "mortar" is a mixture of lipids — and ceramides make up roughly half of that mortar. When ceramide levels drop, the wall develops gaps: water escapes and irritants get in.' },
      { type: 'heading', text: 'What happens when ceramides deplete', id: 'depletion' },
      { type: 'paragraph', text: 'Age, harsh cleansers, over-exfoliation, low humidity, and genetic conditions like eczema all reduce ceramide levels. The symptoms are familiar: dryness, tightness, sensitivity, redness, and increased reactivity. Essentially, the barrier cannot do its job.' },
      { type: 'ingredient-spotlight', name: 'Ceramides', whatItDoes: 'Lipid molecules that form the structural mortar of the skin barrier, preventing water loss and blocking irritant entry.', goodFor: ['Dry skin', 'Eczema-prone skin', 'Post-retinoid barrier support', 'Sensitive or reactive skin'], avoidIf: ['No known contraindications — ceramides are naturally occurring in skin'] },
      { type: 'heading', text: 'Do topical ceramides actually work?', id: 'evidence' },
      { type: 'paragraph', text: 'Yes, with nuance. Topical ceramides are structurally similar to skin ceramides and integrate into the stratum corneum, reducing transepidermal water loss ({{transepidermal-water-loss|TEWL}}). Multiple randomised trials show them improving dryness and eczema symptoms. They work best in combination with other barrier lipids — cholesterol and fatty acids — which is why good barrier creams include all three.' },
      { type: 'callout', variant: 'tip', text: 'Look for a moisturiser that lists ceramides alongside cholesterol and fatty acids (like linoleic or stearic acid). This trio mimics the natural ratio in skin lipids and has the best evidence.' },
      { type: 'callout', variant: 'note', text: 'Ceramides are often labelled as ceramide NP, AP, EOP, NS, or AS on ingredient lists. You do not need to know the subtypes — what matters is that multiple ceramides appear near the top of the list.' },
      { type: 'quiz', questions: [
        { q: 'What percentage of the outer skin barrier\'s lipid mortar is made of ceramides?', options: ['About 10%', 'About 50%', 'About 80%', 'About 100%'], answer: 1, explanation: 'Ceramides make up approximately 50% of the lipid mixture (the "mortar") in the stratum corneum.' },
        { q: 'What does TEWL stand for, and why does it matter?', options: ['Trans-epidermal water loss — water escaping through a weakened barrier', 'Total electrolyte water limit', 'Topical emollient water layer', 'Transient electrolyte without lipids'], answer: 0, explanation: 'TEWL measures how much water evaporates through the skin. High TEWL signals a damaged barrier — ceramides help reduce it.' },
      ]},
    ],
  },

  {
    slug: 'vitamin-c-guide',
    title: 'Vitamin C in Skincare: Forms, Benefits, and Stability',
    summary: 'The antioxidant superstar explained — why it works, why formulation matters enormously, and how to pick a product that actually delivers.',
    level: 'intermediate', topic: 'Ingredients',
    pathId: 'ingredient-science', pathOrder: 3, xpReward: 50,
    readingMinutes: 5, published: '2026-02-20',
    related: ['niacinamide-complete-guide', 'spf-the-one-non-negotiable'],
    externalSources: [
      { title: 'Topical Vitamin C Research', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=topical+vitamin+c+ascorbic+acid+skin+brightening', source: 'PubMed' },
      { title: 'Vitamin C & Skin Health', url: 'https://dermnetnz.org/topics/vitamin-c', source: 'DermNet NZ' },
    ],
    prerequisiteSlug: 'ceramides-explained',
    body: [
      { type: 'paragraph', text: 'Vitamin C (ascorbic acid) is one of the most-studied topical actives. It brightens, defends against free-radical damage, and supports collagen production. But it is also notoriously unstable — which is why so many vitamin C products disappoint despite strong ingredient-list credentials.' },
      { type: 'heading', text: 'What vitamin C does in skin', id: 'benefits' },
      { type: 'list', items: [
        'Antioxidant — neutralises free radicals generated by UV and pollution, reducing oxidative damage to collagen.',
        'Brightening — inhibits tyrosinase, the enzyme needed for melanin production, which fades existing dark spots and prevents new ones.',
        'Collagen support — ascorbic acid is a required co-factor for collagen synthesis; deficiency causes the barrier to weaken.',
        'Synergy with SPF — vitamin C and sunscreen together provide better UV protection than either alone.',
      ]},
      { type: 'heading', text: 'The stability problem', id: 'stability' },
      { type: 'paragraph', text: 'Pure L-ascorbic acid oxidises quickly on contact with air and light, turning yellow then brown as it degrades. A degraded product loses its antioxidant activity — sometimes even generating free radicals instead of neutralising them.' },
      { type: 'ingredient-spotlight', name: 'L-Ascorbic Acid (Vitamin C)', whatItDoes: 'The most potent and studied form. Brightens, antioxidises, and supports collagen.', goodFor: ['Dull skin', 'Hyperpigmentation', 'All skin types as an antioxidant', 'Pairing with SPF'], avoidIf: ['Sensitive or rosacea skin may react to low-pH formulas — try stable derivatives instead', 'Avoid if the product is visibly yellowed or brown — it has oxidised'] },
      { type: 'callout', variant: 'tip', title: 'How to spot a good formula', text: 'Effective L-ascorbic acid serums are formulated at pH 3.5 or below (check the brand\'s website), are clear or very pale yellow, and come in opaque or airless packaging. If your serum has gone orange or brown, it is past its useful life.' },
      { type: 'callout', variant: 'note', title: 'Stable derivatives', text: 'Ascorbyl glucoside, sodium ascorbyl phosphate, and ascorbyl tetraisopalmitate are more stable forms that convert to ascorbic acid in skin. Less potent than pure L-AA but much less finicky to formulate and store.' },
      { type: 'quiz', questions: [
        { q: 'Why does a vitamin C serum that has turned orange-brown matter?', options: ['It is a sign of a stronger product', 'The ascorbic acid has oxidised and lost its beneficial activity', 'It means the pH has risen to an optimal level', 'It smells better when oxidised'], answer: 1, explanation: 'Oxidised ascorbic acid has lost its antioxidant activity. In some cases oxidised vitamin C can even cause oxidative stress — discard any product that has significantly discoloured.' },
        { q: 'Which of the following is a genuine benefit of topical vitamin C?', options: ['UV filter (replaces SPF)', 'Antioxidant protection and brightening', 'Exfoliation of dead skin', 'Deep pore cleansing'], answer: 1, explanation: 'Vitamin C is an antioxidant and tyrosinase inhibitor — not a sunscreen, exfoliant, or pore cleanser.' },
      ]},
    ],
  },

  {
    slug: 'retinoids-mechanism-and-evidence',
    title: 'Retinoids: Mechanism and Evidence',
    summary: 'How vitamin-A derivatives work at the cellular level, the strength ladder from retinol to tretinoin, and how to use them without wrecking your barrier.',
    level: 'advanced', topic: 'Ingredients',
    pathId: 'ingredient-science', pathOrder: 4, xpReward: 60,
    readingMinutes: 6, published: '2026-03-22',
    related: ['understanding-acne', 'spf-the-one-non-negotiable'],
    externalSources: [
      { title: 'Retinoids for Skin', url: 'https://dermnetnz.org/topics/retinoid', source: 'DermNet NZ' },
      { title: 'Retinoid Clinical Evidence', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=retinol+retinoid+anti+aging+skin+randomized+clinical+trial', source: 'PubMed' },
    ],
    prerequisiteSlug: 'vitamin-c-guide',
    body: [
      { type: 'paragraph', text: '{{retinoid|Retinoids}} are the most rigorously studied actives in skincare. Understanding how they work makes it obvious why they take time, why they irritate at first, and why sun protection is non-negotiable alongside them.' },
      { type: 'heading', text: 'Mechanism of action', id: 'mechanism' },
      { type: 'paragraph', text: 'Retinoids bind nuclear retinoic-acid receptors and change gene expression in skin cells. The downstream effects: faster, more orderly keratinocyte turnover (so pores clog less), increased collagen production, and reduced breakdown of existing collagen.' },
      { type: 'callout', variant: 'note', title: 'Conversion steps determine strength', text: 'Your skin converts retinol → retinaldehyde → retinoic acid (the active form). Each conversion step loses potency, which is why prescription tretinoin (already retinoic acid) is stronger than over-the-counter retinol.' },
      { type: 'heading', text: 'The strength ladder', id: 'ladder' },
      { type: 'list', ordered: true, items: [
        'Retinyl esters — gentlest, weakest; several conversion steps from active.',
        'Retinol — the common OTC standard; good evidence at tolerated concentrations.',
        'Retinaldehyde — one step from active, stronger than retinol, still OTC.',
        'Tretinoin / tazarotene — prescription retinoic acid; strongest evidence and strongest irritation.',
      ]},
      { type: 'callout', variant: 'warning', title: 'Retinisation is real', text: 'The first 2–6 weeks commonly bring dryness, flaking, and redness as skin adapts. This is expected, not an allergy — but pushing through too fast can genuinely damage the {{skin-barrier|barrier}}.' },
      { type: 'heading', text: 'Using them well', id: 'using' },
      { type: 'list', items: [
        'Start low and slow — two or three nights a week, then build up as tolerated.',
        'Apply to dry skin and pair with a plain moisturiser to buffer irritation.',
        'Use at night; retinoids are degraded by light and can increase sun sensitivity.',
        'Always pair with morning {{spf|SPF}}.',
      ]},
      { type: 'faq', items: [
        { q: 'Can I use a retinoid with acids or vitamin C?', a: 'You can, but introducing them on alternate nights reduces irritation risk while adapting. Once tolerised, many people combine them.' },
        { q: 'Is retinol safe during pregnancy?', a: 'Topical retinoids are generally advised against in pregnancy. Consult your doctor.' },
      ]},
      { type: 'quiz', questions: [
        { q: 'Why is tretinoin stronger than OTC retinol?', options: ['It is a different vitamin', 'It is already the active retinoic-acid form', 'It contains more fragrance', 'It is oil-based'], answer: 1, explanation: 'Retinol must be converted through several steps to retinoic acid, losing potency each step. Tretinoin is already retinoic acid.' },
        { q: 'Why must retinoids be paired with daily SPF?', options: ['They smell of citrus', 'Sun degrades them and increases sensitivity, undoing the collagen benefit', 'SPF converts retinol to tretinoin', 'It makes them work at night'], answer: 1, explanation: 'Retinoids increase sun sensitivity and UV breaks down collagen — so unprotected sun exposure both irritates skin and cancels the main benefit.' },
      ]},
    ],
  },

  {
    slug: 'peptides-for-skin',
    title: 'Peptides: What They Are and What They Can (Actually) Do',
    summary: 'Peptides are everywhere in skincare marketing. Here is what the science actually supports, which types have the best evidence, and how to use them.',
    level: 'advanced', topic: 'Ingredients',
    pathId: 'ingredient-science', pathOrder: 5, xpReward: 55,
    readingMinutes: 4, published: '2026-03-10',
    related: ['retinoids-mechanism-and-evidence', 'ceramides-explained'],
    externalSources: [
      { title: 'Peptides in Skincare', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=cosmetic+peptides+skin+anti+aging+clinical', source: 'PubMed' },
    ],
    prerequisiteSlug: 'retinoids-mechanism-and-evidence',
    body: [
      { type: 'paragraph', text: 'Peptides are short chains of amino acids — the building blocks of proteins. In skin, the relevant proteins are collagen and elastin. The idea behind peptide skincare is that applying these fragments signals the skin to produce more of those structural proteins.' },
      { type: 'heading', text: 'The signalling theory', id: 'signalling' },
      { type: 'paragraph', text: 'When collagen breaks down, it releases short peptide fragments. The skin reads these as a signal that repair is needed and increases collagen synthesis. Topical peptides may mimic this signal. The evidence is real but more modest than retinoid evidence — peptides work slowly and require consistent use.' },
      { type: 'ingredient-spotlight', name: 'Matrixyl (Palmitoyl Pentapeptide-4)', whatItDoes: 'One of the best-studied signal peptides. Stimulates collagen and fibronectin production, reducing fine lines with consistent use.', goodFor: ['Anti-aging routines', 'Fine lines and texture', 'Sensitive skin that cannot tolerate retinoids'], avoidIf: ['No known contraindications — peptides are generally very well-tolerated'] },
      { type: 'heading', text: 'Types of peptides', id: 'types' },
      { type: 'list', items: [
        'Signal peptides — tell skin to produce more collagen (Matrixyl, Argireline at low doses).',
        'Carrier peptides — deliver minerals to skin (copper peptides are the main example, with some evidence for wound healing).',
        'Neurotransmitter-inhibiting peptides — claimed to relax muscle contractions (Argireline); evidence at cosmetic concentrations is weak.',
      ]},
      { type: 'callout', variant: 'tip', text: 'Peptides pair very well with moisturisers and barrier-supportive ingredients. They are also compatible with most actives, making them a flexible addition to an established routine.' },
      { type: 'callout', variant: 'warning', text: 'Peptides need to stay on the skin to work — they should not be in a rinse-off product. Look for them in serums or moisturisers, and avoid mixing immediately with strong acids, which can break the peptide bonds.' },
      { type: 'quiz', questions: [
        { q: 'How do signal peptides like Matrixyl work?', options: ['They physically fill wrinkles', 'They mimic collagen breakdown fragments to trigger repair synthesis', 'They block UV rays', 'They exfoliate the skin surface'], answer: 1, explanation: 'Signal peptides mimic the fragments released when collagen breaks down, triggering the skin\'s own collagen production response.' },
        { q: 'Why should peptides be in leave-on (not rinse-off) products?', options: ['They smell better', 'They need time on skin to be absorbed and signal cells', 'They are too expensive to rinse away', 'They damage drains'], answer: 1, explanation: 'Peptides need extended skin contact to penetrate and signal cells. A rinse-off product does not give them sufficient dwell time.' },
      ]},
    ],
  },

  {
    slug: 'azelaic-acid-guide',
    title: 'Azelaic Acid: The Overlooked Multitasker',
    summary: 'Anti-inflammatory, brightening, and gentle enough for rosacea — why azelaic acid deserves more attention, and how to use it.',
    level: 'intermediate', topic: 'Ingredients',
    pathId: 'ingredient-science', pathOrder: 6, xpReward: 45,
    readingMinutes: 6, published: '2026-03-20',
    related: ['niacinamide-complete-guide', 'hyperpigmentation-types-guide'],
    prerequisiteSlug: 'peptides-for-skin',
    body: [
      { type: 'paragraph', text: 'Azelaic acid is one of the few skincare actives that simultaneously treats acne, reduces redness from rosacea, and fades dark spots — without the irritation profile of retinoids or strong acids. It works by inhibiting the enzyme tyrosinase (which produces melanin) and killing the bacteria that drive acne, while reducing inflammatory signals in the skin.' },
      { type: 'list', items: [
        'At 10% OTC: effective for mild-to-moderate acne and early hyperpigmentation.',
        'At 15–20% prescription: demonstrated efficacy for rosacea (papulopustular subtype) and melasma.',
        'One of very few actives considered safe to use during pregnancy — discuss with your doctor.',
        'Pairs well with niacinamide, SPF, and gentle moisturisers. Avoid combining with other strong acids on the same application.',
        'Can cause mild tingling on application, especially in the first few weeks. This usually fades.',
      ]},
      { type: 'callout', variant: 'tip', text: 'Azelaic acid is especially useful for post-acne marks (PIH) in skin tones that scar easily, because it both treats the underlying inflammation and fades the resulting discolouration.' },
      { type: 'pip-links', items: [
        { title: 'Azelaic Acid', url: 'https://dermnetnz.org/topics/azelaic-acid', source: 'DermNet NZ' },
        { title: 'Rosacea Treatment: AAD Overview', url: 'https://www.aad.org/public/diseases/rosacea/treatment/options', source: 'AAD' },
        { title: 'Azelaic Acid for Acne and Hyperpigmentation', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=azelaic+acid+skin+randomized', source: 'PubMed' },
      ]},
    ],
  },

  {
    slug: 'tranexamic-acid-guide',
    title: 'Tranexamic Acid: New Evidence for Hyperpigmentation',
    summary: 'A newer brightening ingredient with surprisingly strong clinical evidence. What it is, what it does, and how it compares to vitamin C and niacinamide.',
    level: 'intermediate', topic: 'Ingredients',
    pathId: 'ingredient-science', pathOrder: 7, xpReward: 45,
    readingMinutes: 5, published: '2026-03-28',
    related: ['vitamin-c-guide', 'hyperpigmentation-types-guide'],
    prerequisiteSlug: 'azelaic-acid-guide',
    body: [
      { type: 'paragraph', text: 'Tranexamic acid (TXA) is a relative newcomer to skincare that has gained strong clinical backing for melasma and post-inflammatory hyperpigmentation. It works differently from most brighteners: rather than blocking melanin production directly, it inhibits plasmin — an enzyme that triggers the chain of signals causing pigment cells to overproduce melanin in the first place.' },
      { type: 'list', items: [
        'Effective concentration range: 2–5% topical. More is not always better.',
        'Best evidence is for melasma, where it has outperformed kojic acid in some trials.',
        'Also used orally at prescription doses — a different application for heavy menstrual bleeding, not skincare.',
        'Pairs well with niacinamide and vitamin C for a layered brightening approach.',
        'Generally well tolerated; less irritating than hydroquinone, which it may eventually replace for many patients.',
      ]},
      { type: 'callout', variant: 'tip', text: 'TXA works best paired with strict daily SPF — without sun protection, any brightening active is fighting an uphill battle as UV continuously triggers more pigmentation.' },
      { type: 'pip-links', items: [
        { title: 'Tranexamic Acid for Melasma', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=tranexamic+acid+melasma+topical+randomized', source: 'PubMed' },
        { title: 'Melasma', url: 'https://dermnetnz.org/topics/melasma', source: 'DermNet NZ' },
        { title: 'Hyperpigmentation: AAD Overview', url: 'https://www.aad.org/public/diseases/a-z/melasma-overview', source: 'AAD' },
      ]},
    ],
  },

  {
    slug: 'hyaluronic-acid-explained',
    title: 'Hyaluronic Acid: The Hydration Ingredient Explained',
    summary: 'The most hyped humectant in skincare — what it actually does, why molecular weight matters, and when it can backfire.',
    level: 'beginner', topic: 'Ingredients',
    pathId: 'ingredient-science', pathOrder: 8, xpReward: 35,
    readingMinutes: 5, published: '2026-04-05',
    related: ['the-moisture-sandwich', 'moisturiser-ingredients-explained'],
    prerequisiteSlug: 'tranexamic-acid-guide',
    body: [
      { type: 'paragraph', text: 'Hyaluronic acid (HA) is a glycosaminoglycan — a long chain sugar molecule naturally found in skin, joints, and connective tissue. In skincare, it acts as a humectant, capable of holding up to 1,000 times its weight in water. This makes it one of the most effective ingredients for surface hydration, though its mechanism is sometimes misunderstood.' },
      { type: 'list', items: [
        'Apply to damp skin: HA draws water from its immediate environment. On dry skin in a dry climate, it can pull moisture upward from the dermis and then lose it to the air, paradoxically leaving skin drier.',
        'Seal it in: always follow HA with a moisturiser or emollient to lock the drawn-in moisture.',
        'Molecular weight matters: low-molecular-weight HA penetrates deeper and may have stronger anti-inflammatory effects; high-MW HA sits on the surface and provides a plumping, smoothing effect.',
        'HA is not a permanent plumper — the effect is temporary and depends on continued use and hydration.',
        'Very well tolerated; rarely causes irritation and suits all skin types including sensitive and acne-prone.',
      ]},
      { type: 'callout', variant: 'tip', text: 'If you live in a dry environment and find HA is not working — or makes your skin feel drier — try applying it to skin misted with water or right after cleansing while skin is still damp, then immediately following with moisturiser.' },
      { type: 'pip-links', items: [
        { title: 'Hyaluronic Acid', url: 'https://dermnetnz.org/topics/hyaluronic-acid', source: 'DermNet NZ' },
        { title: 'Hyaluronic Acid Research', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=hyaluronic+acid+skin+moisturization+clinical', source: 'PubMed' },
        { title: 'Dry Skin Tips', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/dry/dermatologists-tips-relieving-dry-skin', source: 'AAD' },
      ]},
    ],
  },

  {
    slug: 'aha-bha-deep-dive',
    title: 'AHAs vs BHAs: Chemical Exfoliation Explained',
    summary: 'The difference between alpha and beta hydroxy acids, which skin concerns they target, how to use them safely, and what to avoid combining them with.',
    level: 'intermediate', topic: 'Ingredients',
    pathId: 'ingredient-science', pathOrder: 9, xpReward: 50,
    readingMinutes: 7, published: '2026-04-12',
    related: ['skin-cycling-explained', 'retinoids-mechanism-and-evidence'],
    prerequisiteSlug: 'hyaluronic-acid-explained',
    body: [
      { type: 'paragraph', text: 'Chemical exfoliants dissolve the bonds holding dead skin cells together, revealing fresher skin underneath without the micro-tears that physical scrubs can cause. They split into two families: AHAs work on the skin\'s surface and are water-soluble; BHA (salicylic acid) is oil-soluble and can penetrate into pores. Both require an acidic pH (below 4.5) to be effective.' },
      { type: 'heading', text: 'AHAs vs BHA at a glance', id: 'aha-bha' },
      { type: 'list', items: [
        'Glycolic acid (AHA): smallest molecule, deepest surface penetration, most evidence for fine lines and dullness. Can be irritating for sensitive skin.',
        'Lactic acid (AHA): gentler than glycolic, also mildly hydrating, good starting point for AHA beginners.',
        'Mandelic acid (AHA): largest molecule, slowest penetration, gentlest AHA — well suited to sensitive or darker skin tones.',
        'Salicylic acid (BHA): penetrates sebum, gets inside pores, reduces blackheads and inflammatory acne. Best choice for oily and acne-prone skin.',
        'Do not layer AHAs/BHAs with retinoids on the same night — too much acid disruption risks barrier damage. Alternate nights instead.',
        'Always apply SPF the morning after using any exfoliant — freshly exfoliated skin is more UV-sensitive.',
      ]},
      { type: 'pip-links', items: [
        { title: 'Chemical Peels and Exfoliants', url: 'https://dermnetnz.org/topics/chemical-peels', source: 'DermNet NZ' },
        { title: 'Exfoliants: AAD Overview', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/care/exfoliate', source: 'AAD' },
        { title: 'Alpha and Beta Hydroxy Acids — Research', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=glycolic+acid+lactic+acid+salicylic+skin+randomized', source: 'PubMed' },
      ]},
    ],
  },

  {
    slug: 'bakuchiol-retinol-alternative',
    title: 'Bakuchiol: Retinol Alternative or Marketing Hype?',
    summary: 'The plant-based retinol alternative — what the evidence actually shows, how it compares head-to-head, and who should consider it.',
    level: 'intermediate', topic: 'Ingredients',
    pathId: 'ingredient-science', pathOrder: 10, xpReward: 40,
    readingMinutes: 5, published: '2026-04-20',
    related: ['retinoids-mechanism-and-evidence', 'ceramides-explained'],
    prerequisiteSlug: 'aha-bha-deep-dive',
    body: [
      { type: 'paragraph', text: 'Bakuchiol is a plant-derived compound extracted from the seeds of Psoralea corylifolia. It received significant attention after a 2019 randomised controlled trial found it produced comparable improvements in fine lines, pigmentation, and skin elasticity to retinol over 12 weeks — with significantly less irritation. It achieves this by binding to some of the same retinoid receptors in the skin, though by a different pathway.' },
      { type: 'list', items: [
        'The 2019 Dhaliwal et al. RCT (British Journal of Dermatology) is the key study — it compared 0.5% bakuchiol twice daily vs 0.5% retinol once daily.',
        'Does not cause the initial purging, peeling, or sun sensitivity that retinol often does.',
        'Considered pregnancy-safe in the skincare community, though formal studies are limited — always consult your doctor.',
        'Cannot yet be called a direct equivalent to prescription retinoids (tretinoin) for acne or deep wrinkles — the evidence base is smaller.',
        'Best suited to: retinol intolerant skin, those who are pregnant or trying to conceive, and anyone wanting a gentler entry into retinoid-like benefits.',
      ]},
      { type: 'myth-fact', myth: 'Bakuchiol is just as good as tretinoin for anti-aging.', fact: 'Bakuchiol shows promise comparable to OTC retinol, but tretinoin (prescription) has decades of evidence behind it. Bakuchiol is a gentler alternative to retinol — not a replacement for prescription-strength retinoids.' },
      { type: 'pip-links', items: [
        { title: 'Bakuchiol vs Retinol RCT (Dhaliwal 2019)', url: 'https://pubmed.ncbi.nlm.nih.gov/30168772/', source: 'PubMed' },
        { title: 'Retinoids', url: 'https://dermnetnz.org/topics/retinoids', source: 'DermNet NZ' },
        { title: 'Retinol: AAD Overview', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/anti-aging/retinoid', source: 'AAD' },
      ]},
    ],
  },

  {
    slug: 'glycerin-squalane-guide',
    title: 'Glycerin and Squalane: The Unsung Workhorses',
    summary: 'Two of the most effective and underrated moisturising ingredients — what makes them special, their differences, and how to use them.',
    level: 'beginner', topic: 'Ingredients',
    pathId: 'ingredient-science', pathOrder: 11, xpReward: 35,
    readingMinutes: 5, published: '2026-04-28',
    related: ['moisturiser-ingredients-explained', 'the-moisture-sandwich'],
    prerequisiteSlug: 'bakuchiol-retinol-alternative',
    body: [
      { type: 'paragraph', text: 'Glycerin and squalane are two of the most universally tolerated skincare ingredients — found in everything from drugstore lotions to luxury serums. They serve different but complementary roles: glycerin pulls water into the skin; squalane helps lock it there while making the skin feel smooth and comfortable. Neither is comedogenic, and both suit almost every skin type.' },
      { type: 'list', items: [
        'Glycerin: a humectant naturally produced by the skin; highly effective at drawing moisture from the environment into the skin\'s upper layers. Cheap, stable, and well-studied.',
        'Squalane: a saturated, stable form of squalene (not to be confused — squalene oxidises and can clog pores; squalane does not). Derived from sugarcane or olives (not shark liver, in modern formulations). Acts as a lightweight emollient and mild occlusive.',
        'Both are fragrance-free and non-sensitising — among the safest options for reactive or eczema-prone skin.',
        'Glycerin works best applied to damp skin; squalane can be used on damp or dry skin and also works as a dry oil for hair.',
        'They pair extremely well together: use a glycerin-based serum underneath, then a squalane-based moisturiser or facial oil on top.',
      ]},
      { type: 'pip-links', items: [
        { title: 'Glycerin in Skincare', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=glycerin+glycerol+skin+moisturization', source: 'PubMed' },
        { title: 'Moisturisers and Emollients', url: 'https://dermnetnz.org/topics/moisturisers-and-emollients', source: 'DermNet NZ' },
        { title: 'How to Choose the Right Face Oil', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/care/face-oil', source: 'AAD' },
      ]},
    ],
  },

  {
    slug: 'zinc-for-skin',
    title: 'Zinc in Skincare: Mineral SPF, Acne, and More',
    summary: 'Zinc oxide in sunscreen, zinc supplements for acne, and zinc-containing serums — what each form does and what the evidence supports.',
    level: 'intermediate', topic: 'Ingredients',
    pathId: 'ingredient-science', pathOrder: 12, xpReward: 40,
    readingMinutes: 5, published: '2026-05-05',
    related: ['spf-the-one-non-negotiable', 'understanding-acne'],
    prerequisiteSlug: 'glycerin-squalane-guide',
    body: [
      { type: 'paragraph', text: 'Zinc shows up in skincare in three distinct roles: as a mineral UV filter (zinc oxide in sunscreen), as a topical anti-acne ingredient (zinc acetate, zinc PCA), and as an oral supplement for inflammatory acne. The evidence varies meaningfully across these three applications, so it\'s worth understanding each separately.' },
      { type: 'list', items: [
        'Zinc oxide (sunscreen): FDA-approved UV filter, broad-spectrum (UVA and UVB), photostable, and well-tolerated by sensitive skin. The main downside is white cast at higher concentrations — tinted formulas solve this.',
        'Topical zinc (anti-acne): zinc acetate and zinc PCA reduce Cutibacterium acnes bacteria and regulate sebum. Often combined with erythromycin (antibiotic) in prescription formulas to reduce antibiotic resistance.',
        'Oral zinc: several meta-analyses show modest benefit for inflammatory acne, roughly comparable to oral antibiotics but with fewer resistance concerns. Evidence is moderate quality. Common side effect: nausea (take with food).',
        'Zinc deficiency itself worsens acne — if diet is poor, supplementation may help more than for those with adequate zinc levels.',
      ]},
      { type: 'pip-links', items: [
        { title: 'Zinc and Acne — Research', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=zinc+acne+randomized+controlled+trial', source: 'PubMed' },
        { title: 'Zinc', url: 'https://dermnetnz.org/topics/zinc', source: 'DermNet NZ' },
        { title: 'Sunscreen FAQs', url: 'https://www.aad.org/public/everyday-care/sun-protection/sunscreen-patients/sunscreen-faqs', source: 'AAD' },
      ]},
    ],
  },

  // ══════════════════════════════════════════
  // PATH: SUN PROTECTION MASTERY
  // ══════════════════════════════════════════

  {
    slug: 'spf-the-one-non-negotiable',
    title: 'Sunscreen: The One Non-Negotiable',
    summary: 'What SPF and broad-spectrum actually mean, how much to apply, and why daily use is the most evidence-backed thing you can do for your skin.',
    level: 'beginner', topic: 'Sun protection',
    pathId: 'sun-protection', pathOrder: 1, xpReward: 40,
    readingMinutes: 4, published: '2026-02-02',
    related: ['build-your-first-routine', 'chemical-vs-mineral-sunscreen'],
    externalSources: [
      { title: 'Sun Protection', url: 'https://www.aad.org/public/everyday-care/sun-protection', source: 'AAD' },
      { title: 'Sunscreen', url: 'https://dermnetnz.org/topics/sunscreen', source: 'DermNet NZ' },
    ],
    body: [
      { type: 'paragraph', text: 'If you do one thing for your skin, make it daily sun protection. UV exposure is the largest controllable driver of visible aging and a key risk factor for skin cancer. No serum comes close to its proven impact.' },
      { type: 'heading', text: 'Reading the label', id: 'label' },
      { type: 'list', items: [
        '{{spf|SPF}} measures UVB protection — the rays that burn. SPF 30 blocks ~97%, SPF 50 ~98%.',
        'Broad-spectrum means it also covers UVA — the rays that drive aging and penetrate deeper. You want both.',
        'Water-resistant ratings (40 or 80 minutes) tell you how long protection holds during sweat or swimming.',
      ]},
      { type: 'callout', variant: 'warning', title: 'Most people under-apply', text: 'The tested SPF assumes about two milligrams per square centimetre — roughly a quarter-teaspoon for the face alone. Apply too thin and you get a fraction of the labelled protection.' },
      { type: 'heading', text: 'Mineral vs chemical', id: 'mineral-chemical' },
      { type: 'paragraph', text: 'Mineral filters (zinc oxide, titanium dioxide) sit on the surface and reflect UV; chemical filters absorb it within the film. Both are effective and safe. The best sunscreen is the one you will actually reapply.' },
      { type: 'faq', items: [
        { q: 'Do I need sunscreen indoors or in winter?', a: 'UVA passes through glass and clouds, so meaningful exposure happens near windows and on overcast days. Daily use is the simplest reliable habit.' },
        { q: 'Does a high SPF let me skip reapplication?', a: 'No. SPF measures strength, not duration. Reapplication during sun exposure still applies.' },
      ]},
      { type: 'quiz', questions: [
        { q: 'What does "broad-spectrum" indicate?', options: ['Protection against UVA and UVB', 'A higher SPF number', 'Water resistance', 'A mineral formula'], answer: 0, explanation: 'Broad-spectrum means the sunscreen covers UVA (aging) in addition to the UVB (burning) that SPF measures.' },
        { q: 'Why do many people get less protection than the label says?', options: ['They use mineral sunscreen', 'They apply too little', 'They use SPF 50', 'They apply it at night'], answer: 1, explanation: 'Lab SPF assumes a generous layer (~2 mg/cm²). Applying a thin layer gives a fraction of the rated protection.' },
      ]},
    ],
  },

  {
    slug: 'chemical-vs-mineral-sunscreen',
    title: 'Chemical vs. Mineral Sunscreen: What Actually Matters',
    summary: 'The real differences between mineral (physical) and chemical UV filters — efficacy, feel, safety, skin type fit, and the hybrid middle ground.',
    level: 'beginner', topic: 'Sun protection',
    pathId: 'sun-protection', pathOrder: 2, xpReward: 45,
    readingMinutes: 4, published: '2026-02-28',
    related: ['spf-the-one-non-negotiable', 'spf-numbers-explained'],
    prerequisiteSlug: 'spf-the-one-non-negotiable',
    body: [
      { type: 'paragraph', text: 'The mineral-vs-chemical debate generates more heat than it warrants. Both types protect effectively. The difference comes down to formulation aesthetics, skin type fit, and personal preference — not one being universally safer or better.' },
      { type: 'heading', text: 'How each type works', id: 'how' },
      { type: 'list', items: [
        'Mineral (physical) filters — zinc oxide and titanium dioxide sit on the skin surface. They absorb and scatter UV. They are photostable and start working immediately after application.',
        'Chemical filters — avobenzone, octinoxate, oxybenzone, and others absorb UV and convert it to heat. They require 15–20 minutes to reach full efficacy after application.',
      ]},
      { type: 'ingredient-spotlight', name: 'Zinc Oxide', whatItDoes: 'Broad-spectrum mineral UV filter that scatters and absorbs both UVA and UVB. The gold-standard single mineral filter.', goodFor: ['Sensitive skin', 'Rosacea', 'Immediate post-procedure skin', 'Children\'s sunscreen'], avoidIf: ['Those bothered by white cast — nano-zinc minimises this but concerns exist; non-nano leaves more cast'] },
      { type: 'heading', text: 'Choosing based on skin type', id: 'skin-type' },
      { type: 'list', items: [
        'Oily or acne-prone — lightweight chemical formulas often feel less heavy than mineral. Look for oil-free chemical options.',
        'Sensitive or rosacea — mineral (especially zinc oxide) is less likely to cause stinging or flare-ups.',
        'Darker skin tones — many mineral sunscreens leave a white or grey cast. Chemical or hybrid formulas generally blend better.',
        'Anyone who dislikes reapplication — mineral formulas tend to be more photostable.',
      ]},
      { type: 'myth-fact', myth: 'Mineral sunscreen is always safer than chemical sunscreen.', fact: 'Mineral filters have a longer safety track record and are preferred for specific groups (infants, post-procedure skin). But chemical filters at approved concentrations are considered safe by major regulatory bodies. "Natural" does not mean safer.' },
      { type: 'callout', variant: 'tip', text: 'Hybrid sunscreens combine both mineral and chemical filters — they tend to offer better aesthetics than pure mineral while adding photostability that some chemical filters lack.' },
      { type: 'quiz', questions: [
        { q: 'Which UV filter type requires waiting 15–20 minutes before going outside?', options: ['Mineral (zinc oxide)', 'Chemical (avobenzone etc.)', 'Both types', 'Neither — all sunscreens work immediately'], answer: 1, explanation: 'Chemical filters need time to absorb into skin to form a protective film. Mineral filters work as soon as they are applied.' },
        { q: 'Why might mineral sunscreen be less ideal for darker skin tones?', options: ['It is less effective at higher melanin levels', 'It can leave a white or grey cast', 'It causes more breakouts in darker skin', 'It does not cover UVA'], answer: 1, explanation: 'Mineral particles (especially non-nano zinc) can appear white or chalky against all skin tones, with the contrast more visible on deeper complexions.' },
      ]},
    ],
  },

  {
    slug: 'spf-numbers-explained',
    title: 'SPF Numbers Explained: 30 vs 50 vs 100',
    summary: 'What SPF numbers actually measure, why the difference between SPF 30 and 100 is smaller than you think, and how real-world use changes everything.',
    level: 'beginner', topic: 'Sun protection',
    pathId: 'sun-protection', pathOrder: 3, xpReward: 40,
    readingMinutes: 3, published: '2026-03-08',
    related: ['spf-the-one-non-negotiable', 'sunscreen-reapplication-guide'],
    prerequisiteSlug: 'chemical-vs-mineral-sunscreen',
    body: [
      { type: 'paragraph', text: 'SPF — Sun Protection Factor — measures how much UVB reaches the skin relative to unprotected skin. The numbers are real, but their real-world implications are not quite what most people assume.' },
      { type: 'heading', text: 'The numbers decoded', id: 'numbers' },
      { type: 'list', items: [
        'SPF 15 — blocks ~93% of UVB.',
        'SPF 30 — blocks ~97% of UVB. (The remaining 3% gets through.)',
        'SPF 50 — blocks ~98% of UVB.',
        'SPF 100 — blocks ~99% of UVB.',
      ]},
      { type: 'callout', variant: 'note', text: 'The jumps get smaller and smaller as SPF rises. Going from SPF 30 to SPF 50 is meaningful. Going from SPF 50 to SPF 100 makes very little practical difference — you are blocking 98% vs 99%.' },
      { type: 'heading', text: 'Why application matters more than SPF number', id: 'application' },
      { type: 'paragraph', text: 'SPF is measured in labs using 2 mg/cm² — about a quarter teaspoon for the face. Most people apply 25–50% of that amount. An SPF 50 applied at half the required dose functions like SPF 7–8 in practice. The number on the bottle is the ceiling, not the floor.' },
      { type: 'myth-fact', myth: 'SPF 100 means you do not need to reapply.', fact: 'SPF measures protection strength, not duration. All sunscreens degrade with UV exposure, sweat, and rubbing. SPF 100 still requires reapplication during sun exposure.' },
      { type: 'quiz', questions: [
        { q: 'Approximately what percentage of UVB does SPF 50 block?', options: ['50%', '85%', '98%', '100%'], answer: 2, explanation: 'SPF 50 blocks approximately 98% of UVB. The remaining 2% passes through — which is why application quantity matters.' },
        { q: 'What is the main reason SPF in real-world conditions is lower than the label?', options: ['Sunscreen companies lie about the number', 'People apply much less product than lab conditions require', 'SPF degrades in the bottle', 'UVA is not measured by SPF'], answer: 1, explanation: 'Lab-tested SPF assumes 2 mg/cm². Most people apply far less, dramatically reducing the actual protection they receive.' },
      ]},
    ],
  },

  {
    slug: 'sunscreen-reapplication-guide',
    title: 'Sunscreen Reapplication: When, How, and Why',
    summary: 'The most skipped step in sun protection — exactly when to reapply, how to do it over makeup, and practical strategies for real life.',
    level: 'intermediate', topic: 'Sun protection',
    pathId: 'sun-protection', pathOrder: 4, xpReward: 35,
    readingMinutes: 3, published: '2026-03-18',
    related: ['spf-numbers-explained', 'chemical-vs-mineral-sunscreen'],
    prerequisiteSlug: 'spf-numbers-explained',
    body: [
      { type: 'paragraph', text: 'Sunscreen degrades. UV exposure, sweat, rubbing, and time all break down the protective film. Every two hours of direct sun exposure is the standard reapplication guideline — but most people do not reapply at all.' },
      { type: 'heading', text: 'When reapplication actually matters', id: 'when' },
      { type: 'paragraph', text: 'For an ordinary indoor day, a solid morning application is largely sufficient — you are not getting two hours of intense UV indoors. Reapplication is critical when you are outside for extended periods, near water or snow (which reflect UV), or sweating heavily.' },
      { type: 'callout', variant: 'tip', title: 'SPF powder for over-makeup', text: 'SPF-containing powder or spray sunscreens make reapplication over makeup practical. They are not as reliable as a full application, but are far better than nothing.' },
      { type: 'list', items: [
        'Outdoors for 2+ hours — reapply every two hours, more often if sweating or swimming.',
        'After swimming or towel-drying — reapply immediately regardless of elapsed time.',
        'Over makeup — use SPF powder, spray, or a cushion applicator. Pat, do not rub.',
        'Indoor day near windows — a morning application is generally enough; UVA through glass is lower intensity.',
      ]},
      { type: 'myth-fact', myth: 'SPF in foundation means you do not need to reapply sunscreen.', fact: 'SPF in makeup is applied in tiny quantities — far too little to reach the tested protection level. It adds a small boost but should not replace dedicated sunscreen or reapplication.' },
      { type: 'quiz', questions: [
        { q: 'How often should you reapply sunscreen during outdoor activity?', options: ['Once a day is enough', 'Every 30 minutes', 'Every two hours, or after swimming/sweating', 'Only if you feel burning'], answer: 2, explanation: 'The standard guideline is reapplication every two hours during meaningful sun exposure, and immediately after swimming or heavy sweating.' },
      ]},
    ],
  },

  {
    slug: 'uv-index-explained',
    title: 'The UV Index: How to Actually Use It',
    summary: 'What the UV index measures, why it changes throughout the day, and how to adjust your sun protection strategy accordingly.',
    level: 'beginner', topic: 'Sun protection',
    pathId: 'sun-protection', pathOrder: 5, xpReward: 30,
    readingMinutes: 4, published: '2026-04-01',
    related: ['spf-the-one-non-negotiable', 'sunscreen-reapplication-guide'],
    prerequisiteSlug: 'sunscreen-reapplication-guide',
    body: [
      { type: 'paragraph', text: 'The UV Index (UVI) is an international standard that measures the intensity of UV radiation reaching the Earth\'s surface on a given day. It was developed to give people a simple, actionable number — but most people do not know what each level actually means for their skin or when they need to take action.' },
      { type: 'list', items: [
        'UV Index 0–2 (Low): minimal risk for most people. SPF still recommended for long outdoor time.',
        'UV Index 3–5 (Moderate): unprotected skin begins to burn in 30–45 minutes for fair skin. SPF 30+ recommended.',
        'UV Index 6–7 (High): burn time drops to 15–25 minutes. Seek shade during midday hours.',
        'UV Index 8–10 (Very High): burn in under 15 minutes. SPF 50+, protective clothing, and shade are important.',
        'UV Index 11+ (Extreme): common in summer at high altitudes and near the equator. Take all precautions — burn in minutes.',
        'UV peaks between 10am–2pm regardless of season. It is also highest at altitude (increases ~10% per 1,000m) and near reflective surfaces — snow reflects up to 80% of UV, sand ~15–25%, water ~10%.',
      ]},
      { type: 'callout', variant: 'tip', text: 'Clouds do not block UV significantly — up to 80% of UV passes through light cloud cover. Cool or overcast days can still cause sunburn, especially at altitude.' },
      { type: 'pip-links', items: [
        { title: 'UV Index — WHO and WMO Guide', url: 'https://www.who.int/news-room/questions-and-answers/item/radiation-the-ultraviolet-(uv)-index', source: 'WHO' },
        { title: 'UV Radiation and Your Skin', url: 'https://www.aad.org/public/everyday-care/sun-protection/uv-index', source: 'AAD' },
        { title: 'Ultraviolet Radiation', url: 'https://dermnetnz.org/topics/ultraviolet-radiation', source: 'DermNet NZ' },
      ]},
    ],
  },

  {
    slug: 'sunscreen-for-dark-skin',
    title: 'Sunscreen for Darker Skin Tones',
    summary: 'Why people with darker skin still need sunscreen, how to avoid white cast, and formulas that actually work across a range of complexions.',
    level: 'beginner', topic: 'Sun protection',
    pathId: 'sun-protection', pathOrder: 6, xpReward: 35,
    readingMinutes: 5, published: '2026-04-08',
    related: ['chemical-vs-mineral-sunscreen', 'skincare-for-black-brown-skin'],
    prerequisiteSlug: 'uv-index-explained',
    body: [
      { type: 'paragraph', text: 'A persistent myth is that darker skin tones do not need sunscreen. Melanin does provide some UV protection — equivalent to roughly SPF 2–4 — but this is far below the threshold for meaningful defence against cumulative UV damage. Skin cancer rates are lower in darker skin tones, but mortality rates are higher, largely because cancers are diagnosed at a later, harder-to-treat stage.' },
      { type: 'list', items: [
        'Post-inflammatory hyperpigmentation (PIH): in melanin-rich skin, any inflammation — including sunburn — is more likely to leave a lasting dark mark. Daily SPF reduces this risk significantly.',
        'Sunscreens with chemical filters (avobenzone, Tinosorb, etc.) are generally invisible on darker skin tones.',
        'Mineral sunscreens (zinc oxide, titanium dioxide) leave a white cast at high concentrations — tinted versions use iron oxides to counteract this and also provide meaningful protection against visible light, which can worsen melasma.',
        'Skin cancer in darker skin tones is often found on non-sun-exposed areas (palms, soles, under nails) — different from typical UV-driven cancers. Regular self-checks and derm visits matter.',
      ]},
      { type: 'callout', variant: 'warning', text: 'The assumption that darker skin does not need sun protection has contributed to real harm — later diagnoses, higher mortality, and undertreated PIH. If you have melanin-rich skin, daily SPF is as important for you as for anyone else.' },
      { type: 'pip-links', items: [
        { title: 'Skin Cancer in People of Color', url: 'https://www.aad.org/public/diseases/skin-cancer/types/common/melanoma/skin-color', source: 'AAD' },
        { title: 'Photoprotection in Skin of Colour', url: 'https://dermnetnz.org/topics/photoprotection-in-skin-of-colour', source: 'DermNet NZ' },
        { title: 'Skin Cancer Foundation: Skin of Color', url: 'https://www.skincancer.org/skin-cancer-information/skin-cancer-skin-of-color/', source: 'Skin Cancer Foundation' },
      ]},
    ],
  },

  {
    slug: 'vitamin-d-and-sunscreen',
    title: 'Sunscreen and Vitamin D: Setting the Record Straight',
    summary: 'Does sunscreen block the UV rays needed for vitamin D synthesis? What the research actually shows about sunscreen use and vitamin D levels.',
    level: 'intermediate', topic: 'Sun protection',
    pathId: 'sun-protection', pathOrder: 7, xpReward: 35,
    readingMinutes: 5, published: '2026-04-15',
    related: ['spf-the-one-non-negotiable', 'spf-numbers-explained'],
    prerequisiteSlug: 'sunscreen-for-dark-skin',
    body: [
      { type: 'paragraph', text: 'Concern that sunscreen causes vitamin D deficiency is one of the most common reasons people give for avoiding SPF. The evidence does not support this. Multiple studies of daily sunscreen users — even in countries with limited sun — have not found that regular sunscreen use causes vitamin D deficiency in real-world conditions. The reason: even with SPF applied, brief incidental sun exposure (hands, neck, face while commuting) is enough for most people to maintain adequate vitamin D.' },
      { type: 'list', items: [
        'Vitamin D deficiency in modern populations is common — but the cause is almost entirely indoor lifestyles, not sunscreen use.',
        'Studies show that people who apply sunscreen as directed in daily life do not show lower vitamin D levels than non-users.',
        'Supplementation (1,000–2,000 IU/day for most adults) is safer, more reliable, and more controllable than deliberately seeking UV exposure.',
        'The trade-off is asymmetric: the risk of skin cancer from UV exposure is documented and dose-dependent; the risk from sunscreen-caused vitamin D deficiency is essentially theoretical in real-world usage.',
        'If you are concerned about vitamin D, get a blood test and supplement if low. Do not skip sunscreen.',
      ]},
      { type: 'pip-links', items: [
        { title: 'Sunscreen and Vitamin D', url: 'https://www.aad.org/public/everyday-care/sun-protection/sunscreen-patients/sunscreen-vitamin-d', source: 'AAD' },
        { title: 'Vitamin D — NHS Overview', url: 'https://www.nhs.uk/conditions/vitamins-and-minerals/vitamin-d/', source: 'NHS' },
        { title: 'Sunscreen and Vitamin D Research', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=sunscreen+vitamin+d+deficiency+randomized', source: 'PubMed' },
      ]},
    ],
  },

  {
    slug: 'outdoor-sports-sun-protection',
    title: 'Sun Protection for Outdoor Sports',
    summary: 'Higher UV, extended exposure, sweat, and water demand a specific sun strategy. What athletes and outdoor enthusiasts need to do differently.',
    level: 'intermediate', topic: 'Sun protection',
    pathId: 'sun-protection', pathOrder: 8, xpReward: 40,
    readingMinutes: 5, published: '2026-04-22',
    related: ['sunscreen-reapplication-guide', 'skincare-for-athletes'],
    prerequisiteSlug: 'vitamin-d-and-sunscreen',
    body: [
      { type: 'paragraph', text: 'Outdoor athletes face higher UV exposure than almost any other group — longer durations outside, often at altitude or near reflective surfaces, while sweating heavily. Standard SPF guidance does not fully translate: you need water-resistant formulas, a reapplication plan, and physical barriers for areas sunscreen alone cannot protect.' },
      { type: 'list', items: [
        'Water-resistant SPF holds up for 40 or 80 minutes of water or sweat exposure (stated on the label) — after that, it must be reapplied.',
        'Reapply every 2 hours minimum, sooner if sweating heavily or towelling off.',
        'UPF clothing: UPF 50 blocks 98% of UV. Far more reliable than sunscreen for covered areas and requires no reapplication.',
        'Altitude: UV increases approximately 10% per 1,000m of elevation. At 3,000m you are absorbing roughly 30% more UV than at sea level.',
        'Reflective surfaces: snow reflects up to 80% of UV, water ~10%, sand ~15–25% — UV hits you from below as well as above.',
        'Do not forget lips (use SPF lip balm) and the scalp (hat or SPF powder/spray for parting lines).',
      ]},
      { type: 'pip-links', items: [
        { title: 'Sun Protection for Outdoor Enthusiasts', url: 'https://www.skincancer.org/skin-cancer-prevention/sun-protection/outdoor-sports/', source: 'Skin Cancer Foundation' },
        { title: 'Sunscreen: How to Apply', url: 'https://www.aad.org/public/everyday-care/sun-protection/sunscreen-patients/how-to-apply-sunscreen', source: 'AAD' },
        { title: 'UPF Clothing and Sun Protection', url: 'https://www.skincancer.org/skin-cancer-prevention/sun-protection/sun-protective-clothing/', source: 'Skin Cancer Foundation' },
      ]},
    ],
  },

  // ══════════════════════════════════════════
  // PATH: SKIN & MENTAL HEALTH
  // ══════════════════════════════════════════

  {
    slug: 'stress-and-your-skin',
    title: 'Stress, Mental Health, and Your Skin',
    summary: 'The brain–skin axis is real. How stress triggers flare-ups, why skin conditions affect mood and confidence, and gentle ways to break the loop.',
    level: 'intermediate', topic: 'Mental health',
    pathId: 'skin-mental-health', pathOrder: 1, xpReward: 45,
    readingMinutes: 4, published: '2026-04-08',
    related: ['understanding-acne', 'stress-cortisol-skin'],
    externalSources: [
      { title: 'The Mind-Skin Connection', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=psychodermatology+stress+skin+mind+skin+axis', source: 'PubMed' },
    ],
    body: [
      { type: 'paragraph', text: 'The connection between mind and skin is not in your head — or rather, it is, but it is also chemistry. Researchers call it the brain–skin axis, and it runs both ways: stress can worsen skin, and skin struggles can weigh heavily on mental health.' },
      { type: 'heading', text: 'How stress reaches your skin', id: 'how' },
      { type: 'paragraph', text: 'Under sustained stress, the body raises {{cortisol|cortisol}} and other signals that increase oil production and inflammation. That can aggravate acne, eczema, and psoriasis, and slow the skin barrier\'s ability to repair itself.' },
      { type: 'callout', variant: 'note', text: 'This is a genuine physiological pathway, not a personal failing. Naming the mechanism can itself reduce the shame that often surrounds flare-ups.' },
      { type: 'heading', text: 'When skin affects the mind', id: 'mind' },
      { type: 'paragraph', text: 'Visible skin conditions are strongly linked with anxiety, low mood, and social withdrawal. If checking, covering, or avoiding mirrors is taking over your day, that is worth taking seriously and gently.' },
      { type: 'callout', variant: 'tip', title: 'Be as kind to yourself as you would to a friend', text: 'Most people scrutinise their own skin far more harshly than anyone else does. Confidence rarely waits for "perfect" skin.' },
      { type: 'callout', variant: 'warning', title: 'Reach out when it is heavy', text: 'If skin concerns are driving persistent anxiety, low mood, or thoughts of self-harm, please talk to a GP or mental-health professional. You deserve both skin care and mental health care.' },
      { type: 'heading', text: 'Breaking the loop', id: 'loop' },
      { type: 'list', items: [
        'Keep a simple, consistent routine — predictability lowers the urge to over-treat when anxious.',
        'Protect sleep; poor sleep raises stress hormones and slows barrier repair.',
        'Build in genuine stress relief (movement, time outdoors, connection) rather than only "fixing" the skin.',
      ]},
      { type: 'quiz', questions: [
        { q: 'Which hormone links stress to skin flare-ups?', options: ['Insulin', 'Cortisol', 'Melatonin', 'Collagen'], answer: 1, explanation: 'Sustained stress raises cortisol, which can increase oil and inflammation and slow barrier repair.' },
        { q: 'What is a healthy way to break the stress–skin loop?', options: ['Over-treat the skin when anxious', 'Scroll skincare videos at night', 'Keep a simple routine and protect sleep', 'Avoid all mirrors permanently'], answer: 2, explanation: 'A steady routine plus good sleep and real stress relief addresses both ends of the brain–skin axis.' },
      ]},
    ],
  },

  {
    slug: 'stress-cortisol-skin',
    title: 'Cortisol and Skin: The Science Behind Stress Breakouts',
    summary: 'A deeper look at cortisol\'s mechanisms — how it raises oil, disrupts the barrier, and prolongs healing — and what evidence-backed stress management actually does to skin.',
    level: 'intermediate', topic: 'Mental health',
    pathId: 'skin-mental-health', pathOrder: 2, xpReward: 45,
    readingMinutes: 4, published: '2026-04-20',
    related: ['stress-and-your-skin', 'understanding-acne'],
    prerequisiteSlug: 'stress-and-your-skin',
    body: [
      { type: 'paragraph', text: 'Cortisol is the primary stress hormone, released from the adrenal glands in response to perceived threat. It was designed for short-term survival — not for the chronic, low-grade stress that many people live with daily. In the skin, chronic cortisol elevation is genuinely disruptive.' },
      { type: 'heading', text: 'What cortisol does to skin', id: 'mechanisms' },
      { type: 'list', items: [
        'Increases sebum production by stimulating sebaceous glands, fuelling acne.',
        'Degrades collagen — cortisol activates enzymes (matrix metalloproteinases) that break down structural proteins.',
        'Weakens the skin barrier by reducing ceramide production and increasing TEWL.',
        'Slows wound healing and extends the time that blemishes, cuts, and flares take to resolve.',
        'Triggers mast cells to release histamine, which can worsen redness and itch in sensitive conditions.',
      ]},
      { type: 'callout', variant: 'note', text: 'The skin has its own local stress-response system (cutaneous CRH/ACTH pathway) — meaning stress hormones are made in the skin itself, independently of the adrenal glands. Skin literally "feels" stress.' },
      { type: 'heading', text: 'What actually helps', id: 'evidence' },
      { type: 'paragraph', text: 'RCT evidence for mind–skin interventions is growing. Mindfulness-based stress reduction has been shown in controlled trials to accelerate psoriasis clearing (alongside phototherapy) and reduce eczema severity. Sleep is the most underestimated intervention: cortisol peaks in poor sleep, and skin barrier recovery happens predominantly at night.' },
      { type: 'callout', variant: 'tip', text: 'Even imperfect sleep hygiene improvements — consistent bedtime, no screens after a set hour, a cool room — measurably improve skin over weeks. It is one of the few free, zero-side-effect skin interventions with real evidence.' },
      { type: 'quiz', questions: [
        { q: 'How does cortisol contribute to acne?', options: ['It directly kills skin cells', 'It stimulates sebaceous glands to produce more oil', 'It blocks pores physically', 'It reduces skin temperature'], answer: 1, explanation: 'Cortisol stimulates sebum production from sebaceous glands, and excess oil is one of the four core drivers of acne.' },
        { q: 'Which evidence-backed intervention has been shown in RCTs to improve psoriasis?', options: ['Essential oils', 'Mindfulness-based stress reduction alongside standard treatment', 'Avoiding all dairy', 'More frequent cleansing'], answer: 1, explanation: 'Mindfulness-based stress reduction has been studied in RCTs and shown to accelerate psoriasis clearing when combined with phototherapy.' },
      ]},
    ],
  },

  {
    slug: 'dermatillomania-compassionate-guide',
    title: 'Skin Picking: A Compassionate Guide to Dermatillomania',
    summary: 'Excoriation disorder (skin picking) is more common than people think — and more treatable. What it is, why it happens, and evidence-based paths to recovery.',
    level: 'intermediate', topic: 'Mental health',
    pathId: 'skin-mental-health', pathOrder: 3, xpReward: 45,
    readingMinutes: 4, published: '2026-04-28',
    related: ['stress-and-your-skin', 'skin-confidence-guide'],
    externalSources: [
      { title: 'Excoriation (Skin Picking) Disorder', url: 'https://dermnetnz.org/topics/excoriation-disorder', source: 'DermNet NZ' },
      { title: 'TLC Foundation for BFRBs', url: 'https://www.bfrb.org/', source: 'TLC Foundation' },
    ],
    prerequisiteSlug: 'stress-cortisol-skin',
    body: [
      { type: 'paragraph', text: 'Excoriation disorder — also called dermatillomania or skin-picking disorder — is a body-focused repetitive behaviour characterised by recurrent picking of skin, causing tissue damage, distress, and significant time spent on the behaviour. It affects an estimated 1.4–5.4% of adults and is more common than most people realise.' },
      { type: 'callout', variant: 'tip', title: 'You are not alone, and this is not a character flaw', text: 'Skin picking is classified as an OCD-related disorder, not a hygiene problem or lack of willpower. Approaching it with self-compassion rather than shame is part of effective treatment.' },
      { type: 'heading', text: 'Why it happens', id: 'why' },
      { type: 'paragraph', text: 'Skin picking typically starts with a perceived imperfection — a bump, scab, or pore — and involves a cycle of tension, picking, and temporary relief followed by shame or distress. It can function as a regulation behaviour, providing sensory stimulation or stress relief. Triggers include stress, boredom, anxiety, and sensory cues.' },
      { type: 'heading', text: 'What actually helps', id: 'help' },
      { type: 'list', items: [
        'Habit Reversal Training (HRT) — structured behavioural therapy that identifies triggers and replaces picking with a competing response. Strong evidence base.',
        'Cognitive Behavioural Therapy (CBT) — addresses the thoughts and emotions that drive the behaviour.',
        'Acceptance and Commitment Therapy (ACT) — builds tolerance of urges without acting on them.',
        'N-acetylcysteine (NAC) — a supplement with several positive trials in BFRBs; worth discussing with a doctor.',
        'The TLC Foundation for BFRBs — the best English-language resource for finding therapists and peer support.',
      ]},
      { type: 'callout', variant: 'warning', title: 'Skincare products are not the primary solution', text: 'Treating the wounds from picking is kind and helpful. But topical products do not address the behaviour pattern. Professional support — a therapist with BFRB experience — makes the biggest difference.' },
      { type: 'callout', variant: 'note', text: 'Some people find fidget tools, textured rings, or gloves as physical barriers to picking. These can help in the short term, especially while working with a therapist on longer-term strategies.' },
      { type: 'quiz', questions: [
        { q: 'What category of disorder is dermatillomania (skin picking) classified under?', options: ['Personality disorder', 'OCD-related / body-focused repetitive behaviour', 'Addiction disorder', 'Psychotic disorder'], answer: 1, explanation: 'Dermatillomania is classified as an OCD-spectrum body-focused repetitive behaviour (BFRB), related to trichotillomania (hair pulling).' },
        { q: 'Which therapy has the strongest evidence base for skin picking disorder?', options: ['Psychoanalysis', 'Habit Reversal Training (HRT)', 'Hypnotherapy', 'Vitamin supplements alone'], answer: 1, explanation: 'Habit Reversal Training is the most evidence-supported behavioural therapy for BFRBs including skin picking.' },
      ]},
    ],
  },

  {
    slug: 'skin-confidence-guide',
    title: 'Building Confidence with Visible Skin Conditions',
    summary: 'A practical, evidence-informed guide to developing a healthier relationship with your skin — not waiting for it to clear before you live your life.',
    level: 'beginner', topic: 'Mental health',
    pathId: 'skin-mental-health', pathOrder: 4, xpReward: 40,
    readingMinutes: 4, published: '2026-05-05',
    related: ['stress-and-your-skin', 'dermatillomania-compassionate-guide'],
    prerequisiteSlug: 'dermatillomania-compassionate-guide',
    body: [
      { type: 'paragraph', text: 'A common pattern in skin conditions: the skin improves only once the person stops putting their life on hold waiting for it to clear. Confidence and skin health are more intertwined than most people realise — and confidence rarely comes from clear skin; it usually comes from choosing to live fully despite imperfect skin.' },
      { type: 'heading', text: 'The waiting trap', id: 'trap' },
      { type: 'paragraph', text: 'Avoiding social situations, deferring photos, declining invitations, cancelling plans — these avoidance behaviours feel like short-term relief but reinforce the idea that skin must be clear before life can continue. That idea is worth examining and gently challenging.' },
      { type: 'callout', variant: 'tip', title: 'Treat your skin well, then get on with it', text: 'The goal is not indifference to your skin — it is proportionate care. Do your routine, protect and nourish your skin, and then disengage from monitoring. Your skin does not define your value or your day.' },
      { type: 'heading', text: 'What actually helps long-term', id: 'helps' },
      { type: 'list', items: [
        'Reduce mirror-checking time gradually — set a reasonable limit and stick to it.',
        'Seek community — online forums and in-person groups of people with skin conditions reduce isolation significantly.',
        'Reframe the narrative — your skin is part of you, not all of you. Speaking about it differently to yourself matters.',
        'Professional support — a psychologist familiar with chronic conditions or appearance concerns can be transformative.',
        'Distinguish skin care from skin obsession — a routine should take minutes and make you feel good, not consume hours.',
      ]},
      { type: 'callout', variant: 'warning', text: 'If you notice your thoughts about your skin are consuming several hours a day, causing significant avoidance, or not matching what others see, it is worth speaking to a mental health professional. This level of distress is not inevitable and is very treatable.' },
      { type: 'quiz', questions: [
        { q: 'What is the main problem with "waiting for clear skin" before re-engaging with life?', options: ['Clear skin never comes', 'Avoidance reinforces the belief that current skin makes normal life impossible', 'It makes skin worse chemically', 'It increases cortisol permanently'], answer: 1, explanation: 'Avoidance behaviours feel relieving in the moment but entrench the belief that your skin must be clear before life can proceed — making confidence harder to build.' },
      ]},
    ],
  },

  {
    slug: 'teen-skincare-guide',
    title: 'Skincare for Teens: A Practical Starting Point',
    summary: 'Hormonal changes, first breakouts, peer pressure around products — a clear guide for teenagers (and their parents) on what actually matters.',
    level: 'beginner', topic: 'Mental health',
    pathId: 'skin-mental-health', pathOrder: 5, xpReward: 35,
    readingMinutes: 5, published: '2026-05-12',
    related: ['build-your-first-routine', 'understanding-acne'],
    prerequisiteSlug: 'skin-confidence-guide',
    body: [
      { type: 'paragraph', text: 'Teenage skin is driven largely by hormones. Androgens surge during puberty, increasing sebum production — which is why acne is so common in teens regardless of how clean their skin is. The answer is not an aggressive 10-step routine; it is a short, consistent, evidence-based approach that treats what is actually happening without damaging the skin barrier.' },
      { type: 'list', items: [
        'The core routine for most teens: gentle low-pH cleanser morning and night, lightweight non-comedogenic moisturiser, SPF 30+ every morning.',
        'For acne: add benzoyl peroxide (2.5–5%) or salicylic acid (0.5–2%) as a targeted treatment — these are the most evidence-backed OTC options.',
        'Avoid: harsh scrubs, high-alcohol toners, very high-strength acids, and retinoids without professional guidance at this age.',
        'Toners, essences, ampoules, and most serums are unnecessary at this stage — simplicity works better and costs less.',
        'Skin picking worsens scarring and PIH significantly. If picking is difficult to control, it is worth talking to a doctor — this can be a form of body-focused repetitive behaviour.',
        'Seeing a dermatologist for moderate-to-severe acne is important early — untreated cystic acne causes permanent scarring that is far harder to address later.',
      ]},
      { type: 'pip-links', items: [
        { title: 'Acne in Teens: AAD Guide', url: 'https://www.aad.org/public/diseases/acne/diy/teen-acne', source: 'AAD' },
        { title: 'Acne — NHS', url: 'https://www.nhs.uk/conditions/acne/', source: 'NHS' },
        { title: 'Acne in Adolescents', url: 'https://dermnetnz.org/topics/acne', source: 'DermNet NZ' },
      ]},
    ],
  },

  {
    slug: 'mindful-skincare-rituals',
    title: 'Skincare as a Mindfulness Practice',
    summary: 'How to turn a two-minute routine into a genuine moment of self-care — without turning it into an obsessive ritual.',
    level: 'beginner', topic: 'Mental health',
    pathId: 'skin-mental-health', pathOrder: 6, xpReward: 30,
    readingMinutes: 4, published: '2026-05-20',
    related: ['stress-and-your-skin', 'build-your-first-routine'],
    prerequisiteSlug: 'teen-skincare-guide',
    body: [
      { type: 'paragraph', text: 'A skincare routine has a quality that most health behaviours lack: it is sensory, predictable, and done in front of a mirror. This makes it unusually well-suited to function as a mindfulness anchor — a moment of structured, non-digital attention where you are fully present with a physical sensation. Research on habit formation and behavioural psychology supports this: routines reduce decision fatigue and provide emotional scaffolding, especially during high-stress periods.' },
      { type: 'list', items: [
        'The warm water, texture of products, and gentle touch involved in cleansing activate the parasympathetic nervous system — a mild but real calming effect.',
        'Consistency matters more than complexity: a 2-step routine done every day has more value for both skin and mental health than a 10-step routine done occasionally.',
        'The mirror dynamic: be aware of the difference between brief, caring self-observation and anxious skin-checking (magnifying mirrors, long scrutiny sessions). The latter can worsen body-image distress.',
        'If your skincare routine feels compulsive — if skipping it causes significant anxiety, or you are spending excessive time examining your skin — it may be worth exploring this with a therapist. This can overlap with OCD or skin-picking behaviours.',
      ]},
      { type: 'callout', variant: 'tip', text: 'Try doing your routine without your phone nearby and without a magnifying mirror. Focus on the sensation — temperature, texture, smell — rather than inspecting outcomes. This is the mindfulness dimension.' },
      { type: 'pip-links', items: [
        { title: 'Skin and Mental Health', url: 'https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/body-image-and-mental-health', source: 'Mental Health Foundation' },
        { title: 'Mind-Skin Connection', url: 'https://dermnetnz.org/topics/psychodermatology', source: 'DermNet NZ' },
        { title: 'Mindfulness and Stress', url: 'https://www.nhs.uk/mental-health/self-help/tips-and-support/mindfulness/', source: 'NHS' },
      ]},
    ],
  },

  // ══════════════════════════════════════════
  // PATH: ATHLETE SKINCARE
  // ══════════════════════════════════════════

  {
    slug: 'skincare-for-athletes',
    title: 'Skincare for Athletes',
    summary: 'Sweat, friction, sun, and shared equipment all challenge skin. How to manage breakouts, protect the barrier, and build a post-workout routine.',
    level: 'intermediate', topic: 'Athlete skincare',
    pathId: 'athlete-skincare', pathOrder: 1, xpReward: 50,
    readingMinutes: 4, published: '2026-03-05',
    related: ['understanding-acne', 'spf-the-one-non-negotiable'],
    body: [
      { type: 'paragraph', text: 'Training is good for your skin overall — better circulation, lower baseline stress — but the conditions around it (trapped sweat, friction, sun, shared gear) create specific challenges worth managing deliberately.' },
      { type: 'heading', text: 'Sweat and breakouts', id: 'sweat' },
      { type: 'paragraph', text: 'Sweat itself does not clog pores, but when it mixes with oil, bacteria, and friction from hats, straps, or padding, it can trigger breakouts — sometimes called "acne mechanica." The fix is to reduce how long that mixture sits on the skin.' },
      { type: 'list', items: [
        'Cleanse within an hour of finishing, or at least rinse with water if a full wash is not possible.',
        'Use clean, breathable fabrics and wipe down shared equipment before contact.',
        'Avoid heavy, occlusive products right before training — they trap sweat under friction points.',
      ]},
      { type: 'callout', variant: 'tip', title: 'Keep a minimal gym kit', text: 'A travel cleanser, a light moisturiser, and a stick sunscreen for outdoor sessions cover the essentials without bulk.' },
      { type: 'heading', text: 'Barrier protection', id: 'barrier' },
      { type: 'paragraph', text: 'Repeated washing, chlorinated pools, wind, and cold all raise {{transepidermal-water-loss|water loss}}. A simple moisturiser after cleansing is the main defence; for swimmers, rinse and moisturise straight after the pool.' },
      { type: 'callout', variant: 'warning', title: 'Outdoor athletes need sun strategy, not just sunscreen', text: 'Long sessions outdoors exceed any single application. Combine a water-resistant {{spf|SPF}}, reapplication where practical, and physical cover for genuine protection.' },
      { type: 'faq', items: [
        { q: 'Should I wash my face before or after working out?', a: 'After is the priority, to clear the sweat-oil mixture. If you wear makeup, removing it before training helps too.' },
        { q: 'Does chlorine damage skin?', a: 'It can be drying and irritating with repeated exposure. Rinsing promptly and moisturising afterward limits the effect.' },
      ]},
      { type: 'quiz', questions: [
        { q: 'What mainly triggers "acne mechanica" in athletes?', options: ['Sweat plus friction and trapped oil', 'Drinking water', 'Stretching', 'Cold weather alone'], answer: 0, explanation: 'Acne mechanica comes from sweat mixing with oil and bacteria under friction from gear — not from sweat by itself.' },
        { q: 'What is the best first move after a sweaty session?', options: ['Apply a heavy occlusive cream', 'Cleanse or at least rinse promptly', 'Exfoliate aggressively', 'Skip moisturiser'], answer: 1, explanation: 'Clearing the sweat-oil mixture quickly is the highest-impact step.' },
      ]},
    ],
  },

  {
    slug: 'chlorine-and-swimming-skin',
    title: 'Swimming and Skin: Managing Chlorine Damage',
    summary: 'What chlorine actually does to skin and hair, how to protect your barrier before and after pool sessions, and what matters most for regular swimmers.',
    level: 'intermediate', topic: 'Athlete skincare',
    pathId: 'athlete-skincare', pathOrder: 2, xpReward: 45,
    readingMinutes: 4, published: '2026-03-15',
    related: ['skincare-for-athletes', 'ceramides-explained'],
    prerequisiteSlug: 'skincare-for-athletes',
    body: [
      { type: 'paragraph', text: 'Chlorine is added to pools as a disinfectant and it works — but at the cost of being mildly disruptive to skin and hair. For occasional swimmers the effect is minor. For people swimming daily or multiple times a week, cumulative barrier disruption is real and worth managing actively.' },
      { type: 'heading', text: 'What chlorine does', id: 'what' },
      { type: 'list', items: [
        'Strips oils — chlorine is a mild oxidiser that breaks down sebum and lipids on the skin surface.',
        'Disrupts the acid mantle — pool water is typically slightly alkaline (pH 7.2–7.8), and the skin\'s acid mantle is pH 4.5–5.5. Repeated alkali exposure disrupts barrier function.',
        'Can cause or worsen eczema — prolonged exposure without post-swim care is a known eczema trigger.',
        'Reacts with organic matter (sweat, urine) to form chloramines — which cause more irritation than chlorine alone.',
      ]},
      { type: 'heading', text: 'The pre-swim barrier', id: 'pre' },
      { type: 'paragraph', text: 'Applying a thin layer of a simple emollient or barrier cream before entering the pool creates a partial physical buffer. This is more protective than showering before (though you should shower to reduce chloramine formation — it is courteous and required by most pools).' },
      { type: 'callout', variant: 'tip', text: 'Petroleum jelly (Vaseline) or a simple thick cream applied to dry, irritated patches before swimming provides a meaningful physical barrier. Apply to problem areas — lips, dry patches, around eyes.' },
      { type: 'heading', text: 'The post-swim routine', id: 'post' },
      { type: 'list', items: [
        'Shower within minutes of leaving the pool — do not let chlorinated water sit on your skin.',
        'Use a gentle, slightly acidic cleanser to help restore the acid mantle (look for pH 5.0–5.5).',
        'Moisturise immediately after showering while skin is still slightly damp, to lock in hydration.',
        'Use a ceramide-containing moisturiser if you swim frequently — this is one of the clearest use cases for ceramide supplementation.',
      ]},
      { type: 'myth-fact', myth: 'You can build up a resistance to chlorine over time.', fact: 'Your skin adapts slightly to frequent pool exposure but does not become immune to chlorine\'s effects. The disruption is chemical, not a matter of tolerance. Good barrier care is always necessary.' },
      { type: 'quiz', questions: [
        { q: 'Why is pool water disruptive to the skin\'s acid mantle?', options: ['It contains salt', 'It is typically more alkaline than skin\'s natural pH', 'It is too cold', 'It contains fluoride'], answer: 1, explanation: 'Pool water sits at pH 7.2–7.8 while healthy skin is pH 4.5–5.5. Repeated alkaline exposure disrupts the barrier.' },
        { q: 'When should you shower after swimming?', options: ['After you have fully dried', 'Within minutes of leaving the pool', 'Only if you smell chlorine', 'The next morning'], answer: 1, explanation: 'Rinsing chlorinated water off promptly minimises cumulative exposure. Do not let it sit.' },
      ]},
    ],
  },

  {
    slug: 'sweat-and-skin-health',
    title: 'Sweat and Skin Health: What You Need to Know',
    summary: 'Sweat is not the enemy — but how you manage it matters. The science of sweat, its effects on the skin microbiome, and when it becomes a problem.',
    level: 'intermediate', topic: 'Athlete skincare',
    pathId: 'athlete-skincare', pathOrder: 3, xpReward: 40,
    readingMinutes: 5, published: '2026-03-25',
    related: ['skincare-for-athletes', 'understanding-acne'],
    prerequisiteSlug: 'chlorine-and-swimming-skin',
    body: [
      { type: 'paragraph', text: 'Sweat is not simply "gross" — it is a sophisticated system. Understanding what it actually is helps athletes manage their skin more effectively, because most sweat-related skin problems are caused by specific mechanisms that respond to specific solutions.' },
      { type: 'list', items: [
        'Eccrine glands: distributed over the whole body, produce a dilute salt solution for thermoregulation. This is the majority of exercise sweat.',
        'Apocrine glands: found in armpits, groin, and areolae — produce a thicker fluid that bacteria break down into body odour. Activated by stress and emotion as well as heat.',
        'Sweat is mildly acidic (pH 4–6), which supports the skin\'s protective acid mantle and helps regulate the skin microbiome. Regular exercise may actually improve skin microbiome diversity.',
        'Miliaria (heat rash): blocked sweat ducts cause red, itchy bumps. Most common in hot, humid conditions or when skin is occluded (tight clothing). Treat by cooling the skin and avoiding occlusion.',
        'Timing of cleansing: cleanse as soon as possible after exercise — sweat left on skin for extended periods, combined with heat, increases pore-clogging and bacterial growth, particularly on the back and chest.',
      ]},
      { type: 'pip-links', items: [
        { title: 'Sweating', url: 'https://dermnetnz.org/topics/sweat-and-skin', source: 'DermNet NZ' },
        { title: 'Miliaria (Heat Rash)', url: 'https://www.aad.org/public/diseases/a-z/heat-rash-overview', source: 'AAD' },
        { title: 'Exercise and Skin Health', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=exercise+skin+microbiome+acne+sweat', source: 'PubMed' },
      ]},
    ],
  },

  {
    slug: 'post-workout-skincare',
    title: 'Post-Workout Skincare: A Practical Routine',
    summary: 'What to do for your skin immediately after training — cleansing, moisturising, and the fastest routine that actually covers what matters.',
    level: 'beginner', topic: 'Athlete skincare',
    pathId: 'athlete-skincare', pathOrder: 4, xpReward: 35,
    readingMinutes: 4, published: '2026-04-02',
    related: ['skincare-for-athletes', 'build-your-first-routine'],
    prerequisiteSlug: 'sweat-and-skin-health',
    body: [
      { type: 'paragraph', text: 'The golden rule for post-workout skin is simple: cleanse promptly, then restore. Sweat, heat, and friction create ideal conditions for breakouts and irritation — but an aggressive response makes things worse. The goal is to remove what has built up without stripping the skin further.' },
      { type: 'list', items: [
        'Cleanse within 30 minutes of finishing exercise where possible. A gentle, low-pH cleanser is enough — do not use strong actives immediately post-workout when skin is already stressed.',
        'For acne-prone skin: a salicylic acid cleanser (1–2%) used post-workout is more effective than a serum here — it rinses off and is gentler than a leave-on treatment on inflamed, post-exercise skin.',
        'Moisturise after — skin is more permeable post-workout, which means actives absorb faster, but also that moisture loss is faster. A lightweight gel moisturiser suits most post-workout skin.',
        'Morning workout: apply SPF after your post-workout cleanse rather than before, since sweat will have removed your morning application.',
        'Evening workout: a gentle cleanse and basic moisturiser are all you need — no need to repeat your full PM routine if you already did it earlier.',
        'For back and chest acne: wear moisture-wicking fabrics and shower promptly. These areas respond well to benzoyl peroxide washes used a few times per week.',
      ]},
      { type: 'pip-links', items: [
        { title: 'Acne and Exercise: AAD Tips', url: 'https://www.aad.org/public/diseases/acne/skin-care/workout', source: 'AAD' },
        { title: 'Acne', url: 'https://dermnetnz.org/topics/acne', source: 'DermNet NZ' },
        { title: 'Body Acne', url: 'https://www.aad.org/public/diseases/acne/skin-care/body-acne', source: 'AAD' },
      ]},
    ],
  },

  {
    slug: 'helmet-friction-skincare',
    title: 'Acne Mechanica: Managing Helmet and Equipment Friction',
    summary: 'Helmets, chin straps, shoulder pads, and sports masks all cause friction-induced breakouts. What causes them and how to prevent them.',
    level: 'intermediate', topic: 'Athlete skincare',
    pathId: 'athlete-skincare', pathOrder: 5, xpReward: 40,
    readingMinutes: 5, published: '2026-04-10',
    related: ['skincare-for-athletes', 'understanding-acne'],
    prerequisiteSlug: 'post-workout-skincare',
    body: [
      { type: 'paragraph', text: 'Acne mechanica is a specific type of acne caused by sustained friction, pressure, and heat against skin — not by excess oil or bacteria alone. It is the reason athletes break out under helmet straps, bra bands, backpack straps, and sports gear despite having clear skin elsewhere. Understanding the mechanism helps you prevent it more effectively than generic acne advice.' },
      { type: 'list', items: [
        'The mechanism: sustained occlusion traps heat and sweat, pressure disrupts the follicle wall, and friction adds mechanical stress — together these trigger comedone formation and inflammation.',
        'Prevention first: wear moisture-wicking fabrics and liners between skin and hard equipment (helmet liners, padded shorts). Wash all equipment-contact clothing after every use.',
        'Clean your equipment: helmet pads and liners can harbour bacteria. Wipe down with an antibacterial cleaner weekly; replace foam liners when they become compressed or difficult to clean.',
        'Apply a thin non-comedogenic barrier balm (look for zinc oxide or dimethicone-based) to friction-prone areas before sports — this reduces mechanical trauma without clogging pores.',
        'Treat existing breakouts: salicylic acid or benzoyl peroxide washes on affected areas a few times per week. Keep the routine simple.',
        'If breakouts persist despite prevention, see a dermatologist — persistent acne mechanica on the back or shoulders can be confused with fungal acne (Malassezia folliculitis), which needs a different treatment.',
      ]},
      { type: 'pip-links', items: [
        { title: 'Acne Mechanica', url: 'https://dermnetnz.org/topics/acne-mechanica', source: 'DermNet NZ' },
        { title: 'Workout Skin Care Tips', url: 'https://www.aad.org/public/diseases/acne/skin-care/workout', source: 'AAD' },
        { title: 'Acne — NHS', url: 'https://www.nhs.uk/conditions/acne/', source: 'NHS' },
      ]},
    ],
  },

  {
    slug: 'outdoor-athlete-skincare',
    title: 'Outdoor Athlete Skincare: Wind, Cold, and Altitude',
    summary: 'Running, cycling, skiing, hiking — outdoor training environments have specific skin stressors. A guide to protecting and repairing in each condition.',
    level: 'intermediate', topic: 'Athlete skincare',
    pathId: 'athlete-skincare', pathOrder: 6, xpReward: 45,
    readingMinutes: 6, published: '2026-04-18',
    related: ['spf-the-one-non-negotiable', 'skincare-for-athletes'],
    prerequisiteSlug: 'helmet-friction-skincare',
    body: [
      { type: 'paragraph', text: 'Outdoor athletes in cold, windy, or high-altitude environments face a combination of skin stressors that indoor training does not prepare you for. Cold and wind strip the skin\'s protective lipid layer faster than warm-weather exercise. Altitude dramatically increases UV exposure. And the temptation to ignore skin in favour of performance focus means problems compound over time.' },
      { type: 'list', items: [
        'Windburn is not technically a burn — it is barrier disruption caused by cold air, low humidity, and wind stripping surface lipids. It looks red and feels raw. Treat with ceramide-rich creams; avoid fragranced products on compromised skin.',
        'Cold weather: use richer, more occlusive moisturisers than you would in summer. Petrolatum-based balms on exposed facial skin are used by elite endurance athletes for good reason.',
        'Altitude and UV: UV intensity increases approximately 10% per 1,000m of elevation. A skier at 3,000m receives ~30% more UV than at sea level. Use SPF 50+ on all exposed skin, including under goggles (which can cause a tan/burn line).',
        'Helmet and goggles: wear a buff or neoprene face mask for wind protection on long cycling or ski descents. Apply barrier balm before, not instead of, SPF.',
        'Lips: lip skin has no melanin and is highly UV-sensitive. Use an SPF 30+ lip balm and reapply frequently. Cracked lips in cold conditions also lose moisture rapidly — add an occlusive balm (Aquaphor, plain Vaseline).',
      ]},
      { type: 'pip-links', items: [
        { title: 'Winter Skin Care', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/dry/winter-skin', source: 'AAD' },
        { title: 'Sunburn and Sun Protection at Altitude', url: 'https://www.skincancer.org/skin-cancer-prevention/sun-protection/outdoor-sports/', source: 'Skin Cancer Foundation' },
        { title: 'Cold Weather and Skin', url: 'https://dermnetnz.org/topics/cold-weather-skin', source: 'DermNet NZ' },
      ]},
    ],
  },

  // ══════════════════════════════════════════
  // PATH: CONDITIONS DEEP DIVES
  // ══════════════════════════════════════════

  {
    slug: 'understanding-acne',
    title: 'Understanding Acne: Causes and What Helps',
    summary: 'The four drivers of acne, which ingredients have real evidence, and the patience the process genuinely requires.',
    level: 'intermediate', topic: 'Conditions',
    pathId: 'conditions-deep-dives', pathOrder: 1, xpReward: 50,
    readingMinutes: 4, published: '2026-02-18',
    related: ['identify-your-skin-type', 'acne-types-explained'],
    externalSources: [
      { title: 'Acne', url: 'https://www.aad.org/public/diseases/acne', source: 'AAD' },
      { title: 'Acne — DermNet', url: 'https://dermnetnz.org/topics/acne', source: 'DermNet NZ' },
    ],
    body: [
      { type: 'paragraph', text: 'Acne is not a hygiene problem and it is rarely about a single cause. It emerges from four overlapping factors, which is why a one-ingredient fix usually disappoints.' },
      { type: 'heading', text: 'The four drivers', id: 'drivers' },
      { type: 'list', ordered: true, items: [
        'Excess oil (sebum), often hormonally driven.',
        'Clogged pores, where dead cells and oil form a plug — this is where {{comedogenic|comedogenic}} ingredients can contribute.',
        'Bacteria (C. acnes) that thrive in clogged, oil-rich pores.',
        'Inflammation, which turns a clog into a red, tender spot.',
      ]},
      { type: 'callout', variant: 'note', text: 'Because the drivers interact, the best routines target more than one at once — for example a {{bha|BHA}} to unclog plus a {{retinoid|retinoid}} to normalise cell turnover.' },
      { type: 'heading', text: 'Ingredients with real evidence', id: 'evidence' },
      { type: 'list', items: [
        'Salicylic acid ({{bha|BHA}}) — oil-soluble, so it works inside pores. Good for blackheads and whiteheads.',
        'Benzoyl peroxide — reduces C. acnes and inflammation; one of the best-evidenced over-the-counter actives.',
        'Topical {{retinoid|retinoids}} — normalise turnover so pores clog less; strong evidence for both acne and aging.',
        '{{niacinamide|Niacinamide}} — helps with oil regulation and redness, and is gentle enough to pair with the above.',
      ]},
      { type: 'callout', variant: 'warning', title: 'Give actives time before judging them', text: 'Retinoids and benzoyl peroxide commonly cause a "purge" and some irritation in the first weeks. Most regimens need 8–12 weeks of consistent use before a fair verdict.' },
      { type: 'faq', items: [
        { q: 'Does diet cause acne?', a: 'For some people, high-glycaemic diets and possibly skim dairy are associated with more breakouts. The effect varies between individuals.' },
        { q: 'When should I see a dermatologist?', a: 'If acne is painful, cystic, scarring, or not improving after a few months of consistent OTC care, a dermatologist can offer prescription options far more effective than what you can buy over the counter.' },
      ]},
      { type: 'quiz', questions: [
        { q: 'Which is NOT one of the four drivers of acne?', options: ['Excess oil', 'Clogged pores', 'Dry climate', 'Inflammation'], answer: 2, explanation: 'The four drivers are excess oil, clogged pores, C. acnes bacteria, and inflammation. Climate is not one of them.' },
        { q: 'Why does salicylic acid suit acne-prone skin?', options: ['It is oil-soluble and works inside pores', 'It bleaches the skin', 'It is a moisturiser', 'It blocks UV'], answer: 0, explanation: 'Salicylic acid is a BHA — oil-soluble, so it penetrates into oily, clogged pores where water-soluble acids cannot.' },
      ]},
    ],
  },

  {
    slug: 'acne-types-explained',
    title: 'Acne Types: Comedonal, Inflammatory, Cystic, Hormonal',
    summary: 'Not all acne is the same — and the type you have determines which treatments actually work. A clear breakdown of each type and the evidence behind treating it.',
    level: 'advanced', topic: 'Conditions',
    pathId: 'conditions-deep-dives', pathOrder: 2, xpReward: 55,
    readingMinutes: 5, published: '2026-03-01',
    related: ['understanding-acne', 'retinoids-mechanism-and-evidence'],
    prerequisiteSlug: 'understanding-acne',
    body: [
      { type: 'paragraph', text: 'Acne is a spectrum, not a single condition. The type of lesion — blackhead, whitehead, papule, pustule, nodule, or cyst — determines which ingredients will actually move the needle. Treating cystic acne the same as comedonal acne is one of the most common mistakes in self-treating.' },
      { type: 'heading', text: 'Non-inflammatory: comedonal acne', id: 'comedonal' },
      { type: 'paragraph', text: 'Blackheads (open comedones) and whiteheads (closed comedones) form when oil and dead skin cells block a pore. There is no bacterial inflammation — yet. Treatments that normalise cell turnover work best here.' },
      { type: 'list', items: [
        'Retinoids — the gold standard for comedonal acne; they prevent the clogging at the root.',
        'Salicylic acid ({{bha|BHA}}) — penetrates and clears existing clogs.',
        'Niacinamide — reduces sebum contributing to future clogs.',
        'Avoid heavy, occlusive, or {{comedogenic|comedogenic}} products.',
      ]},
      { type: 'heading', text: 'Inflammatory: papules and pustules', id: 'inflammatory' },
      { type: 'paragraph', text: 'When a clog ruptures and bacteria trigger the immune system, you get a red papule. If it fills with pus, it becomes a pustule. Inflammation is now part of the picture, and treatment needs to address it.' },
      { type: 'list', items: [
        'Benzoyl peroxide — kills C. acnes bacteria; one of the best OTC options for inflammatory acne.',
        'Topical antibiotics (clindamycin) — prescription-only; often prescribed with benzoyl peroxide to prevent resistance.',
        'Azelaic acid — anti-inflammatory and anti-bacterial at 15–20% (prescription).',
        'Niacinamide — anti-inflammatory support.',
      ]},
      { type: 'heading', text: 'Nodular and cystic acne', id: 'cystic' },
      { type: 'paragraph', text: 'Nodules and cysts form deep in the dermis and are painful, slow to heal, and carry a high risk of scarring. OTC options are rarely sufficient. A dermatologist can offer oral treatments that are far more effective at this severity.' },
      { type: 'callout', variant: 'warning', title: 'See a dermatologist for cystic acne', text: 'Isotretinoin (formerly Accutane) remains the most effective treatment for severe, scarring, or treatment-resistant acne. It requires medical supervision. Do not delay seeking it — every scar left by cysts is permanent.' },
      { type: 'heading', text: 'Hormonal acne', id: 'hormonal' },
      { type: 'paragraph', text: 'Hormonal acne is characterised by deep, painful, often cystic breakouts along the jawline, chin, and lower cheeks — driven by androgen fluctuations. It often worsens premenstrually. OTC treatments address it partially, but hormonal therapies (oral contraceptives, spironolactone) can be transformative for people who qualify.' },
      { type: 'quiz', questions: [
        { q: 'What distinguishes inflammatory acne from comedonal acne?', options: ['The depth of the pore involved', 'The presence of bacterial inflammation and immune response', 'The amount of sebum produced', 'Whether SPF is used'], answer: 1, explanation: 'Comedonal acne is a physical blockage without significant bacterial inflammation. Inflammatory acne involves the immune response — redness, swelling, pus.' },
        { q: 'Which acne type most requires seeing a dermatologist?', options: ['A single blackhead', 'Occasional whiteheads', 'Cystic/nodular acne with scarring risk', 'Post-workout breakouts'], answer: 2, explanation: 'Cystic and nodular acne carry the highest scarring risk and respond poorly to OTC options. Prescription treatments — including isotretinoin — are far more effective.' },
      ]},
    ],
  },

  {
    slug: 'eczema-trigger-and-repair',
    title: 'Eczema: Triggers, Barrier Repair, and Evidence-Based Care',
    summary: 'What eczema actually is at the barrier level, the key triggers to identify, and the skincare and medical options with the strongest evidence.',
    level: 'advanced', topic: 'Conditions',
    pathId: 'conditions-deep-dives', pathOrder: 3, xpReward: 55,
    readingMinutes: 6, published: '2026-03-12',
    related: ['ceramides-explained', 'stress-and-your-skin'],
    externalSources: [
      { title: 'Eczema', url: 'https://www.aad.org/public/diseases/eczema', source: 'AAD' },
      { title: 'Atopic Dermatitis', url: 'https://dermnetnz.org/topics/atopic-dermatitis', source: 'DermNet NZ' },
    ],
    prerequisiteSlug: 'acne-types-explained',
    body: [
      { type: 'paragraph', text: 'Atopic dermatitis (eczema) is a chronic inflammatory skin condition characterised by intense itch, dry and sensitive skin, and periodic flares. It is not contagious, not caused by poor hygiene, and not something to simply push through. Understanding its mechanism makes managing it more tractable.' },
      { type: 'heading', text: 'The barrier defect at the core', id: 'barrier' },
      { type: 'paragraph', text: 'In eczema, a mutation or dysfunction in filaggrin (a protein critical to the skin barrier) reduces the skin\'s ability to retain water and keep irritants out. The result: a leaky barrier that dries out easily, allows environmental triggers to penetrate, and reacts with inflammation. This is structural, not a personal failing.' },
      { type: 'callout', variant: 'note', text: 'This is why moisturising is not just comfort care in eczema — it is disease management. Studies show that applying moisturiser from birth to high-risk infants significantly reduces their likelihood of developing eczema.' },
      { type: 'heading', text: 'Common triggers', id: 'triggers' },
      { type: 'list', items: [
        'Irritants — soaps, detergents, fragrances, wool fabrics, and some topical products.',
        'Allergens — dust mites, pet dander, pollen, and certain foods (especially in children).',
        'Temperature and sweat — heat, sweating, and sudden cold are common flare triggers.',
        'Stress — the cortisol-inflammation pathway directly worsens eczema severity.',
        'Infection — Staphylococcus aureus colonises eczema-affected skin at high rates and drives inflammation.',
      ]},
      { type: 'ingredient-spotlight', name: 'Colloidal Oatmeal', whatItDoes: 'Anti-inflammatory and moisturising ingredient made from finely ground oats. Soothes itch, reduces redness, and forms a protective film on the skin.', goodFor: ['Active eczema flares', 'Sensitive, reactive skin', 'Itch relief without steroids'], avoidIf: ['Oat allergy (uncommon but real)'] },
      { type: 'heading', text: 'Evidence-based skincare for eczema', id: 'skincare' },
      { type: 'list', items: [
        'Ceramide-rich moisturisers — multiple RCTs show ceramide-containing emollients reduce TEWL and flare frequency.',
        'Wet wrap therapy — for severe flares, applying a damp layer under dry clothing locks in moisture and reduces itch dramatically.',
        'Soap substitutes — simple emollients used as wash (not soap) protect the acid mantle during cleansing.',
        'Bleach baths (dilute) — 0.005% bleach solution baths reduce S. aureus colonisation; evidence-supported for moderate-severe eczema.',
      ]},
      { type: 'callout', variant: 'warning', title: 'Topical steroids: use correctly, not fearfully', text: 'Topical corticosteroids are the most evidence-based treatment for eczema flares. Steroid phobia (refusing to use them) leads to prolonged flares and worse outcomes. Use the prescribed strength, in the prescribed area, for the prescribed duration — that is safe.' },
      { type: 'quiz', questions: [
        { q: 'What protein mutation underlies the barrier defect in many eczema cases?', options: ['Collagen IV', 'Filaggrin', 'Keratin 14', 'Elastin'], answer: 1, explanation: 'Filaggrin (FLG) gene mutations are strongly associated with atopic dermatitis. Filaggrin is critical for forming a tight, water-retaining skin barrier.' },
        { q: 'Why is moisturising considered disease management (not just comfort) in eczema?', options: ['It smells good', 'It addresses the underlying barrier defect and reduces flare frequency', 'It makes steroids work better', 'It kills S. aureus bacteria'], answer: 1, explanation: 'The structural barrier defect in eczema is directly addressed by regular moisturising. Clinical studies show it reduces flare frequency and severity.' },
      ]},
    ],
  },

  {
    slug: 'hyperpigmentation-types-guide',
    title: 'Hyperpigmentation: PIH, Melasma, and Sun Damage',
    summary: 'Not all dark spots are the same — and the type you have determines which treatments work. A clear breakdown of post-inflammatory hyperpigmentation, melasma, and sun damage.',
    level: 'advanced', topic: 'Conditions',
    pathId: 'conditions-deep-dives', pathOrder: 4, xpReward: 55,
    readingMinutes: 5, published: '2026-03-20',
    related: ['spf-the-one-non-negotiable', 'vitamin-c-guide'],
    externalSources: [
      { title: 'Hyperpigmentation', url: 'https://dermnetnz.org/topics/skin-discolouration', source: 'DermNet NZ' },
      { title: 'Hyperpigmentation — AAD', url: 'https://www.aad.org/public/everyday-care/skin-care-secrets/anti-aging/fade-dark-spots', source: 'AAD' },
    ],
    prerequisiteSlug: 'eczema-trigger-and-repair',
    body: [
      { type: 'paragraph', text: 'Hyperpigmentation is a catch-all term for areas of skin that appear darker than the surrounding skin due to excess melanin. But the "why" behind each type is different — and so is what actually helps.' },
      { type: 'heading', text: 'Post-inflammatory hyperpigmentation (PIH)', id: 'pih' },
      { type: 'paragraph', text: 'PIH is the dark mark left after a breakout, burn, or skin injury. It is not a scar — there is no textural change. It is melanin overproduction triggered by the inflammatory process. PIH is more pronounced in deeper skin tones, where melanocytes are more reactive.' },
      { type: 'list', items: [
        'SPF daily — UV darkens PIH significantly and prolongs its duration.',
        'Niacinamide — interrupts melanin transfer to skin cells, fading marks over time.',
        'Vitamin C — inhibits tyrosinase, the melanin-production enzyme.',
        'Azelaic acid — anti-inflammatory and tyrosinase-inhibiting; particularly good for PIH in sensitive skin.',
        'Retinoids — accelerate cell turnover, bringing pigmented cells to the surface faster.',
        'Timeline — even with treatment, PIH typically takes 3–24 months to fully fade.',
      ]},
      { type: 'heading', text: 'Melasma', id: 'melasma' },
      { type: 'paragraph', text: 'Melasma is a symmetrical, patchy hyperpigmentation typically affecting the face (cheeks, forehead, upper lip). It is strongly associated with hormonal changes (pregnancy, contraceptives) and UV exposure. It is notoriously difficult to treat and prone to relapse.' },
      { type: 'callout', variant: 'warning', title: 'Melasma requires strict sun protection above all else', text: 'Even brief UV exposure can undo months of treatment progress. Daily broad-spectrum SPF 50+ and physical shade (hat, staying out of peak-hour sun) are non-negotiable alongside any topical treatment.' },
      { type: 'list', items: [
        'Hydroquinone — the most studied depigmenting agent; prescription-strength (4%) most effective. Not for continuous long-term use.',
        'Tranexamic acid — newer strong evidence, well-tolerated, and a first-line option.',
        'Triple combination cream (hydroquinone + tretinoin + steroid) — prescription; the most evidence-supported for melasma.',
        'Chemical peels and lasers — adjunct options but carry higher risk in darker skin tones.',
      ]},
      { type: 'heading', text: 'Sun damage (solar lentigines)', id: 'sun-damage' },
      { type: 'paragraph', text: 'Solar lentigines ("age spots", "liver spots") are flat, well-defined dark spots caused by cumulative UV exposure. They are distinct from melasma — no hormonal component — and respond reasonably well to topical brighteners and laser treatments.' },
      { type: 'myth-fact', myth: 'All dark spots require the same treatment.', fact: 'PIH, melasma, and solar lentigines have different mechanisms and require different approaches. Misidentifying the type leads to ineffective treatment — and some treatments that work for PIH (like certain lasers) can worsen melasma.' },
      { type: 'quiz', questions: [
        { q: 'What is the primary difference between PIH and melasma?', options: ['PIH has a textural component; melasma does not', 'Melasma is driven by inflammation; PIH by hormones', 'PIH is triggered by inflammation; melasma is hormonal and UV-driven', 'They are identical conditions'], answer: 2, explanation: 'PIH is post-inflammatory — a response to injury or breakout. Melasma is driven by hormonal changes and UV exposure, occurring symmetrically on the face.' },
        { q: 'Why is sun protection critical for treating hyperpigmentation of any type?', options: ['It prevents dehydration', 'UV stimulates more melanin production, darkening spots and reversing treatment progress', 'It thins the skin to reveal lighter layers', 'SPF ingredients directly bleach dark spots'], answer: 1, explanation: 'UV triggers melanin production — even small amounts of unprotected sun exposure will continue darkening spots and undo the effect of any topical treatment.' },
      ]},
    ],
  },

  {
    slug: 'hormonal-acne-guide',
    title: 'Hormonal Acne: What It Is and What Actually Works',
    summary: 'Deep, jawline-centred breakouts that track your cycle have a specific cause — and specific treatments. A clear guide to hormonal acne management.',
    level: 'advanced', topic: 'Conditions',
    pathId: 'conditions-deep-dives', pathOrder: 5, xpReward: 55,
    readingMinutes: 7, published: '2026-04-01',
    related: ['acne-types-explained', 'stress-cortisol-skin'],
    prerequisiteSlug: 'hyperpigmentation-types-guide',
    body: [
      { type: 'paragraph', text: 'Hormonal acne is driven by androgens — male hormones present in all bodies — that stimulate sebaceous glands to produce more oil. This type of acne often has a distinct pattern: concentrated on the jawline, chin, and lower cheeks rather than the forehead and nose (which tend to dominate in teenage acne). It frequently flares in the week before menstruation, or with hormonal events like starting or stopping contraception, pregnancy, or perimenopause.' },
      { type: 'list', items: [
        'Pattern recognition: deep, cystic bumps along the jaw and chin that are slow to surface and slow to heal are the hallmark of hormonal acne.',
        'OTC options with evidence: niacinamide (reduces sebum), zinc (topical and oral, moderate evidence), azelaic acid (anti-inflammatory and anti-bacterial), salicylic acid (pore-clearing).',
        'Spearmint tea: small studies suggest anti-androgenic effects at 2 cups/day — low risk, but evidence is preliminary.',
        'Prescription routes: combined oral contraceptives (OCP) reduce androgen activity; spironolactone blocks androgen receptors in the skin; isotretinoin (Accutane) is for severe, scarring, or treatment-resistant cases.',
        'Cycle mapping: tracking your cycle and noting skin changes lets you anticipate and pretreat flares — apply an extra salicylic acid treatment or azelaic acid in the week before your period.',
        'Lifestyle: cortisol (stress hormone) has androgen-like effects on the skin. Sleep, stress management, and consistent eating patterns all influence hormonal acne.',
      ]},
      { type: 'pip-links', items: [
        { title: 'Hormonal Acne: AAD Overview', url: 'https://www.aad.org/public/diseases/acne/really-is-acne/hormonal', source: 'AAD' },
        { title: 'Acne and Hormones', url: 'https://dermnetnz.org/topics/acne-and-hormones', source: 'DermNet NZ' },
        { title: 'Spironolactone for Acne Research', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=spironolactone+hormonal+acne+randomized', source: 'PubMed' },
      ]},
    ],
  },

  {
    slug: 'rosacea-management',
    title: 'Rosacea: Triggers, Treatment, and Long-Term Management',
    summary: 'Rosacea is chronic, not curable — but highly manageable. The four subtypes, what triggers flares, and the most evidence-backed interventions.',
    level: 'advanced', topic: 'Conditions',
    pathId: 'conditions-deep-dives', pathOrder: 6, xpReward: 55,
    readingMinutes: 8, published: '2026-04-10',
    related: ['understanding-acne', 'niacinamide-complete-guide'],
    prerequisiteSlug: 'hormonal-acne-guide',
    body: [
      { type: 'paragraph', text: 'Rosacea is a chronic inflammatory skin condition affecting roughly 1 in 10 adults, most commonly in people with lighter skin tones, though it occurs across all ethnicities. It is frequently misdiagnosed as acne or "sensitive skin." Understanding rosacea means understanding that there are four distinct subtypes, each with different presentations and treatments — and that the most common skincare advice (use more actives, exfoliate, try this serum) often makes rosacea worse.' },
      { type: 'heading', text: 'The four subtypes', id: 'subtypes' },
      { type: 'list', items: [
        'Erythematotelangiectatic (ETR): persistent redness, visible blood vessels, flushing. Most common subtype.',
        'Papulopustular: red bumps and pustules that look like acne — but are not. Often misdiagnosed and treated with acne products, which worsen it.',
        'Phymatous: skin thickening, especially on the nose (rhinophyma). More common in men.',
        'Ocular: eye symptoms — dryness, burning, sensitivity to light. Often accompanies other subtypes.',
        'Common triggers: UV exposure, heat, alcohol, spicy food, hot drinks, stress, exercise, and some skincare ingredients (alcohol, fragrance, menthol, strong acids).',
        'Treatment: azelaic acid (15–20% prescription) and metronidazole (topical) for papulopustular. Brimonidine gel for persistent redness. IPL or laser for visible vessels. Isotretinoin for severe phymatous subtype.',
        'Skincare philosophy for rosacea: the fewer products the better. Fragrance-free, minimal ingredient lists, physical sunscreen only (mineral filters are less reactive).',
      ]},
      { type: 'pip-links', items: [
        { title: 'Rosacea: AAD Overview', url: 'https://www.aad.org/public/diseases/rosacea/what-is-rosacea', source: 'AAD' },
        { title: 'Rosacea', url: 'https://dermnetnz.org/topics/rosacea', source: 'DermNet NZ' },
        { title: 'National Rosacea Society', url: 'https://www.rosacea.org/patients/all-about-rosacea', source: 'National Rosacea Society' },
      ]},
    ],
  },

  {
    slug: 'perioral-dermatitis',
    title: 'Perioral Dermatitis: The Breakout That Is Not Acne',
    summary: 'Small red bumps around the mouth (and sometimes nose and eyes) that look like acne but respond to completely different treatment. What it is and what helps.',
    level: 'intermediate', topic: 'Conditions',
    pathId: 'conditions-deep-dives', pathOrder: 7, xpReward: 45,
    readingMinutes: 6, published: '2026-04-18',
    related: ['understanding-acne', 'rosacea-management'],
    prerequisiteSlug: 'rosacea-management',
    body: [
      { type: 'paragraph', text: 'Perioral dermatitis (POD) is a rash of small red or skin-coloured papules that clusters around the mouth, and sometimes the nose and eyes. It is often mistaken for acne or rosacea — and it is commonly made worse by the treatments people reach for when they see those comparisons. Understanding what it is and what caused it is key to treating it, because the most important first step is stopping the things that feed it.' },
      { type: 'list', items: [
        'Distinguishing features: small bumps and mild scaling specifically around the mouth (a clear border of skin next to the lip is typical), burning or itching, without significant redness.',
        'The most common cause: topical corticosteroids (steroid creams) — even mild, OTC hydrocortisone used on the face. Other triggers include heavy moisturisers, fluorinated toothpaste, and some inhaled steroids (nasal sprays, asthma inhalers).',
        'The steroid-rebound paradox: when topical steroids are stopped, the rash temporarily worsens before improving. This causes many people to reapply steroids, perpetuating the cycle.',
        'Treatment: the most important step is stopping topical steroids. Initial worsening is expected and does not mean treatment has failed. Topical and oral antibiotics (tetracyclines) are first-line medical treatment. Azelaic acid and topical ivermectin also have evidence.',
        'Skincare minimisation: use the fewest, simplest products possible — fragrance-free cleanser, basic moisturiser if needed, SPF. No heavy creams, no acids, no retinoids until cleared.',
        'See a dermatologist if suspected — self-treating with OTC anti-acne products typically makes it worse.',
      ]},
      { type: 'pip-links', items: [
        { title: 'Perioral Dermatitis', url: 'https://dermnetnz.org/topics/perioral-dermatitis', source: 'DermNet NZ' },
        { title: 'Perioral Dermatitis: AAD Overview', url: 'https://www.aad.org/public/diseases/a-z/perioral-dermatitis-overview', source: 'AAD' },
        { title: 'Perioral Dermatitis — NHS', url: 'https://www.nhs.uk/conditions/perioral-dermatitis/', source: 'NHS' },
      ]},
    ],
  },

  {
    slug: 'skincare-for-black-brown-skin',
    title: 'Skincare for Black and Brown Skin Tones',
    summary: 'Melanin-rich skin has distinct strengths and specific vulnerabilities — from hyperpigmentation risk to unique sunscreen needs — that mainstream skincare often ignores.',
    level: 'intermediate', topic: 'Conditions',
    pathId: 'conditions-deep-dives', pathOrder: 8, xpReward: 50,
    readingMinutes: 7, published: '2026-04-26',
    related: ['hyperpigmentation-types-guide', 'sunscreen-for-dark-skin'],
    prerequisiteSlug: 'perioral-dermatitis',
    body: [
      { type: 'paragraph', text: 'Dermatology as a field has historically focused its research, training imagery, and product development on lighter skin tones. This has real consequences: skin conditions in Black and Brown patients are more often misdiagnosed, recommended ingredients are sometimes poorly suited, and guidance around sun protection has been inconsistently applied. This lesson addresses skin health for melanin-rich skin directly and honestly.' },
      { type: 'list', items: [
        'Post-inflammatory hyperpigmentation (PIH): in melanin-rich skin, almost any inflammation — acne, eczema, a scratch, a laser treatment — can leave a lasting dark mark. Preventing inflammation is therefore far more important than it is in lighter skin tones. Daily SPF and gentle, non-irritating products reduce PIH risk significantly.',
        'Ingredients for PIH: niacinamide (5%), azelaic acid (10–20%), vitamin C (stable forms, 10–15%), tranexamic acid (2–5%), kojic acid (1–4%). All have evidence; none are quick. Expect 8–12 weeks minimum.',
        'Keloid-prone skin: certain procedures (aggressive chemical peels, some laser settings, microneedling at high intensity) carry a higher risk of keloid formation in darker skin tones. Always discuss with a derm experienced in skin of colour.',
        'Sunscreen: equally important regardless of skin tone. Choose chemical filters or tinted minerals to avoid white cast.',
        'Finding a good provider: look for dermatologists with specific training or interest in skin of colour. The Skin of Color Society maintains a provider directory.',
        'Eczema and psoriasis in darker skin: these can present with purple or grey-brown discolouration rather than the classic red, making them harder to recognise and often leading to delayed diagnosis.',
      ]},
      { type: 'pip-links', items: [
        { title: 'Skin of Color Society', url: 'https://skinofcolorsociety.org/patient-education/', source: 'Skin of Color Society' },
        { title: 'Hyperpigmentation in Skin of Colour', url: 'https://dermnetnz.org/topics/postinflammatory-hyperpigmentation', source: 'DermNet NZ' },
        { title: 'Skin Cancer in People of Color', url: 'https://www.aad.org/public/diseases/skin-cancer/types/common/melanoma/skin-color', source: 'AAD' },
      ]},
    ],
  },

  {
    slug: 'mature-skin-guide',
    title: 'Skincare for Mature Skin (40s and Beyond)',
    summary: 'How skin changes after 40 — slower turnover, reduced collagen, shifting hormones — and how to adapt your routine to what skin needs at this stage.',
    level: 'intermediate', topic: 'Conditions',
    pathId: 'conditions-deep-dives', pathOrder: 9, xpReward: 50,
    readingMinutes: 7, published: '2026-05-04',
    related: ['retinoids-mechanism-and-evidence', 'ceramides-explained'],
    prerequisiteSlug: 'skincare-for-black-brown-skin',
    body: [
      { type: 'paragraph', text: 'Skin in the 40s and beyond changes in specific, well-understood ways — and most of those changes respond well to the same core ingredients used at any age, just applied with a better understanding of what is happening. The biggest mistake is abandoning the fundamentals in favour of expensive anti-aging products that promise more than the evidence supports.' },
      { type: 'list', items: [
        'What changes: collagen production slows from the late 20s onward. Post-menopausal oestrogen decline accelerates barrier thinning, reduces skin\'s water-holding capacity, and decreases collagen synthesis significantly — often producing rapid visible changes in skin texture and firmness.',
        'Retinoids: the most evidence-backed anti-aging ingredient available. Retinol (OTC) and tretinoin (prescription) are both shown in clinical trials to reduce fine lines, improve texture, and increase collagen production. Not optional for mature skin if tolerated.',
        'SPF: cumulative UV exposure is the single largest external cause of visible aging. The benefit of daily SPF does not diminish with age — it compounds. Starting in your 40s is not too late.',
        'Peptides: modest evidence for some peptides (matrixyl/palmitoyl pentapeptide, argireline) in improving skin firmness and fine lines. Less evidence than retinoids, but well tolerated and worth including in a routine.',
        'Collagen supplements: hydrolysed collagen peptides have emerging evidence (small RCTs) for improving skin elasticity and hydration — not equivalent to topical retinoids, but low risk and reasonable as an adjunct.',
        'Rich moisturisers become more important: barrier function declines with age. Ceramide-rich formulations and occlusives (petrolatum, shea) become more appropriate for mature skin.',
      ]},
      { type: 'pip-links', items: [
        { title: 'Anti-Aging Skin Care Guide', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/anti-aging/antiaging-skin-care-guide', source: 'AAD' },
        { title: 'Aging Skin', url: 'https://dermnetnz.org/topics/aging-skin', source: 'DermNet NZ' },
        { title: 'Retinoids for Skin Aging — Research', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=retinoids+aging+skin+randomized+controlled+trial', source: 'PubMed' },
      ]},
    ],
  },

  // ══════════════════════════════════════════
  // PATH: DIET & SKIN
  // ══════════════════════════════════════════

  {
    slug: 'diet-and-skin-overview',
    title: 'How Your Diet Affects Your Skin',
    summary: 'The evidence for what you eat showing up on your face — what is real, what is overhyped, and which foods have the most consistent research behind them.',
    level: 'beginner', topic: 'Nutrition',
    pathId: 'diet-and-skin', pathOrder: 1, xpReward: 40,
    readingMinutes: 5, published: '2026-06-01',
    related: ['gut-skin-axis', 'sugar-and-acne'],
    body: [
      { type: 'paragraph', text: 'The skin is your largest organ, and like every other organ it is built from what you eat. The evidence that diet influences skin health is real — but it is also far more nuanced than "eat this superfood for glowing skin." Some links are well-established (high-glycaemic diets and acne, omega-3s and inflammation). Others are overhyped or based on small, low-quality studies.' },
      { type: 'heading', text: 'What the evidence actually shows', id: 'evidence' },
      { type: 'list', items: [
        'High-glycaemic diets — foods that spike blood sugar quickly (white bread, sugary drinks, processed snacks) — are associated with increased acne severity in multiple observational studies and at least two RCTs.',
        'Omega-3 fatty acids (oily fish, flaxseed, walnuts) have anti-inflammatory effects that extend to the skin. Studies link higher omega-3 intake to reduced inflammatory acne and improved skin barrier function.',
        'Antioxidants from vegetables and fruit (vitamins C and E, polyphenols, carotenoids) protect skin cells from UV-generated free radical damage. This is measurable in skin biopsies.',
        'Dairy — particularly skim milk — is associated with acne in several large studies, though the mechanism is debated (hormones in milk, IGF-1 signalling, or processing methods).',
        'Hydration: skin water content is influenced by total fluid intake, but the effect is modest in people who are not already dehydrated. Drinking more water does not replace moisturiser.',
      ]},
      { type: 'callout', variant: 'note', text: 'Most nutrition–skin studies are observational. They show associations, not causes. The best you can do is make reasonable adjustments and observe your own skin over 8–12 weeks — not chase every headline.' },
      { type: 'heading', text: 'What is overhyped', id: 'overhyped' },
      { type: 'list', items: [
        '"Detox" foods and juices — the liver and kidneys handle detoxification. No food accelerates this.',
        'Collagen supplements for skin: emerging evidence (small RCTs) shows some benefit for elasticity and hydration, but results are modest and study quality varies.',
        'Any single "superfood" — the pattern of your whole diet matters far more than any individual food.',
      ]},
      { type: 'faq', items: [
        { q: 'Should I cut out dairy entirely?', a: 'Not necessarily. The association between dairy and acne is strongest for skim milk specifically. If you notice your skin improves when you reduce dairy, that is useful data. Otherwise, a full elimination is not warranted based on current evidence.' },
        { q: 'Do I need to take supplements?', a: 'Most people eating a varied diet get adequate skin-relevant nutrients from food. Supplements become worth considering for deficiencies (vitamin D in low-sunlight climates, omega-3 if you eat no oily fish) — not as general enhancements.' },
      ]},
      { type: 'quiz', questions: [
        { q: 'Which dietary pattern has the strongest evidence linking it to acne?', options: ['High-fat diet', 'High-glycaemic diet', 'Vegan diet', 'High-protein diet'], answer: 1, explanation: 'Multiple studies, including RCTs, have found that diets with a high glycaemic load are associated with increased acne severity.' },
        { q: 'Does drinking more water noticeably improve skin?', options: ['Yes, dramatically', 'Only if already dehydrated', 'No effect at all', 'Only for oily skin'], answer: 1, explanation: 'Hydration matters when you are dehydrated, but for people with adequate intake, drinking extra water has a modest effect on skin water content at best.' },
      ]},
    ],
  },

  {
    slug: 'sugar-and-acne',
    title: 'Sugar, Glycaemic Index, and Acne',
    summary: 'Why high-sugar and high-GI diets are linked to breakouts — the insulin and IGF-1 pathway explained simply, and how to apply it to your diet.',
    level: 'intermediate', topic: 'Nutrition',
    pathId: 'diet-and-skin', pathOrder: 2, xpReward: 45,
    readingMinutes: 5, published: '2026-06-03',
    related: ['diet-and-skin-overview', 'understanding-acne', 'hormonal-acne-guide'],
    prerequisiteSlug: 'diet-and-skin-overview',
    body: [
      { type: 'paragraph', text: 'The link between sugar and acne is one of the better-evidenced nutrition–skin connections. It works through a chain: high-GI foods spike blood glucose, which raises insulin, which triggers IGF-1 (insulin-like growth factor), which increases sebum production and skin-cell proliferation — two key drivers of acne.' },
      { type: 'heading', text: 'The mechanism', id: 'mechanism' },
      { type: 'list', items: [
        'Insulin spike: high-GI foods (white bread, sugary drinks, crisps, rice cakes) cause a rapid rise in blood glucose and a corresponding insulin surge.',
        'IGF-1 elevation: insulin raises IGF-1, a growth factor that stimulates oil glands to produce more sebum and accelerates the proliferation of skin cells in hair follicles — both contribute to clogged pores.',
        'Androgen pathway: insulin also reduces the liver\'s production of sex hormone-binding globulin (SHBG), leaving more free androgens in circulation. Free androgens further stimulate sebum production.',
        'Inflammation: high blood glucose directly promotes inflammatory signalling in the skin, worsening existing acne.',
      ]},
      { type: 'callout', variant: 'tip', title: 'The GI of a food is not fixed', text: 'Cooking method, food combinations, and portion size all change how quickly glucose enters the blood. White rice eaten with vegetables, protein, and fat has a lower effective GI than white rice alone.' },
      { type: 'heading', text: 'What the studies show', id: 'studies' },
      { type: 'paragraph', text: 'A 2007 RCT (Smith et al.) found that young men on a low-GI diet for 12 weeks had significantly fewer acne lesions than those on a high-GI control diet. A 2012 Korean study found similar results. These are small studies — but they are randomised controlled trials, the strongest type of evidence in nutrition research.' },
      { type: 'heading', text: 'Practical changes', id: 'practical' },
      { type: 'list', items: [
        'Swap refined carbohydrates for whole-grain alternatives (brown rice, oats, wholegrain bread).',
        'Reduce sugary drinks — these cause the sharpest insulin spikes of any food.',
        'Add protein and fat to meals containing carbohydrates — this blunts the glycaemic response.',
        'Snack on nuts, seeds, or vegetables rather than crisps, crackers, or sweets.',
      ]},
      { type: 'faq', items: [
        { q: 'How long until diet changes affect my acne?', a: 'Acne studies typically run 10–12 weeks. That aligns with a full skin-cell turnover cycle. Give any dietary change at least 8 weeks before judging its effect.' },
        { q: 'Does fruit cause acne because it contains sugar?', a: 'Whole fruit has a low to moderate GI because the fibre slows sugar absorption. Fruit juice removes that fibre, so it has a much higher glycaemic impact. Eat fruit whole.' },
      ]},
    ],
  },

  {
    slug: 'gut-skin-axis',
    title: 'The Gut–Skin Axis',
    summary: 'Your gut microbiome and your skin are in constant communication. Here is what the research says about probiotics, prebiotics, and skin conditions.',
    level: 'intermediate', topic: 'Nutrition',
    pathId: 'diet-and-skin', pathOrder: 3, xpReward: 50,
    readingMinutes: 6, published: '2026-06-05',
    related: ['diet-and-skin-overview', 'eczema-trigger-and-repair', 'rosacea-management'],
    prerequisiteSlug: 'sugar-and-acne',
    body: [
      { type: 'paragraph', text: 'The gut–skin axis refers to the bidirectional communication between your gut microbiome — the trillions of bacteria, fungi, and other microorganisms in your digestive tract — and your skin. It operates through immune signalling, the production of short-chain fatty acids, systemic inflammation, and hormonal pathways. The science is still developing, but several connections are now well-supported.' },
      { type: 'heading', text: 'What is established', id: 'established' },
      { type: 'list', items: [
        'People with eczema (atopic dermatitis) have measurably different gut microbiome compositions to those without it. Dysbiosis (an imbalanced microbiome) is associated with increased intestinal permeability and systemic inflammation that worsens eczema.',
        'Rosacea is associated with gut conditions including SIBO (small intestinal bacterial overgrowth) in some studies. Treating SIBO has produced skin improvement in small trials — causation is not confirmed, but the overlap is notable.',
        'Acne: altered gut microbiome diversity is observed in acne patients in observational studies, though whether this is a cause or effect is unclear.',
        'Probiotics: a 2021 meta-analysis found that oral probiotic supplementation reduced acne lesion counts, though study quality varied. Lactobacillus and Bifidobacterium strains are the most studied.',
      ]},
      { type: 'callout', variant: 'warning', title: 'This field moves fast', text: 'Much gut–skin research is still in early stages. Probiotic studies vary enormously in strains, doses, and duration. Do not interpret "probiotics can help skin" as "any probiotic will help your skin." Strain specificity matters.' },
      { type: 'heading', text: 'Practical steps', id: 'practical' },
      { type: 'list', items: [
        'Eat a diverse range of plant foods — fibre variety is the strongest predictor of microbiome diversity.',
        'Include fermented foods (yoghurt, kefir, sauerkraut, kimchi, kombucha) — these contain live bacteria shown in RCTs to improve microbiome diversity.',
        'Limit ultra-processed foods — these reduce microbial diversity and increase inflammatory markers.',
        'Avoid unnecessary antibiotics — they cause significant, sometimes lasting, disruption to the gut microbiome.',
      ]},
      { type: 'faq', items: [
        { q: 'Should I take a probiotic supplement for my skin?', a: 'The evidence is suggestive but not definitive enough to recommend a specific supplement. Fermented foods are a lower-risk, food-first approach. If you try a probiotic, look for one with Lactobacillus rhamnosus or Lactobacillus acidophilus — these are the most studied for skin outcomes.' },
        { q: 'What is leaky gut and does it affect skin?', a: 'Leaky gut (increased intestinal permeability) is a real phenomenon where the gut lining becomes more permeable, allowing bacterial products into the bloodstream. It is associated with systemic inflammation. Whether it directly causes skin conditions is plausible but not firmly established.' },
      ]},
    ],
  },

  {
    slug: 'omega-3-and-skin',
    title: 'Omega-3 Fatty Acids and Skin',
    summary: 'Oily fish, flaxseed, walnuts — the anti-inflammatory fatty acids that have the most consistent evidence for skin health, and how much you actually need.',
    level: 'beginner', topic: 'Nutrition',
    pathId: 'diet-and-skin', pathOrder: 4, xpReward: 35,
    readingMinutes: 4, published: '2026-06-07',
    related: ['diet-and-skin-overview', 'eczema-trigger-and-repair'],
    prerequisiteSlug: 'diet-and-skin-overview',
    body: [
      { type: 'paragraph', text: 'Omega-3 fatty acids — specifically EPA (eicosapentaenoic acid) and DHA (docosahexaenoic acid) from oily fish, and ALA (alpha-linolenic acid) from plant sources — are among the best-evidenced dietary interventions for skin health. They work primarily by reducing inflammation and supporting the skin barrier lipid matrix.' },
      { type: 'heading', text: 'What they do for skin', id: 'mechanism' },
      { type: 'list', items: [
        'Anti-inflammatory: EPA competes with arachidonic acid in inflammatory pathways, reducing the production of pro-inflammatory eicosanoids. This translates to measurably lower inflammatory markers in skin biopsies after omega-3 supplementation.',
        'Barrier support: DHA is a structural component of cell membranes. Adequate intake supports the skin\'s lipid barrier, reducing trans-epidermal water loss.',
        'UV protection: omega-3s reduce UV-induced inflammation and DNA damage in the skin. Not a replacement for sunscreen — a supplement to it.',
        'Acne: a 2012 Korean study found omega-3 supplementation (2g/day EPA+DHA) reduced both inflammatory and non-inflammatory acne lesions significantly over 10 weeks.',
        'Eczema: multiple studies show improvement in eczema severity with omega-3 supplementation, likely through reduced systemic inflammation.',
      ]},
      { type: 'callout', variant: 'tip', title: 'EPA matters more than DHA for skin', text: 'When looking at supplements, a higher EPA:DHA ratio (e.g. 3:1 or 2:1) is more relevant for inflammatory skin conditions. Most standard fish oil capsules are roughly 1.5:1 EPA:DHA.' },
      { type: 'heading', text: 'Food sources and amounts', id: 'sources' },
      { type: 'list', items: [
        'Salmon (farmed, 100g): ~2.5g EPA+DHA — one serving covers a week\'s worth at common supplement doses.',
        'Mackerel (100g): ~2.6g EPA+DHA. Sardines, herring, and anchovies are also excellent.',
        'Walnuts (30g): ~2.5g ALA — but ALA converts to EPA at only ~5–10% efficiency in humans. Plant omega-3 sources are not equivalent to fish.',
        'Flaxseed oil (1 tbsp): ~7g ALA. Same conversion caveat applies.',
        'Algae-based DHA supplements: the direct plant-based alternative for those who do not eat fish.',
      ]},
      { type: 'faq', items: [
        { q: 'How long until I see skin benefits from omega-3s?', a: 'Studies showing skin benefits typically run 10–16 weeks. The anti-inflammatory effect takes time to accumulate in cell membranes. Expect at least 3 months before evaluating the effect.' },
        { q: 'Can I take fish oil with my other supplements?', a: 'Fish oil has a mild blood-thinning effect at high doses. At typical doses (1–3g/day), this is not a concern for most people. If you take blood thinners or have a clotting condition, check with your GP.' },
      ]},
    ],
  },

  {
    slug: 'vitamins-for-skin',
    title: 'Which Vitamins Actually Help Your Skin',
    summary: 'Vitamin C, D, E, A, zinc — sorted by evidence strength. What deficiencies matter, what supplementation does, and what is a waste of money.',
    level: 'beginner', topic: 'Nutrition',
    pathId: 'diet-and-skin', pathOrder: 5, xpReward: 40,
    readingMinutes: 5, published: '2026-06-09',
    related: ['diet-and-skin-overview', 'zinc-for-skin', 'vitamin-c-guide'],
    prerequisiteSlug: 'omega-3-and-skin',
    body: [
      { type: 'paragraph', text: 'The vitamin and supplement industry is enormous — and most of what it sells for "skin health" is unsupported by meaningful evidence. A few vitamins genuinely matter for skin, primarily when you are deficient. Supplementing beyond what your diet already provides rarely produces dramatic results.' },
      { type: 'heading', text: 'Vitamins with real evidence', id: 'evidence' },
      { type: 'list', items: [
        'Vitamin D: deficiency is associated with eczema, psoriasis, and impaired wound healing. People in low-sunlight climates or with darker skin are commonly deficient. Testing and supplementing to correct a deficiency is worthwhile. Supplementing if already replete has less clear benefit.',
        'Vitamin C: critical for collagen synthesis — without it, skin does not heal properly (scurvy is the extreme case). Most people get enough from diet. Topical vitamin C has separate and stronger evidence for photoprotection and brightening.',
        'Vitamin E (tocopherol): an antioxidant that protects skin cell membranes from oxidative damage. Deficiency is rare in people eating vegetable oils, nuts, and seeds. Supplementation beyond food sources has weak evidence for skin benefit.',
        'Vitamin A (retinol): the systemic version of what retinoids do topically. Severe deficiency causes dry, rough skin. Most people are not deficient. High-dose supplementation carries toxicity risk — topical retinoids are the effective, safer route for skin improvement.',
        'Zinc: important for wound healing, immune function, and has antimicrobial effects on acne-causing bacteria. Oral zinc (30–45mg elemental zinc daily) is shown in RCTs to reduce acne — it is less effective than antibiotics but avoids antibiotic resistance concerns.',
      ]},
      { type: 'callout', variant: 'warning', text: 'Fat-soluble vitamins (A, D, E, K) accumulate in the body and can reach toxic levels if over-supplemented. More is not better. If taking these, stay within recommended upper limits and ideally test your levels first (especially vitamin D).' },
      { type: 'heading', text: 'What to skip', id: 'skip' },
      { type: 'list', items: [
        'Biotin (vitamin B7): widely marketed for hair and nails. Evidence is limited to people with actual biotin deficiency, which is rare. Excess biotin can also interfere with thyroid and hormone blood tests.',
        'Collagen supplements: emerging but mixed evidence — see the Diet overview article.',
        'Generic "skin, hair and nails" multivitamins: these typically underdose every ingredient. If you need a specific vitamin, take it specifically.',
      ]},
      { type: 'faq', items: [
        { q: 'Should I get my vitamin D tested?', a: 'If you live at a latitude above 50°N (UK, Canada, Scandinavia), have darker skin, work indoors, or cover up in the sun — yes. Deficiency is common in these groups and a simple blood test confirms it.' },
        { q: 'Can I get enough vitamin C for skin from food alone?', a: 'Topical vitamin C and dietary vitamin C do different things. Dietary vitamin C supports collagen synthesis from the inside. Topical vitamin C provides direct photoprotection and brightening at the skin surface. For skin goals, you need both.' },
      ]},
    ],
  },

  // ══════════════════════════════════════════
  // PATH: MEN'S SKINCARE
  // ══════════════════════════════════════════

  {
    slug: 'mens-skincare-basics',
    title: "Men's Skincare: Start Here",
    summary: "Most men use three products or fewer. Here's how to build a routine that actually works — without overcomplicating it.",
    level: 'beginner', topic: 'Routines',
    pathId: 'mens-skincare', pathOrder: 1, xpReward: 35,
    readingMinutes: 4, published: '2026-06-10',
    related: ['build-your-first-routine', 'spf-the-one-non-negotiable', 'mens-shaving-skincare'],
    body: [
      { type: 'paragraph', text: "Men's skincare is simple when stripped of the marketing. The skin biology is the same — the main differences are higher sebum production on average (driven by testosterone), thicker skin, and the mechanical stress of shaving. Everything else is the same three core steps: cleanse, moisturise, protect." },
      { type: 'heading', text: 'The core routine', id: 'routine' },
      { type: 'list', ordered: true, items: [
        'Cleanser — wash your face morning and night with a gentle, non-stripping cleanser. Soap dries skin and disrupts the pH. A purpose-built face wash is not luxury — it is the right tool.',
        'Moisturiser — men tend to skip this, often because of fear of looking "shiny." A lightweight gel moisturiser adds no visible shine while maintaining a healthy barrier.',
        'SPF 30+ — the highest-impact anti-aging and skin cancer prevention tool available. The leading cause of visible skin aging (wrinkles, texture loss, dark spots) is UV exposure, not age itself.',
      ]},
      { type: 'callout', variant: 'tip', title: 'Combine steps if needed', text: 'A moisturiser with SPF built in is fine for daily use. It reduces the routine to two steps. The trade-off is that SPF-infused moisturisers often have lower protection than a standalone sunscreen — but SPF 30 every day beats SPF 50 used inconsistently.' },
      { type: 'heading', text: 'What makes men\'s skin different', id: 'differences' },
      { type: 'list', items: [
        'Higher sebum: testosterone stimulates larger and more active sebaceous glands. Men tend toward oily skin and are more acne-prone into adulthood than women.',
        'Thicker skin: men\'s skin is about 20–25% thicker on average due to higher collagen density. This delays some visible signs of aging but does not protect against UV damage.',
        'Shaving: removes surface cells (a form of exfoliation) and can disrupt the skin barrier. Post-shave products that are alcohol-free and include a humectant reduce irritation significantly.',
      ]},
      { type: 'faq', items: [
        { q: 'Do I need separate products for men?', a: 'No. "For men" on a label is marketing. Ingredients are what matter, and there is no ingredient that works differently based on your gender. Do not pay a premium for blue packaging.' },
        { q: 'My skin feels fine — do I still need to moisturise?', a: 'Feeling fine does not mean the barrier is intact. A compromised barrier shows up later as sensitivity, dryness, or early aging. Moisturising consistently is preventive, not reactive.' },
      ]},
      { type: 'quiz', questions: [
        { q: 'What is the main cause of visible skin aging in men?', options: ['Natural aging', 'UV exposure', 'Dehydration', 'Shaving'], answer: 1, explanation: 'UV radiation is responsible for up to 80% of visible facial aging. Daily SPF is therefore the highest-impact anti-aging step.' },
      ]},
    ],
  },

  {
    slug: 'mens-shaving-skincare',
    title: 'Shaving Without Wrecking Your Skin',
    summary: 'Razor burn, ingrown hairs, and post-shave dryness are all avoidable. The technique and products that make a real difference.',
    level: 'beginner', topic: 'Routines',
    pathId: 'mens-skincare', pathOrder: 2, xpReward: 35,
    readingMinutes: 4, published: '2026-06-12',
    related: ['mens-skincare-basics', 'understanding-acne'],
    prerequisiteSlug: 'mens-skincare-basics',
    body: [
      { type: 'paragraph', text: 'Shaving is a form of mechanical exfoliation — it removes a layer of dead skin cells along with the hair. Done correctly, this can leave skin smooth. Done carelessly, it strips the barrier, causes razor burn, traps hairs, and leads to post-inflammatory hyperpigmentation on darker skin tones.' },
      { type: 'heading', text: 'Before you shave', id: 'before' },
      { type: 'list', items: [
        'Soften the hair first: shave after a shower when hair has absorbed water and softened. Dry shaving requires more force and causes more irritation.',
        'Use a shave gel or cream, not foam: foam is mostly air and provides poor lubrication. A gel or cream creates a proper film that the blade glides over.',
        'Do not use bar soap: it leaves a residue that increases friction and dries skin.',
      ]},
      { type: 'heading', text: 'During the shave', id: 'during' },
      { type: 'list', items: [
        'Shave with the grain: going against the direction of hair growth gets a closer shave but dramatically increases irritation and ingrown hair risk, especially on the neck.',
        'Use light pressure — let the blade do the work. Pressing harder does not improve the shave; it increases cuts and irritation.',
        'Rinse the blade frequently: a clogged blade drags rather than cuts.',
        'Replace blades regularly: a dull blade requires more passes and more pressure. Most blades last 5–7 shaves, not 20.',
      ]},
      { type: 'heading', text: 'After the shave', id: 'after' },
      { type: 'list', items: [
        'Rinse with cool water: closes pores and reduces redness.',
        'Avoid alcohol-based aftershaves: they sting for a reason — they strip the barrier and dry skin significantly. They feel "clean" because that sensation is associated with cleanliness, not because they are doing something useful.',
        'Apply a light moisturiser or balm with niacinamide: this calms redness and replenishes moisture lost during shaving.',
        'SPF if it is morning: freshly shaved skin is more UV-sensitive.',
      ]},
      { type: 'callout', variant: 'tip', title: 'Ingrown hairs (pseudofolliculitis)', text: 'Common in men with curly or coiled hair, especially on the neck. Caused by hairs curling back into the skin after cutting. Prevention: shave with the grain only, use a single-blade razor, exfoliate gently 2–3 times a week, and moisturise consistently. Salicylic acid (2%) helps clear clogged follicles.' },
      { type: 'faq', items: [
        { q: 'Are expensive razors worth it?', a: 'A sharp, well-maintained single or double-blade razor outperforms a dull multi-blade one. Beyond that, the return on investment drops off. The blade matters more than the handle.' },
        { q: 'I get a lot of redness after shaving — what helps?', a: 'Apply a product with niacinamide or centella asiatica immediately after. These reduce redness and barrier disruption. If redness persists beyond 30 minutes, razor burn is ongoing — revisit your technique and blade sharpness.' },
      ]},
    ],
  },

  {
    slug: 'mens-acne-guide',
    title: "Acne in Men: Why It Happens and What Works",
    summary: "Testosterone, stress, and shaving all conspire against clear skin. The evidence-based approach to breakouts that actually fits a simpler routine.",
    level: 'intermediate', topic: 'Conditions',
    pathId: 'mens-skincare', pathOrder: 3, xpReward: 45,
    readingMinutes: 5, published: '2026-06-14',
    related: ['understanding-acne', 'sugar-and-acne', 'mens-shaving-skincare'],
    prerequisiteSlug: 'mens-shaving-skincare',
    body: [
      { type: 'paragraph', text: 'Acne in men is driven by the same factors as acne generally — excess sebum, clogged follicles, bacteria, inflammation — but the hormonal environment is different. Testosterone directly stimulates sebaceous glands, which is why men tend to have oilier skin and often worse or later-onset acne than women.' },
      { type: 'heading', text: 'Why men get acne', id: 'why' },
      { type: 'list', items: [
        'High androgen levels: testosterone converts to DHT (dihydrotestosterone) in sebaceous glands, directly stimulating oil production. This is why acne spikes in male puberty and why anti-androgens are used in female acne treatment but not typically in men.',
        'Sweat and occlusion: exercise, helmets, and close-fitting clothing trap heat and moisture against skin — a breeding ground for acne-causing bacteria.',
        'Shaving irritation: disrupting the follicle opening during shaving can trigger inflammatory acne, particularly on the neck and jaw.',
        'Diet: men tend to consume more high-GI foods and dairy on average than women in most dietary surveys — both linked to acne.',
      ]},
      { type: 'heading', text: 'What actually works', id: 'treatment' },
      { type: 'list', items: [
        'Benzoyl peroxide (2.5–5%): kills Cutibacterium acnes bacteria and unclogs pores. The most effective OTC acne treatment. Start at 2.5% — the lower concentration is as effective as 10% with far less dryness.',
        'Salicylic acid (2%): oil-soluble, penetrates pores, dissolves the debris that causes blackheads and whiteheads. Good for blackhead-prone areas like the nose and forehead.',
        'Niacinamide (5%): reduces sebum production and calms redness. Well tolerated, no adjustment period needed.',
        'Retinoids: prescription tretinoin is the most effective topical treatment for acne overall. Worth requesting from a GP if OTC options plateau.',
        'Oral options: a GP can prescribe antibiotics (short-term), or refer for isotretinoin if acne is severe. Oral zinc (30mg elemental) has evidence for mild-to-moderate acne as a non-antibiotic option.',
      ]},
      { type: 'callout', variant: 'note', text: 'Gym supplements — particularly whey protein and creatine — are associated with acne in some studies and anecdotal reports. If breakouts coincided with starting supplementation, trial removal of whey (switch to pea or rice protein) and observe over 8 weeks.' },
      { type: 'faq', items: [
        { q: 'I have tried everything — what next?', a: 'If OTC treatments have not worked after 12 weeks of consistent use, see a GP or dermatologist. Prescription tretinoin and oral options are significantly more effective and should not be a last resort.' },
      ]},
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getRelated(article: Article) {
  return article.related
    .map((slug) => ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a))
}

export const ALL_TOPICS = Array.from(
  new Set(ARTICLES.map((a) => a.topic))
).sort()
