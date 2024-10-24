'use client'

import { type FC, Fragment } from 'react'

import { ANCHOR } from '~/const/dom'
import { BROADCAST_LAYOUT } from '~/const/layout'
import useMetric from '~/hooks/useMetric'
import useBroadcast from '~/hooks/useBroadcast'

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

type TProps = {
  testid?: string
}

const DETAIL_TEXT =
  'Groupher.com, 为中小产品团队提供社区反馈服务，如果你对此有兴趣，欢迎加 v(mydearxym) 详聊。'

const Broadcast: FC<TProps> = ({ testid = 'banner-notify' }) => {
  const metric = useMetric()

  const { broadcastBg: bg, broadcastLayout: layout, broadcastEnable: enabled } = useBroadcast()

  if (!enabled) return null

  return (
    <Wrapper $testid={testid} bg={bg} id={ANCHOR.GLOBAL_HEADER_ID}>
      <InnerWrapper metric={metric} center={layout === BROADCAST_LAYOUT.CENTER}>
        <Row>
          <NotifyIcon />
          <Desc>站点开发重构中，服务暂不可用。</Desc>
        </Row>

        <Row>
          {layout === BROADCAST_LAYOUT.DEFAULT ? (
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

export default Broadcast
