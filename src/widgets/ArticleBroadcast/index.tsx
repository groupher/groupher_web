/*
 *
 * ArticleBroadcast
 *
 */

import { type FC, memo } from 'react'

import type { TColorName, TSpace } from '~/spec'
import { COLOR_NAME } from '~/const'

import {
  Wrapper,
  Content,
  BgWrapper,
  BgWrapper2,
  Title,
  Desc,
  LinkButton,
  NotifyIcon,
} from './styles'

type TProps = {
  testid?: string
  color?: TColorName
  simple?: boolean
} & TSpace

const ArticleBroadcast: FC<TProps> = ({
  testid = 'article-broadcast',
  color = COLOR_NAME.PURPLE,
  simple = false,
  ...restProps
}) => {
  return (
    <Wrapper $testid={testid} color={color} {...restProps}>
      {!simple && <BgWrapper />}
      {!simple && <BgWrapper2 />}
      {!simple && <NotifyIcon color={color} />}

      <Content>
        <Title color={color}>文章页脚广播</Title>
        <Desc>由社区管理员设置，在每篇帖子下面显示，后期可提供更详细的显示设置,</Desc>
      </Content>
      <div className="grow" />

      <LinkButton color={color} fontSize={12}>
        详情
      </LinkButton>
    </Wrapper>
  )
}

export default memo(ArticleBroadcast)
