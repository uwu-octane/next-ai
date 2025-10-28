import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const raw = req.body
  let parsed: Record<string, unknown> | null = null
  
  try {
    parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
  } catch (e) {
    parsed = { __parseError: String(e) }
  }

  const headers: Record<string, string> = {}
  Object.entries(req.headers).forEach(([key, value]) => {
    if (value) {
      headers[key] = Array.isArray(value) ? value.join(', ') : value
    }
  })

  res.status(200).json({
    ok: true,
    path: req.url,
    method: req.method,
    headers,
    rawLen: raw ? JSON.stringify(raw).length : 0,
    parsed,
  })
}

