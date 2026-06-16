// Short, citable-in-spirit "Did You Know?" facts rotated daily on the homepage.
// Kept factual and non-prescriptive, in line with the site's editorial stance.

export const DAILY_TIPS: { fact: string; readMore?: string }[] = [
  {
    fact: 'SPF 30 blocks about 97% of UVB and SPF 50 about 98% — the jump is smaller than the numbers suggest. Applying enough matters more than chasing a higher number.',
    readMore: 'spf-the-one-non-negotiable',
  },
  {
    fact: 'Your skin barrier renews on a roughly 4–6 week cycle, which is why most skincare changes take 8–12 weeks to fairly judge.',
    readMore: 'build-your-first-routine',
  },
  {
    fact: 'Sweat itself does not clog pores. Breakouts after training usually come from sweat mixing with oil and friction from gear — not the sweat alone.',
    readMore: 'skincare-for-athletes',
  },
  {
    fact: 'Retinol must be converted by your skin into retinoic acid to work, losing potency at each step. That is why prescription tretinoin is stronger.',
    readMore: 'retinoids-mechanism-and-evidence',
  },
  {
    fact: 'Stress raises cortisol, which can increase oil and inflammation — a real, measurable route by which a hard week shows up on your face.',
    readMore: 'stress-and-your-skin',
  },
  {
    fact: 'Even oily skin benefits from moisturiser. Stripping the skin can prompt it to produce more oil, not less.',
    readMore: 'identify-your-skin-type',
  },
  {
    fact: 'Salicylic acid is oil-soluble, so it can work inside pores — which is why it suits blackheads and oily, acne-prone skin.',
    readMore: 'understanding-acne',
  },
]

// Deterministic day-of-year index so the server and client agree (no hydration
// mismatch) and the tip changes once per day.
export function getTipOfTheDay(date = new Date()) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0)
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  const dayOfYear = Math.floor((today - start) / 86_400_000)
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length]
}
