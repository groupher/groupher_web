import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'

import useGate from '~/hooks/useGate'

import ReviewerShell from './ReviewerShell'

vi.mock('~/hooks/useGate')
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children }: { children: ReactNode }) => <a href='/review'>{children}</a>,
  Outlet: () => <div>review queue</div>,
}))
vi.mock('./LoginRequired', () => ({ default: () => <div>login required</div> }))

const mockedUseGate = vi.mocked(useGate)

describe('ReviewerShell', () => {
  it('requires login before rendering review tools', () => {
    mockedUseGate.mockReturnValue({ can: vi.fn(), isLogin: false })
    render(<ReviewerShell />)
    expect(screen.getByText('login required')).toBeTruthy()
  })

  it('denies a signed-in account without the review Passport', () => {
    mockedUseGate.mockReturnValue({ can: vi.fn(() => false), isLogin: true })
    render(<ReviewerShell />)
    expect(screen.getByText('Review access required')).toBeTruthy()
  })

  it('renders the review workspace for an admitted account', () => {
    mockedUseGate.mockReturnValue({ can: vi.fn(() => true), isLogin: true })
    render(<ReviewerShell />)
    expect(screen.getByText('review queue')).toBeTruthy()
  })
})
