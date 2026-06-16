// Client-safe — no server-only imports.
// Checks user text for language suggesting a medical emergency so the 911
// notice can render immediately, before any AI response is fetched.

const PATTERNS = [
  /\bchest pain\b/i,
  /\bchest tightness\b/i,
  /\bcan'?t breathe\b/i,
  /\bcannot breathe\b/i,
  /\bnot breathing\b/i,
  /\bstopped breathing\b/i,
  /\bdifficulty breathing\b/i,
  /\bshortness of breath\b/i,
  /\bunconscious\b/i,
  /\bunresponsive\b/i,
  /\boverdose\b/i,
  /\bheart attack\b/i,
  /\bcardiac arrest\b/i,
  /\bstroke symptoms\b/i,
  /\bsevere bleeding\b/i,
  /\bheavy bleeding\b/i,
  /\bsuicidal\b/i,
  /\bsuicide attempt\b/i,
  /\bkill myself\b/i,
  /\bpoisoning\b/i,
  /\bpoisoned\b/i,
  /\bseizure\b/i,
  /\bconvulsions?\b/i,
  /\banaphylax/i,
  /\bsevere allergic reaction\b/i,
  /\bchoking\b/i,
  /\blost consciousness\b/i,
  /\bpassing out\b/i,
]

export function detectEmergency(text: string): boolean {
  return PATTERNS.some((p) => p.test(text))
}
