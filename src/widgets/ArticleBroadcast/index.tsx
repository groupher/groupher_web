/*
 *
 * ArticleBroadcast
 *
 */

import { FC, memo } from 'react'

import type { TColorName, TSpace } from '@/spec'
import { COLOR_NAME } from '@/constant'

import { buildLog } from '@/utils/logger'
import { SpaceGrow } from '@/widgets/Common'

import {
  Wrapper,
  Content,
  BgWrapper,
  BgWrapper2,
  Title,
  Desc,
  LinkButton,
  LinkText,
  ArrowIcon,
} from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:ArticleBroadcast:index')

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
    <Wrapper testid={testid} color={color} {...restProps}>
      {!simple && <BgWrapper />}
      {!simple && <BgWrapper2 />}
      <Content>
        <Title color={color}>文章页脚广播</Title>
        <Desc>由社区管理员设置，在每篇帖子下面显示，后期可提供更详细的显示设置,</Desc>
      </Content>
      <SpaceGrow />
      <LinkButton size="small" space={18} color={color}>
        <LinkText color={color}>详情</LinkText> <ArrowIcon color={color} />
      </LinkButton>
    </Wrapper>
  )
}

export default memo(ArticleBroadcast)
