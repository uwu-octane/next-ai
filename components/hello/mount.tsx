import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import HelloFromNext from './HelloFromNext'

type Props = { msg?: string }

const roots = new WeakMap<Element, ReactDOM.Root>()

export function mount(el: Element, props?: Props) {
  let root = roots.get(el)
  if (!root) {
    root = ReactDOM.createRoot(el)
    roots.set(el, root)
  }
  root.render(<HelloFromNext {...props} />)
}

export function unmount(el: Element) {
  const root = roots.get(el)
  if (root) {
    root.unmount()
    roots.delete(el)
  }
}