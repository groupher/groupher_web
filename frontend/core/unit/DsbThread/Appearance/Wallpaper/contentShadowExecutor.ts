import type { ResultOf, VariablesOf } from '@graphql-typed-document-node/core'

import { browserGraphQLRequest } from '~/graphql/client'

import S from './schema'

export type TContentShadowSavePlan = {
  community: string
  enabled: boolean
}

/** Sends one ordinary Dashboard content-shadow field update. */
export const executeContentShadowUpdate = async (
  plan: TContentShadowSavePlan,
): Promise<
  NonNullable<ResultOf<typeof S.updateDashboardContentShadow>['updateDashboardContentShadow']>
> => {
  const result = await browserGraphQLRequest<
    ResultOf<typeof S.updateDashboardContentShadow>,
    VariablesOf<typeof S.updateDashboardContentShadow>
  >(S.updateDashboardContentShadow, {
    community: plan.community,
    enabled: plan.enabled,
  })

  if (!result.updateDashboardContentShadow) {
    throw new Error('DASHBOARD_CONTENT_SHADOW_UPDATE_EMPTY_RESPONSE')
  }

  return result.updateDashboardContentShadow
}
