/*
 *
 * BannerBroadcast
 *
 */

import { FC, memo, Fragment } from 'react'

import type { TMetric, TBannerBroadcastLayout, TColorName } from '@/spec'
import { ANCHOR } from '@/constant/dom'
import { BANNER_BROADCAST_LAYOUT } from '@/constant/layout'
import { buildLog } from '@/utils/logger'

import {
  Wrapper,
  InnerWrapper,
  Desc,
  LinkText,
  LinkBtn,
  Row,
  NotifyIcon,
  CrossIcon,
  ArrowIcon,
} from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:BannerBroadcast:index')

type TProps = {
  testid?: string
  metric: TMetric
  layout: TBannerBroadcastLayout
  bg: TColorName
}

const DETAIL_TEXT =
  'Groupher.com, 为中小产品团队提供社区反馈服务，如果你对此有兴趣，欢迎加 v(mydearxym) 详聊。'

const BannerBroadcast: FC<TProps> = ({ testid = 'banner-notify', metric, layout, bg }) => {
  return (
    <Wrapper testid={testid} bg={bg} id={ANCHOR.GLOBAL_HEADER_ID}>
      <InnerWrapper metric={metric} center={layout === BANNER_BROADCAST_LAYOUT.CENTER}>
        <Row>
          <NotifyIcon />
          <Desc>站点开发重构中，服务暂不可用。</Desc>
        </Row>

        <Row>
          {layout === BANNER_BROADCAST_LAYOUT.DEFAULT ? (
            <Fragment>
              <LinkBtn onClick={() => alert(DETAIL_TEXT)} bg={bg}>
                查看详情
              </LinkBtn>
              <CrossIcon />
            </Fragment>
          ) : (
            <Fragment>
              <LinkText onClick={() => alert(DETAIL_TEXT)}>查看详情</LinkText>
              <ArrowIcon />
            </Fragment>
          )}
        </Row>
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(BannerBroadcast)
