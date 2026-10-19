import { GATE_ACTION } from '@groupher/contracts/gate'
import { Link, Outlet } from '@tanstack/react-router'

import useGate from '~/hooks/useGate'

import LoginRequired from './LoginRequired'

export default function ReviewerShell() {
  const gate = useGate()

  if (!gate.isLogin) return <LoginRequired />
  if (!gate.can(GATE_ACTION.COMMUNITY_APPLICATION_REVIEW)) {
    return (
      <section className='apply-card'>
        <h1 className='apply-title'>Review access required</h1>
        <p className='apply-copy'>Your account does not have permission to review applications.</p>
      </section>
    )
  }

  return (
    <section>
      <div className='apply-actions' style={{ marginTop: 0 }}>
        <div>
          <h1 className='apply-title'>Application review</h1>
          <p className='apply-copy'>Global reviewer workspace</p>
        </div>
        <Link to='/review'>Queue</Link>
      </div>
      <Outlet />
    </section>
  )
}
