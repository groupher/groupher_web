/*
 *
 * DashboardDesc
 *
 */

import { type FC, memo } from 'react'

import type { TDashboardLayout, TPostLayout } from '~/spec'
import { DASHBOARD_DESC_LAYOUT } from '~/const/layout'

import PostLayoutxample from './PostLayoutExample'

import { Wrapper } from './styles'

type TProps = {
  testid?: string
  layout?: TDashboardLayout
  activeSettings: {
    postLayout: TPostLayout
  }
}

const DashboardDesc: FC<TProps> = ({
  testid = 'dashboard-desc',
  layout = DASHBOARD_DESC_LAYOUT.POST_LIST,
  activeSettings,
}) => {
  return (
    <Wrapper $testid={testid}>
      {layout === DASHBOARD_DESC_LAYOUT.POST_LIST && (
        <PostLayoutxample activePostLayout={activeSettings.postLayout} />
      )}
    </Wrapper>
  )
}

export default memo(DashboardDesc)
