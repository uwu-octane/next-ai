// pages/api/nextapi/ai/chat/route.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type Msg = { role: string; content: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = req.body as { messages?: Msg[] }
    const last = body?.messages?.at(-1)?.content ?? ''

    res.status(200).json({
      id: crypto.randomUUID(),
      model: 'mock-llm',
      created: Date.now(),
      choices: [
        {
          index: 0,
          message: { role: 'assistant', content: `你说的是：${last}（mock）` },
        },
      ],
    })
  } catch (e) {
    res.status(400).json({ message: (e as Error).message ?? 'bad request' })
  }
}

