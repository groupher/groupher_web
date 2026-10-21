import type { FC } from 'react'

import useSalon from './salon'

type TProps = {
  hasNextPage: boolean
  isLoading: boolean
  error?: Error | null
  onLoadMore: () => void
  onRetry?: () => void
}

/** Renders the bounded forward-cursor action without exposing cursor values to the UI. */
const LoadMore: FC<TProps> = ({ hasNextPage, isLoading, error = null, onLoadMore, onRetry }) => {
  const s = useSalon({})

  if (!hasNextPage && !isLoading && !error) return null

  return (
    <div className='flex flex-col items-center justify-center gap-3 py-6' aria-live='polite'>
      {error && <p role='alert'>下一页加载失败，请重试</p>}
      <button
        type='button'
        className={s.action}
        disabled={isLoading || (!hasNextPage && !error)}
        aria-busy={isLoading}
        onClick={error ? (onRetry ?? onLoadMore) : onLoadMore}
        aria-label={error ? '重试下一页加载' : '加载更多'}
      >
        {isLoading ? '加载中...' : error ? '重试' : '加载更多'}
      </button>
    </div>
  )
}

export default LoadMore
