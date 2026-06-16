// Input validation for all user-submitted data.
// Every API route validates before touching any external service.

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5 MB

export type ValidationResult =
  | { ok: true }
  | { ok: false; message: string }

export function validateImageFile(file: File): ValidationResult {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { ok: false, message: 'Only JPG, PNG, and WEBP images are accepted.' }
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { ok: false, message: 'Image must be under 5 MB.' }
  }
  return { ok: true }
}

export function validateProfilerInput(body: unknown): ValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, message: 'Invalid request body.' }
  }

  const b = body as Record<string, unknown>

  const requiredFields = [
    'skinType',
    'primaryConcern',
    'ageRange',
    'knowledgeLevel',
    'climate',
  ]

  for (const field of requiredFields) {
    if (typeof b[field] !== 'string' || (b[field] as string).trim() === '') {
      return { ok: false, message: `Missing or invalid field: ${field}` }
    }
  }

  // Prevent prompt injection via string length cap
  for (const field of requiredFields) {
    if ((b[field] as string).length > 200) {
      return { ok: false, message: `Field too long: ${field}` }
    }
  }

  return { ok: true }
}

export function validateNavigatorTextInput(
  body: unknown,
  maxLength: number
): ValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, message: 'Invalid request body.' }
  }

  const b = body as Record<string, unknown>

  if (typeof b.text !== 'string' || b.text.trim() === '') {
    return { ok: false, message: 'Text is required.' }
  }

  if (b.text.length > maxLength) {
    return { ok: false, message: `Text must be under ${maxLength} characters.` }
  }

  return { ok: true }
}

// Chatbot conversation: an array of {role, content} turns. Caps both the number
// of turns kept and the size of each message to bound token cost and block
// prompt-injection-by-volume. Returns the cleaned turns on success.
export type ChatTurn = { role: 'user' | 'assistant'; content: string }

const MAX_CHAT_TURNS = 20
const MAX_CHAT_CHARS = 2000

export type ChatValidationResult =
  | { ok: true; messages: ChatTurn[] }
  | { ok: false; message: string }

export function validateChatInput(body: unknown): ChatValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, message: 'Invalid request body.' }
  }

  const { messages } = body as { messages?: unknown }
  if (!Array.isArray(messages) || messages.length === 0) {
    return { ok: false, message: 'A messages array is required.' }
  }
  if (messages.length > MAX_CHAT_TURNS) {
    return { ok: false, message: 'Conversation is too long.' }
  }

  const cleaned: ChatTurn[] = []
  for (const m of messages) {
    if (typeof m !== 'object' || m === null) {
      return { ok: false, message: 'Invalid message in conversation.' }
    }
    const { role, content } = m as { role?: unknown; content?: unknown }
    if (role !== 'user' && role !== 'assistant') {
      return { ok: false, message: 'Invalid message role.' }
    }
    if (typeof content !== 'string' || content.trim() === '') {
      return { ok: false, message: 'Message content is required.' }
    }
    if (content.length > MAX_CHAT_CHARS) {
      return { ok: false, message: 'Message is too long.' }
    }
    cleaned.push({ role, content })
  }

  // The final turn must come from the user — that is what we are responding to.
  if (cleaned[cleaned.length - 1].role !== 'user') {
    return { ok: false, message: 'The last message must be from the user.' }
  }

  return { ok: true, messages: cleaned }
}

// Guided Learning: a question plus optional prior Q/A history. Caps sizes to
// bound token cost and block prompt-injection-by-volume.
export type LearnTurn = { role: 'user' | 'assistant'; content: string }

export type LearnValidationResult =
  | { ok: true; question: string; history: LearnTurn[] }
  | { ok: false; message: string }

export function validateLearnGuideInput(body: unknown): LearnValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, message: 'Invalid request body.' }
  }

  const { question, history } = body as {
    question?: unknown
    history?: unknown
  }

  if (typeof question !== 'string' || question.trim() === '') {
    return { ok: false, message: 'A question is required.' }
  }
  if (question.length > 500) {
    return { ok: false, message: 'That question is too long.' }
  }

  const cleaned: LearnTurn[] = []
  if (history !== undefined) {
    if (!Array.isArray(history) || history.length > 12) {
      return { ok: false, message: 'Invalid conversation history.' }
    }
    for (const t of history) {
      if (typeof t !== 'object' || t === null) {
        return { ok: false, message: 'Invalid history turn.' }
      }
      const { role, content } = t as { role?: unknown; content?: unknown }
      if (role !== 'user' && role !== 'assistant') {
        return { ok: false, message: 'Invalid history role.' }
      }
      if (typeof content !== 'string' || content.length > 4000) {
        return { ok: false, message: 'Invalid history content.' }
      }
      cleaned.push({ role, content })
    }
  }

  return { ok: true, question: question.trim(), history: cleaned }
}

export function validateSocialInput(body: unknown): ValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, message: 'Invalid request body.' }
  }

  const b = body as Record<string, unknown>

  if (typeof b.content !== 'string' || b.content.trim() === '') {
    return { ok: false, message: 'Content is required.' }
  }

  if ((b.content as string).length > 5000) {
    return { ok: false, message: 'Content must be under 5000 characters.' }
  }

  return { ok: true }
}
