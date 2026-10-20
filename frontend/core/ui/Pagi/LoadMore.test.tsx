import { fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

vi.mock('~/ui/Buttons/Button', () => ({
  default: ({
    ariaLabel,
    children,
    disabled,
    onClick,
  }: {
    ariaLabel?: string
    children?: ReactNode
    disabled?: boolean
    onClick?: () => void
  }) => (
    <button aria-label={ariaLabel} disabled={disabled} onClick={onClick} type='button'>
      {children}
    </button>
  ),
}))

import LoadMore from './LoadMore'

describe('LoadMore', () => {
  it('exposes an accessible retry action for a failed next page', () => {
    const retryNextPage = vi.fn()

    render(
      <LoadMore
        hasNextPage
        isLoading={false}
        error={new Error('next page failed')}
        onLoadMore={vi.fn()}
        onRetry={retryNextPage}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('下一页加载失败，请重试')

    fireEvent.click(screen.getByRole('button', { name: '重试下一页加载' }))

    expect(retryNextPage).toHaveBeenCalledTimes(1)
  })
})
