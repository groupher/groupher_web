import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TColorName, TTag } from '@/spec'
import { cutRest } from '@/fmt'
import { Trans } from '@/i18n'
import useTagLayout from '@/hooks/useTagLayout'
import { TAG_LAYOUT } from '@/constant/layout'

import { emptyTag } from '@/model'

import {
  Wrapper,
  DotWrapper,
  HashIcon,
  DotSign,
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
  const tagLayout = useTagLayout()

  return (
    <Wrapper $active={active}>
      <DotWrapper primaryColor={tag.color as TColorName} $active={active}>
        {tagLayout === TAG_LAYOUT.HASH ? (
          <HashIcon color={tag.color} $active={active} />
        ) : (
          <DotSign color={tag.color} $active={active} />
        )}
      </DotWrapper>

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

export default observer(TagItem)
