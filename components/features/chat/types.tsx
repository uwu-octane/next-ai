// src/features/chat/types.ts
export interface AiUser {
    id: string
    name?: string
    avatar?: string
  }
  
  export interface AiUiOptions {
    height?: number | string
    theme?: 'auto' | 'light' | 'dark'
    borderless?: boolean
  }
  
  export interface AiEvents {
    onReady?: () => void
    onError?: (err: { message: string }) => void
    onOpenRoute?: (path: string) => void
  }
  
  export interface AiMountProps {
    apiBase: string
    headers?: Record<string, string>
    user?: AiUser
    initialMessages?: Array<{ role: 'system'|'user'|'assistant'|'tool'; content: string }>
    ui?: AiUiOptions
    events?: AiEvents
    telemetry?: { traceId?: string; sessionId?: string }
  }