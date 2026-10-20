import type { FC } from 'react'

import Button from '~/ui/Buttons/Button'

type TProps = {
  isRetrying: boolean
  onRetry: () => void
}

/** Renders an accessible initial-page failure with an explicit recovery action. */
const PaginationError: FC<TProps> = ({ isRetrying, onRetry }) => (
  <div className='flex items-center justify-center gap-3 py-8' role='alert' aria-live='assertive'>
    <span>列表加载失败，请重试</span>
    <Button disabled={isRetrying} loading={isRetrying} onClick={onRetry} ariaLabel='重试列表加载'>
      重试
    </Button>
  </div>
)

export default PaginationError
