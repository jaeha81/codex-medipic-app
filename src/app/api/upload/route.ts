import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

/**
 * POST /api/upload
 *
 * multipart/form-data, field: file
 * Saves to public/uploads/ (auto-created if missing)
 * Returns: { url: '/uploads/<filename>', filename: '<filename>' }
 *
 * ── Cloud Storage への切り替え ──────────────────────────────
 * S3 (AWS SDK v3):
 *   import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
 *   const s3 = new S3Client({ region: process.env.AWS_REGION })
 *   await s3.send(new PutObjectCommand({
 *     Bucket: process.env.AWS_S3_BUCKET,
 *     Key: filename,
 *     Body: Buffer.from(await file.arrayBuffer()),
 *     ContentType: file.type,
 *   }))
 *   return NextResponse.json({ url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${filename}`, filename })
 *
 * Vercel Blob:
 *   import { put } from '@vercel/blob'
 *   const blob = await put(filename, file, { access: 'public' })
 *   return NextResponse.json({ url: blob.url, filename })
 * ────────────────────────────────────────────────────────────
 */

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

export async function POST(req: NextRequest) {
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid multipart form data' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ success: false, error: 'field "file" is required' }, { status: 422 })
  }

  // Type check
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { success: false, error: `Unsupported file type: ${file.type}. Allowed: jpeg, png, webp, pdf` },
      { status: 415 },
    )
  }

  // Size check
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { success: false, error: 'File exceeds 10MB limit' },
      { status: 413 },
    )
  }

  // Sanitize filename: spaces → underscores
  const safeOriginal = file.name.replace(/\s+/g, '_')
  const filename = `${Date.now()}_${safeOriginal}`

  // Resolve uploads directory (Next.js: process.cwd() = project root)
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

  try {
    await mkdir(uploadsDir, { recursive: true })
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(path.join(uploadsDir, filename), buffer)
  } catch (err) {
    console.error('[upload] write error', err)
    return NextResponse.json({ success: false, error: 'Failed to save file' }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    url: `/uploads/${filename}`,
    filename,
  })
}
