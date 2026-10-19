import type { ReactNode } from 'react'

import useAccount from '~/stores/account/hooks'

import AuthRequired from './AuthRequired'
import RoutePending from './RoutePending'

/** Keeps every Dash surface behind the single AccountStore authentication result. */
export default function DashAccountBoundary({ children }: { children: ReactNode }) {
  const { isLogin, loading } = useAccount()

  if (loading) return <RoutePending />
  if (!isLogin) return <AuthRequired action='open the dashboard' />

  return children
}
