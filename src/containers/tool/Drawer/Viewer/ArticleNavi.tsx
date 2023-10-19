import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import type { TArticleNavi } from '../spec'

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

export default memo(ArticleNavi)
