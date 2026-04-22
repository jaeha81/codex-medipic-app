import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/line/notify
 *
 * body: { sessionId: string; slotLabel: string; userId?: string }
 *
 * Mock モード（NEXT_PUBLIC_LIFF_ID 未設定）:
 *   → { success: true, messageId: 'mock_<timestamp>' } を即時返却
 *
 * 実際の連携時:
 *   1. LINE_CHANNEL_ACCESS_TOKEN を環境変数に設定
 *   2. LINE Messaging API の push message エンドポイントを呼ぶ
 *      POST https://api.line.me/v2/bot/message/push
 *      Authorization: Bearer <LINE_CHANNEL_ACCESS_TOKEN>
 *      body: { to: userId, messages: [ FlexMessage ] }
 */

interface NotifyBody {
  sessionId: string
  slotLabel: string
  userId?: string
}

const IS_MOCK = !process.env.NEXT_PUBLIC_LIFF_ID

export async function POST(req: NextRequest) {
  let body: NotifyBody

  try {
    body = (await req.json()) as NotifyBody
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const { sessionId, slotLabel, userId } = body

  if (!sessionId || !slotLabel) {
    return NextResponse.json(
      { success: false, error: 'sessionId and slotLabel are required' },
      { status: 422 },
    )
  }

  /* ── Mock モード ──────────────────────────────────────── */
  if (IS_MOCK) {
    console.log('[LINE mock] /api/line/notify', { sessionId, slotLabel, userId })
    return NextResponse.json({
      success: true,
      messageId: `mock_${Date.now()}`,
      note: 'Running in mock mode — no actual LINE message was sent.',
    })
  }

  /* ── 実際の連携（LINE Messaging API） ────────────────── */
  // TODO: 以下のコードを実装する前に LINE_CHANNEL_ACCESS_TOKEN を .env.local に設定してください
  //
  // const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
  // if (!token) {
  //   return NextResponse.json({ success: false, error: 'LINE_CHANNEL_ACCESS_TOKEN not set' }, { status: 500 })
  // }
  // if (!userId) {
  //   return NextResponse.json({ success: false, error: 'userId is required for real LINE notify' }, { status: 422 })
  // }
  //
  // const flexMessage = {
  //   type: 'flex',
  //   altText: `Booking confirmed: ${slotLabel}`,
  //   contents: {
  //     type: 'bubble',
  //     body: {
  //       type: 'box',
  //       layout: 'vertical',
  //       contents: [
  //         { type: 'text', text: 'Booking Confirmed', weight: 'bold', size: 'xl' },
  //         { type: 'text', text: slotLabel, size: 'md', color: '#07B53B' },
  //       ],
  //     },
  //   },
  // }
  //
  // const res = await fetch('https://api.line.me/v2/bot/message/push', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify({ to: userId, messages: [flexMessage] }),
  // })
  //
  // if (!res.ok) {
  //   const err = await res.text()
  //   return NextResponse.json({ success: false, error: err }, { status: res.status })
  // }
  //
  // return NextResponse.json({ success: true, messageId: `line_${Date.now()}` })

  return NextResponse.json({
    success: false,
    error: 'Real LINE integration not yet configured.',
  }, { status: 501 })
}
