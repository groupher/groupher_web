import { FC, memo } from 'react'

import { buildLog } from '@/utils/logger'

import type { TArticleNavi } from '../spec'

import {
  Wrapper,
  LeftSwitchBlock,
  LeftArrow,
  RightSwitchBlock,
  RightArrow,
  IndexWrapper,
  LeftIndexWrapper,
  RightIndexWrapper,
} from '../styles/add_on/article_navi'

import { naviToArticle } from '../logic'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = buildLog('C:ArticleNavi')

type TProps = {
  articleNavi?: TArticleNavi
  // show?: boolean
}

const ArticleNavi: FC<TProps> = ({ articleNavi }) => {
  return (
    <Wrapper>
      {articleNavi?.previous && (
        <LeftSwitchBlock onClick={() => naviToArticle(articleNavi.previous)}>
          <LeftArrow />
          <IndexWrapper>
            <LeftIndexWrapper>上一篇</LeftIndexWrapper>
          </IndexWrapper>
        </LeftSwitchBlock>
      )}
      {articleNavi?.next && (
        <RightSwitchBlock onClick={() => naviToArticle(articleNavi.next)}>
          <RightArrow />
          <IndexWrapper>
            <RightIndexWrapper>下一篇</RightIndexWrapper>
          </IndexWrapper>
        </RightSwitchBlock>
      )}
    </Wrapper>
  )
}

export default memo(ArticleNavi)
