/*
 *
 * DashboardDesc
 *
 */

import { FC, memo } from 'react'

import type { TDashboardLayout, TPostLayout } from '@/spec'
import { DASHBOARD_DESC_LAYOUT } from '@/constant/layout'

import { buildLog } from '@/utils/logger'
import PostLayoutxample from './PostLayoutExample'

import { Wrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:DashboardDesc:index')

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
    <Wrapper testid={testid}>
      {layout === DASHBOARD_DESC_LAYOUT.POST_LIST && (
        <PostLayoutxample activePostLayout={activeSettings.postLayout} />
      )}
    </Wrapper>
  )
}

export default memo(DashboardDesc)
