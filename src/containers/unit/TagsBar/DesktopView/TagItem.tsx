import { FC } from 'react'

import type { TColorName, TTag } from '@/spec'
import { cutRest } from '@/fmt'
import { Trans } from '@/i18n'

import { emptyTag } from '@/model'

import {
  Wrapper,
  DotWrapper,
  HashIcon,
  Tag,
  Title,
  CloseWrapper,
  CloseIcon,
} from '../styles/desktop_view/tag_item'

type TProps = {
  tag: TTag
  active: boolean
  onSelect?: (tag?: TTag) => void
}

const TagItem: FC<TProps> = ({ tag, active, onSelect }) => {
  return (
    <Wrapper $active={active}>
      {tag.color && (
        <DotWrapper primaryColor={tag.color as TColorName} $active={active}>
          <HashIcon color={tag.color} $active={active} />
        </DotWrapper>
      )}
      <Tag
        $active={active}
        primaryColor={tag.color as TColorName}
        color={tag.color}
        onClick={() => onSelect(tag)}
      >
        <Title $active={active}>{cutRest(Trans(tag.title), 10)}</Title>
      </Tag>
      {active && (
        <CloseWrapper onClick={() => onSelect(emptyTag)}>
          <CloseIcon />
        </CloseWrapper>
      )}
    </Wrapper>
  )
}

export default TagItem
