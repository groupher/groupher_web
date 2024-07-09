import type { FC } from 'react'

import { Wrapper, ShareIcon, ReportIcon } from '../styles/article_layout/head_action'

const HeadAction: FC = () => {
  return (
    <Wrapper>
      <ShareIcon />
      <ReportIcon />
    </Wrapper>
  )
}

export default HeadAction
