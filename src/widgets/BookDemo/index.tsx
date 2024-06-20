/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-no-comment-textnodes */
/*
 *
 * BookDemo
 *
 */

import { useState } from 'react'

import HomeHeader from '@/widgets/HomeHeader'
import Button from '@/widgets/Buttons/Button'

import { Wrapper, Content, Thanks, Title, Bold, P } from './styles'

export default () => {
  const [showV, setShowV] = useState(false)

  return (
    <Wrapper>
      <HomeHeader />
      <Content>
        <Thanks>🙏</Thanks>
        <Title>萍水相逢，感谢关注</Title>
        <P>如果你的团队还想进一步了解 Groupher 以确定它是否能满足需求，我们很乐意提供帮助！</P>
        <P>我们会在约定时间以线上会议的形式提供使用前的各种咨询。</P>
        <P>
          {showV && (
            <>
              请添加微信：<Bold>mydearxym</Bold>{' '}
            </>
          )}
          {!showV && (
            <Button ghost onClick={() => setShowV(true)}>
              预约演示
            </Button>
          )}
        </P>
      </Content>
    </Wrapper>
  )
}
