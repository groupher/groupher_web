import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TColorName, TTag } from '@/spec'
import { cutRest } from '@/fmt'
import { Trans } from '@/i18n'
import { emptyTag } from '@/model'
import { TAG_LAYOUT } from '@/constant/layout'

import useTagLayout from '@/hooks/useTagLayout'
import TagNode from '@/widgets/TagNode'

import {
  Wrapper,
  DotWrapper,
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
      <DotWrapper
        $color={tag.color as TColorName}
        $active={active}
        $round={tagLayout === TAG_LAYOUT.DOT}
      >
        <TagNode
          color={tag.color}
          dotSize={8}
          hashSize={12}
          dotLeft={5}
          hashLeft={2}
          hashRight={3}
          opacity={0.8}
        />
      </DotWrapper>

      <Tag $active={active} $color={tag.color as TColorName} onClick={() => onSelect(tag)}>
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
