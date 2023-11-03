import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TColorName, TTag } from '@/spec'
import { cutRest } from '@/fmt'
import { Trans } from '@/i18n'
import { emptyTag } from '@/model'
import TagNode from '@/widgets/TagNode'

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
        <TagNode
          color={tag.color}
          dotSize={8}
          dotLeft={1}
          dotRight={10}
          dotTop={1}
          hashSize={11}
          hashRight={9}
          opacity={0.7}
          boldHash
        />
        <Title $active={active}>{cutRest(Trans(tag.title), 10)}</Title>
      </Tag>
      <Grow onClick={() => onSelect(tag)} />
      {active && (
        <CloseWrapper onClick={(e) => onSelect(emptyTag)}>
          <CloseIcon />
        </CloseWrapper>
      )}
    </Wrapper>
  )
}

export default observer(TagItem)
