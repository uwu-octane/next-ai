'use client'

import React, { useState, useRef } from 'react'
import { Square, ArrowUp, Plus } from 'lucide-react'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingPopover,
  MorphingPopoverTrigger,
  MorphingPopoverContent,
} from '@/components/ui/morphing-popover'

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from '@/components/ui/prompt-input'
import { ChatButton } from '@/components/motionprimitivies/chatbutton'
import { Button } from '@/components/ui/button'
import { ActionDock } from './actiondocker'
import { testActions } from './testactions'

export function ChatPopoverLauncher() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleLaunch = () => {
    setOpen(!open)
    requestAnimationFrame(() => textareaRef.current?.focus())
  }

  const handleSubmit = () => {
    if (!input.trim()) return
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1500)
  }

  const fromTriggerVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: 8,
      filter: 'blur(6px)',
      transformOrigin: 'bottom right',
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transformOrigin: 'bottom right',
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 4,
      filter: 'blur(4px)',
      transformOrigin: 'bottom right',
    },
  } as const

  return (
    <div className="pointer-events-none fixed right-6 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] z-[60]">
      <MorphingPopover
        className="relative flex items-end justify-end"
        variants={fromTriggerVariants}
        transition={{ type: 'spring', bounce: 0.1, duration: 0.3 }}
        open={open}
        onOpenChange={(v) => {
          setOpen(v)
          if (v) requestAnimationFrame(() => textareaRef.current?.focus())
        }}
      >
        <MorphingPopoverTrigger asChild>
          <Magnetic>
            <ChatButton
              onClick={handleLaunch}
              aria-label="Chat with AI"
              className="pointer-events-auto"
            />
          </Magnetic>
        </MorphingPopoverTrigger>

        <MorphingPopoverContent
          //关键：让 Popover 完全覆盖按钮
          className="pointer-events-auto absolute right-0 bottom-0 z-[80]
                     w-[min(100vw,400px)] origin-bottom-right
                     bg-transparent border-none shadow-none p-0"
        >
          <ActionDock actions={testActions} />
          <div className="flex flex-col gap-3">
            <PromptInput
              value={input}
              onValueChange={setInput}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              maxHeight={200}
              className="w-full overflow-hidden flex flex-row 
              items-center gap-2 rounded-2xl p-0 pr-1"
            >
              <PromptInputTextarea
                placeholder="Ask me anything..."
                className="
                min-h-[20px] max-h-[200px] overflow-y-auto
                text-base leading-6 placeholder:text-zinc-400
                scrollbar-hidden text-xs
              " 
              />
              <PromptInputActions className="absolute bottom-2 right-2 p-0 m-0">
                <PromptInputAction
                  tooltip={isLoading ? 'Stop generation' : 'Send message'}
                >
                  <Button
                    variant="default"
                    size="icon"
                    className="h-5 w-5 rounded-full"
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <Square className="size-3 fill-current" />
                    ) : (
                      <ArrowUp className="size-3" />
                    )}
                  </Button>
                </PromptInputAction>
              </PromptInputActions>
            </PromptInput>
          </div>
        </MorphingPopoverContent>
      </MorphingPopover>
    </div>
  )
}