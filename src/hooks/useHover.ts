import { useEffect, useState, useRef, type MutableRefObject } from 'react'

// Hook
// T - could be any type of HTML element like: HTMLDivElement, HTMLParagraphElement and etc.
// hook returns tuple(array) with type [any, boolean]
function useHover<T>(): [MutableRefObject<T>, boolean] {
  const [value, setValue] = useState<boolean>(false)
  const ref: any = useRef<T | null>(null)
  const handleMouseOver = (): void => setValue(true)
  const handleMouseOut = (): void => setValue(false)

  useEffect(
    () => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const node: any = ref.current
      if (node) {
        if (node._hoverListenersAdded) {
          node.removeEventListener('mouseover', handleMouseOver)
          node.removeEventListener('mouseout', handleMouseOut)
        }

        node.addEventListener('mouseover', handleMouseOver)
        node.addEventListener('mouseout', handleMouseOut)

        node._hoverListenersAdded = true

        return () => {
          node.removeEventListener('mouseover', handleMouseOver)
          node.removeEventListener('mouseout', handleMouseOut)

          delete node._hoverListenersAdded
        }
      }
    },
    [ref.current], // Recall only if ref changes
  )
  return [ref, value]
}

export default useHover
