'use client'

import { GATE_REQUIREMENT, type TGateAction, type TGateRequirement } from '@groupher/contracts/gate'
import { useCallback, useMemo } from 'react'

import type { TPassport } from '~/spec'
import useAccount from '~/stores/account/hooks'

export type TGateContext = {
  community?: string
  owner?: boolean
  thread?: string
}

const granted = (
  passport: TPassport | undefined,
  action: TGateAction,
  context: TGateContext,
): boolean => {
  if (!passport) return false
  if (passport.global?.god === true) return true

  const requirement: TGateRequirement = GATE_REQUIREMENT[action]
  if (requirement.ownerFallback === true && context.owner === true) return true

  const grant = requirement.grantByThread
    ? context.thread
      ? `${context.thread}.${requirement.grantByThread}`
      : undefined
    : requirement.grant
  if (!grant) return false

  if (requirement.scope === 'global') return passport.global?.[grant] === true
  if (requirement.scope !== 'context' || !context.community) return false

  const communityPassport = passport[context.community]
  if (!communityPassport || typeof communityPassport !== 'object') return false
  if ('root' in communityPassport && communityPassport.root === true) return true
  if (!('cms' in communityPassport)) return false

  return communityPassport.cms?.[grant] === true
}

/** Reads the current AccountStore Passport for early UI admission decisions. */
export default function useGate() {
  const { isLogin, user } = useAccount()
  const can = useCallback(
    (action: TGateAction, context: TGateContext = {}): boolean =>
      isLogin && granted(user?.passport, action, context),
    [isLogin, user?.passport],
  )

  return useMemo(() => ({ can, isLogin }), [can, isLogin])
}
