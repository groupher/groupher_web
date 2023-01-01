import { FC } from 'react'

import type { TTag } from '@/spec'
import { cutRest } from '@/utils/fmt'
import { Trans } from '@/utils/i18n'

import Outline from './Outline'
// import DotDivider from '@/widgets/DotDivider'
// import TagCount from './TagCount'

import { Wrapper, File, Title, IndexDot } from './styles/file_item'

type TProps = {
  tag: TTag
  active: boolean
  onSelect?: (tag?: TTag) => void
}

const FileItem: FC<TProps> = ({ tag, active, onSelect }) => {
  return (
    <Wrapper $active={active}>
      <File $active={active} color={tag.color} onClick={() => onSelect(tag)}>
        <Title $active={active}>{cutRest(Trans(tag.title), 10)}</Title>
      </File>
      {active && <Outline />}
      {active && <IndexDot />}
    </Wrapper>
  )
}

export default FileItem
