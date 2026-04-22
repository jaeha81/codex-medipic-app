/**
 * Simple file-based mock storage for intake sessions.
 * Production: replace with DB (Supabase / PlanetScale / etc.)
 */
import fs from 'fs'
import path from 'path'

export interface StoredIntakeSession {
  sessionId: string
  categoryId: string
  responses: Record<string, string | string[]>
  riskFlags: { questionId: string; severity: 'flag' | 'block'; messageEn: string; messageJa: string }[]
  submittedAt: string   // ISO string
  status: 'pending' | 'reviewed' | 'prescribed' | 'rejected'
  doctorNote?: string
}

const DATA_DIR = path.join(process.cwd(), 'data')
const DB_FILE = path.join(DATA_DIR, 'intake-sessions.json')

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([]), 'utf-8')
}

export function readAll(): StoredIntakeSession[] {
  ensureFile()
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')) as StoredIntakeSession[]
  } catch {
    return []
  }
}

export function readOne(sessionId: string): StoredIntakeSession | null {
  return readAll().find(s => s.sessionId === sessionId) ?? null
}

export function saveSession(session: StoredIntakeSession): void {
  ensureFile()
  const all = readAll()
  const idx = all.findIndex(s => s.sessionId === session.sessionId)
  if (idx >= 0) {
    all[idx] = session
  } else {
    all.unshift(session) // newest first
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(all, null, 2), 'utf-8')
}

export function updateSession(sessionId: string, patch: Partial<StoredIntakeSession>): StoredIntakeSession | null {
  const all = readAll()
  const idx = all.findIndex(s => s.sessionId === sessionId)
  if (idx < 0) return null
  all[idx] = { ...all[idx], ...patch }
  fs.writeFileSync(DB_FILE, JSON.stringify(all, null, 2), 'utf-8')
  return all[idx]
}
