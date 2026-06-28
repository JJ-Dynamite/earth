import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const location = searchParams.get('location') || 'forest'
  const res = await fetch(`http://localhost:3001/sounds?location=${location}`)
  const data = await res.json()
  return NextResponse.json(data)
}
