import { FC, memo, Fragment } from 'react'

import type { TPost } from '@/spec'

import DotDivider from '@/widgets/DotDivider'
import ArticleCatState from '@/widgets/ArticleCatState'
import TagsList from '@/widgets/TagsList'

import { Wrapper, PublishWrapper, EditedHint } from '../styles/post_viewer/header'

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
  const { meta, cat, state, articleTags } = article

  return (
    <Wrapper>
      <ArticleCatState cat={cat} state={state} smaller={false} right={14} />
      <TagsList items={articleTags} size="small" />
      <PublishWrapper>
        {meta.isEdited && (
          <Fragment>
            <DotDivider space={8} />
            <EditedHint>修改过</EditedHint>
          </Fragment>
        )}
      </PublishWrapper>
    </Wrapper>
  )
}

export default memo(Header)
