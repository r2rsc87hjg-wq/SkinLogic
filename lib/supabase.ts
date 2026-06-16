import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are not set')
}

// Public client — safe to use in Server Components and Client Components.
// Respects Row Level Security. Do not use for admin operations.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client — server-side only. Bypasses RLS. Use only in API routes
// that require elevated access (e.g. writing transaction logs in Tool 6).
export function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is not set')
  }
  return createClient(supabaseUrl!, serviceKey, {
    auth: { persistSession: false },
  })
}
