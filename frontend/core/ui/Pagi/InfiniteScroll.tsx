import { type ComponentProps, useEffect, useEffectEvent, useRef, useSyncExternalStore } from 'react'

import LoadMore from './LoadMore'

const subscribe = () => () => undefined
const observerAvailable = () => typeof IntersectionObserver !== 'undefined'
const serverObserverAvailable = () => true

/** Observes the list tail; errors pause automatic loading until an explicit retry. */
export default function InfiniteScroll(props: ComponentProps<typeof LoadMore>) {
  const { hasNextPage, isLoading, error } = props
  const sentinel = useRef<HTMLDivElement>(null)
  const observerSupported = useSyncExternalStore(
    subscribe,
    observerAvailable,
    serverObserverAvailable,
  )
  const loadNext = useEffectEvent(props.onLoadMore)

  useEffect(() => {
    if (!hasNextPage || isLoading || error || !sentinel.current) return
    if (!observerSupported || typeof IntersectionObserver === 'undefined') return
    let requested = false
    let active = true
    const observer = new IntersectionObserver(
      (entries) => {
        if (!active || requested || !entries.some((entry) => entry.isIntersecting)) return
        requested = true
        loadNext()
      },
      { rootMargin: '200px' },
    )
    observer.observe(sentinel.current)
    return () => {
      active = false
      observer.disconnect()
    }
  }, [hasNextPage, isLoading, error, observerSupported])

  if (error) return <LoadMore {...props} />
  if (!hasNextPage && !isLoading) return null

  return (
    <>
      <div ref={sentinel} aria-hidden='true' className='h-px' />
      {!observerSupported && <LoadMore {...props} />}
      {isLoading && <p role='status'>加载中...</p>}
    </>
  )
}
