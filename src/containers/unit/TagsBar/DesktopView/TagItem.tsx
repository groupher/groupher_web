import type { FC } from 'react'

import type { TColorName, TTag } from '~/spec'
import { cutRest } from '~/fmt'
import { Trans } from '~/i18n'
import { EMPTY_TAG } from '~/const/utils'
import TagNode from '~/widgets/TagNode'

import { Wrapper, Tag, Grow, Title, CloseWrapper, CloseIcon } from '../styles/desktop_view/tag_item'

type TProps = {
  tag: TTag
  active: boolean
  onSelect?: (tag?: TTag) => void
}

const TagItem: FC<TProps> = ({ tag, active, onSelect }) => {
  return (
    <Wrapper $active={active}>
      <Tag $active={active} $color={tag.color as TColorName} onClick={() => onSelect(tag)}>
        <TagNode color={tag.color as TColorName} boldHash />
        <Title $active={active}>{cutRest(Trans(tag.title), 10)}</Title>
      </Tag>
      <Grow onClick={() => onSelect(tag)} />
      {active && (
        <CloseWrapper onClick={(e) => onSelect(EMPTY_TAG)}>
          <CloseIcon />
        </CloseWrapper>
      )}
    </Wrapper>
  )
}

export default TagItem
