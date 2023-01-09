import { FC } from 'react'

import type { TColorName, TTag } from '@/spec'

import { Wrapper, TagWrapper, Name } from './styles/solid_tag_list'

type TProps = {
  tags: TTag[]
}

const SolidTagList: FC<TProps> = ({ tags }) => {
  return (
    <Wrapper>
      {tags.map((tag) => (
        <TagWrapper key={tag.raw} color={tag.color as TColorName}>
          <Name color={tag.color}>{tag.title}</Name>
        </TagWrapper>
      ))}
    </Wrapper>
  )
}

export default SolidTagList
