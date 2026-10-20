import type { FC } from 'react'

import Button from '~/ui/Buttons/Button'

type TProps = {
  hasNextPage: boolean
  isLoading: boolean
  error?: Error | null
  onLoadMore: () => void
  onRetry?: () => void
}

/** Renders the bounded forward-cursor action without exposing cursor values to the UI. */
const LoadMore: FC<TProps> = ({ hasNextPage, isLoading, error = null, onLoadMore, onRetry }) => {
  if (!hasNextPage && !isLoading && !error) return null

  return (
    <div className='flex flex-col items-center justify-center gap-3 py-6' aria-live='polite'>
      {error && <p role='alert'>下一页加载失败，请重试</p>}
      <Button
        disabled={!hasNextPage && !error}
        loading={isLoading}
        onClick={error ? (onRetry ?? onLoadMore) : onLoadMore}
        ariaLabel={error ? '重试下一页加载' : '加载更多'}
      >
        {error ? '重试' : '加载更多'}
      </Button>
    </div>
  )
}

export default LoadMore
