// src/features/chat/mount.tsx
'use client'
import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { ChatWidget } from './ChatWidget'
import type { AiMountProps } from './types'

let root: Root | null = null

export function mount(el: Element, props?: AiMountProps) {
  if (!el) throw new Error('mount target element not found')
  root = createRoot(el)
  root.render(<ChatWidget {...(props || {apiBase: ''})} />)
  props?.events?.onReady?.()
}

export function unmount() {
  if (root) {
    root.unmount()
    root = null
  }
}