import { FC } from 'react'

import type { TTag } from '@/spec'

import { Wrapper, TagItem, DotSign, TagTitle } from './styles/active_tag'

type TProps = {
  activeTag: TTag
  mode: 'mobile' | 'modeline' | 'default'
}

const ActiveTag: FC<TProps> = ({ activeTag, mode }) => {
  return (
    <Wrapper>
      {activeTag?.id ? (
        <TagItem>
          <DotSign color={activeTag.color} />
          <TagTitle>{activeTag.title}</TagTitle>
        </TagItem>
      ) : (
        <>{mode === 'default' ? '未设置' : '标签'}</>
      )}
    </Wrapper>
  )
}

export default ActiveTag
