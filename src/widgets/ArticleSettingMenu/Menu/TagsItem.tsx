import { FC } from 'react'
import { observer } from 'mobx-react'
import { isEmpty } from 'ramda'

import type { TTag } from '@/spec'
import { toJS } from '@/mobx'
import useViewingArticle from '@/hooks/useViewingArticle'

import { SpaceGrow } from '@/widgets/Common'
import TagNode from '@/widgets/TagNode'

import { Icon } from '../styles/icon'
import { MenuItem, TagTitle, TagCount } from '../styles/menu/tags_item'

type TProps = {
  onClick: () => void
}

const TagsItem: FC<TProps> = ({ onClick }) => {
  const { article } = useViewingArticle()
  const tags = toJS(article.articleTags) as TTag[]

  if (!isEmpty(tags)) {
    const tag = tags[0]

    return (
      <MenuItem onClick={onClick}>
        <TagNode
          opacity={0.5}
          dotRight={8}
          dotLeft={2}
          dotTop={1}
          hashLeft={-1}
          hashRight={6}
          color={tag.color}
        />
        <TagTitle>{tag.title}</TagTitle>
        {tags.length > 1 && <TagCount>({tags.length})</TagCount>}
        <SpaceGrow />
        <Icon.Arrow />
      </MenuItem>
    )
  }

  return (
    <MenuItem onClick={onClick}>
      <TagNode opacity={0.5} dotRight={8} dotLeft={2} dotTop={1} hashLeft={-1} hashRight={6} />
      标签
      <SpaceGrow />
      <Icon.Arrow />
    </MenuItem>
  )
}

export default observer(TagsItem)
