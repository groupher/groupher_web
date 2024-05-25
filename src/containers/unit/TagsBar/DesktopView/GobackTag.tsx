import type { FC } from 'react'

import type { TTag } from '@/spec'
import { emptyTag } from '@/model'
import { Wrapper, BackIcon, TagTitle } from '../styles/desktop_view/goback_tag'

type TProps = {
  onSelect?: (tag?: TTag) => void
}

const GobackTag: FC<TProps> = ({ onSelect }) => {
  return (
    <Wrapper onClick={() => onSelect(emptyTag)}>
      <BackIcon />
      <TagTitle>全部标签</TagTitle>
    </Wrapper>
  )
}

export default GobackTag
