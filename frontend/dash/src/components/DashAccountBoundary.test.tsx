import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'

import useAccount from '~/stores/account/hooks'

import DashAccountBoundary from './DashAccountBoundary'

vi.mock('~/stores/account/hooks')
vi.mock('./AuthRequired', () => ({ default: () => <div>sign-in</div> }))
vi.mock('./RoutePending', () => ({ default: () => <div>pending</div> }))

const mockedUseAccount = vi.mocked(useAccount)
const renderBoundary = (children: ReactNode = <div>dashboard</div>) =>
  render(<DashAccountBoundary>{children}</DashAccountBoundary>)

describe('DashAccountBoundary', () => {
  it('waits for AccountStore recovery', () => {
    mockedUseAccount.mockReturnValue({ loading: true, isLogin: false } as never)
    renderBoundary()
    expect(screen.getByText('pending')).toBeTruthy()
  })

  it('owns the anonymous sign-in state for all Dash routes', () => {
    mockedUseAccount.mockReturnValue({ loading: false, isLogin: false } as never)
    renderBoundary()
    expect(screen.getByText('sign-in')).toBeTruthy()
  })

  it('renders Dash only for the resolved account', () => {
    mockedUseAccount.mockReturnValue({ loading: false, isLogin: true } as never)
    renderBoundary()
    expect(screen.getByText('dashboard')).toBeTruthy()
  })
})
