import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TTag } from '@/spec'
import { cutRest } from '@/fmt'
import { Trans } from '@/i18n'
import usePrimaryColor from '@/hooks/usePrimaryColor'

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
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper $active={active}>
      <File $active={active} color={tag.color} onClick={() => onSelect(tag)}>
        <Title $active={active} primaryColor={primaryColor}>
          {cutRest(Trans(tag.title), 10)}
        </Title>
      </File>
      {active && <Outline />}
      {active && <IndexDot primaryColor={primaryColor} />}
    </Wrapper>
  )
}

export default observer(FileItem)
