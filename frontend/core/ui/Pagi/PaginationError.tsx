import type { FC } from 'react'

import useSalon from './salon'

type TProps = {
  isRetrying: boolean
  onRetry: () => void
}

/** Renders an accessible initial-page failure with an explicit recovery action. */
const PaginationError: FC<TProps> = ({ isRetrying, onRetry }) => {
  const s = useSalon({})
  return (
    <div className='flex items-center justify-center gap-3 py-8' role='alert' aria-live='assertive'>
      <span>列表加载失败，请重试</span>
      <button
        type='button'
        className={s.action}
        disabled={isRetrying}
        aria-busy={isRetrying}
        onClick={onRetry}
        aria-label='重试列表加载'
      >
        重试
      </button>
    </div>
  )
}

export default PaginationError
