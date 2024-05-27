import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useNaviArticle from '@/hooks/useNaviArticle'

import {
  Wrapper,
  UpSwitchBlock,
  UpArrow,
  DownSwitchBlock,
  DownArrow,
  IndexWrapper,
  UpIndexWrapper,
  DownIndexWrapper,
} from '../styles/article_navi'

import { naviToArticle } from '../logic'

const ArticleNavi: FC = () => {
  const articleNavi = useNaviArticle()

  return (
    <Wrapper>
      {articleNavi?.previous && (
        <UpSwitchBlock onClick={() => naviToArticle(articleNavi.previous)}>
          <UpArrow />
          <IndexWrapper>
            <UpIndexWrapper>上一篇</UpIndexWrapper>
          </IndexWrapper>
        </UpSwitchBlock>
      )}
      {articleNavi?.next && (
        <DownSwitchBlock onClick={() => naviToArticle(articleNavi.next)}>
          <DownArrow />
          <IndexWrapper>
            <DownIndexWrapper>下一篇</DownIndexWrapper>
          </IndexWrapper>
        </DownSwitchBlock>
      )}
    </Wrapper>
  )
}

export default observer(ArticleNavi)
