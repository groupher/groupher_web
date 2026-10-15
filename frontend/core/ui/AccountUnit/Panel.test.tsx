import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import Panel from './Panel'

const pageLockMocks = vi.hoisted(() => ({
  lockPage: vi.fn(),
  unlockPage: vi.fn(),
}))

vi.mock('~/dom', () => pageLockMocks)
vi.mock('~/hooks/useTrans', () => ({ default: () => ({ t: (key: string) => key }) }))
vi.mock('~/icons/CloseLight', () => ({ default: () => null }))
vi.mock('~/oauth', () => ({ signIn: vi.fn() }))
vi.mock('~/platform', () => ({ Link: () => null }))
vi.mock('./constant', () => ({ OAUTH_PROVIDERS: ['github'] }))
vi.mock('./Loading', () => ({ default: () => null, LoadingMask: () => null }))
vi.mock('./salon/panel', () => ({
  SocialIcon: { Github: () => null },
  default: () => ({
    wrapper: '',
    header: '',
    body: '',
    socialItem: '',
    iconBox: '',
    icon: '',
    footer: '',
    link: '',
  }),
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('AccountUnit Panel', () => {
  it('uses native dialog semantics while visible', () => {
    render(<Panel show onClose={vi.fn()} />)

    expect(screen.getByRole('dialog', { name: 'Sign in' })).toBeInTheDocument()
    expect(pageLockMocks.lockPage).toHaveBeenCalledOnce()
  })

  it('closes through the native dialog cancel event', () => {
    const onClose = vi.fn()
    render(<Panel show onClose={onClose} />)

    fireEvent(
      screen.getByRole('dialog', { name: 'Sign in' }),
      new Event('cancel', { bubbles: false, cancelable: true }),
    )

    expect(onClose).toHaveBeenCalledOnce()
    expect(pageLockMocks.unlockPage).toHaveBeenCalledOnce()
  })
})
