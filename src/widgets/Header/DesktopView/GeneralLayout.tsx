/*
 *
 * Header
 *
 */

import { FC, memo } from 'react'
import { includes } from 'ramda'
import dynamic from 'next/dynamic'

import type { TMetric } from '@/spec'
import METRIC from '@/constant/metric'
import { buildLog } from '@/logger'

import Navigator from '@/widgets/Navigator'

import type { TProps } from '..'
import { Wrapper, InnerWrapper, RouterWrapper } from '../styles/desktop_view/general_layout'

/* eslint-disable-next-line */
const log = buildLog('C:Header')

// let MailBox
const AddOns = dynamic(() => import('../AddOns'), { ssr: false })

const hasNoBorder = (metric: TMetric): boolean =>
  includes(metric, [
    METRIC.EXPLORE,
    METRIC.SPONSOR,
    METRIC.SUPPORT_US,
    METRIC.SUBSCRIBE,
    METRIC.ARTICLE,
    METRIC.MEMBERSHIP,
    METRIC.USER,
    METRIC.COMMUNITY_EDITOR,
    METRIC.HELP_CENTER,
  ])

const GeneralHeader: FC<TProps> = ({ metric, accountInfo }) => {
  return (
    <Wrapper id="whereCallShowDoraemon" testid="header" noBorder={hasNoBorder(metric)}>
      <InnerWrapper metric={metric}>
        <RouterWrapper>
          <Navigator metric={metric} />
        </RouterWrapper>
        {/* @ts-ignore */}
        <AddOns accountInfo={accountInfo} />
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(GeneralHeader)
