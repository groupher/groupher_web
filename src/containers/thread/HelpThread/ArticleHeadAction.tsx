import { FC } from 'react'

import { Wrapper, ShareIcon, ReportIcon } from './styles/article_head_action'

const ArticleHeadAction: FC = () => {
  return (
    <Wrapper>
      <ShareIcon />
      <ReportIcon />
    </Wrapper>
  )
}

export default ArticleHeadAction
