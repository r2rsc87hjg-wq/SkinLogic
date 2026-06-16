'use client'

// Free tier limits — number of interactions before the paywall appears.
export const FREE_CHAT_LIMIT = 5
export const FREE_PIP_LIMIT = 3

const KEYS = {
  chatUses: 'sl_chat_uses',
  pipUses: 'sl_pip_uses',
  subToken: 'sl_sub_token',
} as const

function readInt(key: string): number {
  if (typeof window === 'undefined') return 0
  return parseInt(localStorage.getItem(key) ?? '0', 10)
}

export function getChatUsed(): number {
  return readInt(KEYS.chatUses)
}

export function incrementChatUsed(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.chatUses, String(getChatUsed() + 1))
}

export function getPipUsed(): number {
  return readInt(KEYS.pipUses)
}

export function incrementPipUsed(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.pipUses, String(getPipUsed() + 1))
}

export function getSubscriptionToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(KEYS.subToken)
}

export function setSubscriptionToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.subToken, token)
}

export function clearSubscriptionToken(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEYS.subToken)
}

export function isChatAtLimit(): boolean {
  return !getSubscriptionToken() && getChatUsed() >= FREE_CHAT_LIMIT
}

export function isPipAtLimit(): boolean {
  return !getSubscriptionToken() && getPipUsed() >= FREE_PIP_LIMIT
}
