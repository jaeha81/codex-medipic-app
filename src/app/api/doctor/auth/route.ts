import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    const expected = process.env.DOCTOR_PASSWORD ?? 'medipic2025'

    if (password !== expected) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true })
    res.headers.set(
      'Set-Cookie',
      'medipic_doctor_token=valid; HttpOnly; Path=/; SameSite=Strict; Max-Age=86400'
    )
    return res
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.headers.set(
    'Set-Cookie',
    'medipic_doctor_token=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0'
  )
  return res
}
