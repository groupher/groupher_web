import { FC, memo } from 'react'
import TimeAgo from 'timeago-react'

import type { TPost } from '@/spec'

import DotDivider from '@/widgets/DotDivider'

import { Wrapper } from '../../styles/quora_layout/mobile_view/header'

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      <div>{article?.author.nickname}</div>
      <DotDivider radius={2} space={8} />
      <TimeAgo datetime={article.insertedAt} locale="zh_CN" suppressHydrationWarning />
    </Wrapper>
  )
}

export default memo(Header)
