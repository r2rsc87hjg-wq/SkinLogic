import { NextResponse } from 'next/server'

// History is no longer stored — scans are ephemeral and privacy-preserving.
export async function GET() {
  return NextResponse.json({ history: [] })
}
