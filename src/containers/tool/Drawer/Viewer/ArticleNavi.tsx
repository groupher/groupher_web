import useNaviArticle from '~/hooks/useNaviArticle'

import useLogic from '../useLogic'
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

export default () => {
  const articleNavi = useNaviArticle()
  const { naviToArticle } = useLogic()

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
