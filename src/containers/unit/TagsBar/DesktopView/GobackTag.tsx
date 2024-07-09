import type { FC } from 'react'

import type { TTag } from '~/spec'
import { EMPTY_TAG } from '~/const/utils'
import { Wrapper, BackIcon, TagTitle } from '../styles/desktop_view/goback_tag'

type TProps = {
  onSelect?: (tag?: TTag) => void
}

const GobackTag: FC<TProps> = ({ onSelect }) => {
  return (
    <Wrapper onClick={() => onSelect(EMPTY_TAG)}>
      <BackIcon />
      <TagTitle>全部标签</TagTitle>
    </Wrapper>
  )
}

export default GobackTag
