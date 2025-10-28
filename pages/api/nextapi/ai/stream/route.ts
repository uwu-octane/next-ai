import type { NextApiRequest, NextApiResponse } from 'next'

type Msg = { role: string; content: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body as { messages?: Msg[] }
  const last = body?.messages?.at(-1)?.content ?? ''

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')

  const chunks = [`你说的是：${last}`, ' 这是', ' 流式', ' mock', ' ✅']
  
  let i = 0
  const timer = setInterval(() => {
    if (i >= chunks.length) {
      res.write('event: done\ndata: {}\n\n')
      clearInterval(timer)
      res.end()
      return
    }
    res.write(`data: ${JSON.stringify({ delta: chunks[i++] })}\n\n`)
  }, 150)
}

