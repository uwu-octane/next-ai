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
import { Button } from '@/components/ui/buttonv1'
import { ActionDock } from './actiondocker'
import { testActions } from './testactions'
import { ChatContainer } from './chatbox'
import { ChatMessage } from './chatbox'
import { Spotlight } from '@/components/ui/spotlight'
export function ChatPopoverLauncher() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
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

  const handleNewChat = () => {
    setMessages([])
    setInput('')
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
          <ChatButton
            onClick={handleLaunch}
            aria-label="Chat with AI"
            className={`pointer-events-auto${open ? ' opacity-0 pointer-events-none' : ''}`}
          />
        </MorphingPopoverTrigger>

        <MorphingPopoverContent
          //关键：让 Popover 完全覆盖按钮
          className="pointer-events-auto absolute right-0 bottom-0 z-[80]
                     w-[min(100vw,400px)] origin-bottom-right
                     bg-transparent border-none shadow-none p-0"
          closeOnInteractOutside={false}
          closeOnEscape={false}
        >
          <div className="flex flex-col items-center gap-3 w-full">
            <ChatContainer
              items={[]}
              activeItemId={''}
              onSelect={() => {}}
              onNew={() => {}}
              messages={messages}
              onNewChat={handleNewChat}
              onToggleSidebar={() => {}}
              onClose={() => setOpen(false)}
              children={
                <>
                  <ActionDock actions={testActions} />
                  <div className="w-full">
                    <Spotlight
                      className="from-blue-600 via-blue-500 to-blue-400 blur-2xl dark:from-blue-200 dark:via-blue-300 dark:to-blue-400"
                      size={140}
                    />
                    <PromptInput
                      value={input}
                      onValueChange={setInput}
                      isLoading={isLoading}
                      onSubmit={handleSubmit}
                      maxHeight={200}
                      className="w-full overflow-hidden flex flex-row 
              items-center gap-2 rounded-2xl p-0 pr-1 bg-transparent"
                    >
                      <Spotlight
                        className="bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_98%)] from-blue-500 via-blue-400 to-blue-300 blur-[120px] opacity-100 mix-blend-screen dark:from-blue-200 dark:via-blue-300 dark:to-blue-400"
                        size={800}
                      />
                      <PromptInputTextarea
                        placeholder="Ask me anything..."
                        className="relative z-10
                min-h-[20px] max-h-[200px] overflow-y-auto
                text-base leading-6 placeholder:text-zinc-400
                scrollbar-hidden text-xs
              "
                      />
                      <PromptInputActions className="bottom-2 right-2 p-0 m-0">
                        <PromptInputAction tooltip={isLoading ? 'Stop generation' : 'Send message'}>
                          <Magnetic>
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
                          </Magnetic>
                        </PromptInputAction>
                      </PromptInputActions>
                    </PromptInput>
                  </div>
                </>
              }
            />
          </div>
        </MorphingPopoverContent>
      </MorphingPopover>
    </div>
  )
}
