// src/features/chat/ChatWidget.tsx
'use client'
import React, { useEffect, useMemo, useState } from 'react'
import type { AiMountProps } from './types'
import { ChatButton } from '@/components/motionprimitivies/chatbutton'
import { Magnetic } from '@/components/motionprimitivies/magnetic'
import { MessageCircle } from 'lucide-react'

export function ChatWidget(props: AiMountProps) {
  const { user, ui, initialMessages, telemetry, events } = props
  const [count, setCount] = useState(0)

  const height = useMemo(() => {
    if (typeof ui?.height === 'number') return `${ui.height}px`
    return ui?.height || '60vh'
  }, [ui?.height])

  useEffect(() => {
    // 调试：首次挂载日志
    // eslint-disable-next-line no-console
    console.log('[ChatWidget] mounted with props:', props)
  }, [])

  return (
    <div
      style={{
        height,
        border: ui?.borderless ? 'none' : '1px solid #e5e7eb',
        borderRadius: 8,
        padding: 12,
        overflow: 'auto',
        background: ui?.theme === 'dark' ? '#0b0b0c' : '#fff',
        color: ui?.theme === 'dark' ? '#f3f4f6' : '#111827',
      }}
    >
      <div style={{ opacity: 0.6, fontSize: 12, marginBottom: 8 }}>
        AI Chat（占位）— 后续接入 AI SDK UI；sessionId: {telemetry?.sessionId || '-'}
      </div>

      <div style={{ marginBottom: 8 }}>
        当前用户：{user?.name || user?.id || '匿名'}
      </div>
      {initialMessages?.length ? (
        <div style={{ marginBottom: 8 }}>
          初始消息：
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(initialMessages, null, 2)}
          </pre>
        </div>
      ) : null}

<Magnetic>
<div className="flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
      <button
        type="button"
        // 暗亮模式通用样式
        className="inline-flex size-14 items-center justify-center rounded-full border border-zinc-200 bg-zinc-950 text-zinc-50 shadow-md transition-all duration-300 hover:scale-105 hover:bg-zinc-800 active:scale-95 dark:border-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        onClick={() => {
          /* 后续接入 open chat 逻辑 */
        }}
      >
        <MessageCircle className="size-5" />
      </button>
      </div>
    </Magnetic>

      <button
        onClick={() => events?.onOpenRoute?.('/somewhere')}
        style={{
          padding: '6px 12px',
          borderRadius: 6,
          border: '1px solid #2563eb',
          background: '#2563eb',
          color: '#fff',
          marginLeft: 8,
          cursor: 'pointer',
        }}
      >
        触发 onOpenRoute(&apos;/somewhere&apos;)
      </button>
    </div>
  )
}