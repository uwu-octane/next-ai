import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  res.status(200).json({
    ok: true,
    service: process.env.NEXT_PUBLIC_SERVICE_NAME || 'next-ai',
    ts: Date.now(),
    auth: req.headers.authorization ? 'present' : 'absent',
  })
}

