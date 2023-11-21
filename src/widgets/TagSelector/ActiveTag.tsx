import { FC } from 'react'

import type { TTag } from '@/spec'
import TagNode from '@/widgets/TagNode'

import { Wrapper, TagItem, TagTitle } from './styles/active_tag'

type TProps = {
  activeTag: TTag
  mode: 'mobile' | 'modeline' | 'default'
}

const ActiveTag: FC<TProps> = ({ activeTag, mode }) => {
  return (
    <Wrapper>
      {activeTag?.id ? (
        <TagItem>
          <TagNode
            color={activeTag.color}
            dotSize={8}
            dotLeft={1}
            dotRight={7}
            hashSize={12}
            hashRight={4}
            opacity={0.7}
            boldHash
          />
          <TagTitle>{activeTag.title}</TagTitle>
        </TagItem>
      ) : (
        <>{mode === 'default' ? '未设置' : '标签'}</>
      )}
    </Wrapper>
  )
}

export default ActiveTag
