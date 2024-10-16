import { type FC, memo } from 'react'

import type { TArticle } from '~/spec'

import { PLATFORMS } from '../constant'
import {
  Wrapper,
  Header,
  Hint,
  Article,
  InnerWrapper,
  Media,
  LogoWrapper,
  Title,
  Icon,
} from '../styles/modal_panel/platform'

type TProps = {
  article: TArticle
  changeType: (type: string) => void
}

const Platforms: FC<TProps> = ({ article, changeType }) => {
  return (
    <Wrapper>
      <Header>
        <Hint>分享</Hint>
        <Article>{article.title}</Article>
        <Hint>到:</Hint>
      </Header>
      <InnerWrapper>
        {PLATFORMS.map((item) => {
          const CurIcon = Icon[item.type]

          return (
            <Media key={item.title} onClick={() => changeType(item.type)}>
              <LogoWrapper>
                <CurIcon />
              </LogoWrapper>
              <Title>{item.title}</Title>
            </Media>
          )
        })}
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(Platforms)
