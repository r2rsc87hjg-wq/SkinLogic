// Strips common PII patterns from user-pasted text before it is sent to the
// Anthropic API. Substitutes each match with a bracketed placeholder so the
// surrounding medical context is preserved while the identifiers are removed.

export type ScrubResult = {
  text: string
  hadPII: boolean
}

const RULES: Array<{ pattern: RegExp; replacement: string }> = [
  // Social Security Numbers
  { pattern: /\bSSN[:.]?\s*\d{3}[-\s]\d{2}[-\s]\d{4}/gi, replacement: '[SSN REMOVED]' },
  {
    pattern: /\bsocial security(?:\s+number)?[:.]?\s*\d{3}[-\s]\d{2}[-\s]\d{4}/gi,
    replacement: '[SSN REMOVED]',
  },
  // Medical Record Numbers
  { pattern: /\bMRN[:.]?\s*[\w\-]{4,}/gi, replacement: '[MRN REMOVED]' },
  {
    pattern: /\bmedical record(?:\s+number)?[:.]?\s*[\w\-]{4,}/gi,
    replacement: '[MRN REMOVED]',
  },
  // Insurance / member IDs
  { pattern: /\bmember\s+id[:.]?\s*[\w\-]{4,}/gi, replacement: '[ID REMOVED]' },
  { pattern: /\bpolicy\s+(?:number|#)[:.]?\s*[\w\-]{4,}/gi, replacement: '[ID REMOVED]' },
  { pattern: /\bgroup\s+(?:number|#)[:.]?\s*[\w\-]{4,}/gi, replacement: '[ID REMOVED]' },
  { pattern: /\binsurance\s+id[:.]?\s*[\w\-]{4,}/gi, replacement: '[ID REMOVED]' },
  // Dates of birth
  {
    pattern:
      /\b(?:DOB|date of birth|born on)[:.]?\s*\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/gi,
    replacement: '[DOB REMOVED]',
  },
  {
    pattern:
      /\b(?:DOB|date of birth|born on)[:.]?\s*(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\.?\s+\d{1,2},?\s+\d{4}/gi,
    replacement: '[DOB REMOVED]',
  },
  // Phone numbers following a label
  {
    pattern:
      /\b(?:phone|tel|telephone|cell|mobile|fax)[:.]?\s*(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/gi,
    replacement: '[PHONE REMOVED]',
  },
  // Patient names in structured referral text
  {
    pattern: /\bpatient(?:\s+name)?[:.]?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+/g,
    replacement: 'Patient: [NAME REMOVED]',
  },
  {
    pattern: /\bname[:.]?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+/g,
    replacement: 'Name: [NAME REMOVED]',
  },
]

export function scrubPII(input: string): ScrubResult {
  let text = input
  let hadPII = false

  for (const { pattern, replacement } of RULES) {
    const next = text.replace(pattern, replacement)
    if (next !== text) hadPII = true
    text = next
  }

  return { text, hadPII }
}
