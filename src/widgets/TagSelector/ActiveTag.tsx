import type { FC } from 'react'

import type { TColorName, TTag } from '~/spec'
import TagNode from '~/widgets/TagNode'

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
          <TagNode color={activeTag.color as TColorName} boldHash />
          <TagTitle>{activeTag.title}</TagTitle>
        </TagItem>
      ) : (
        <>{mode === 'default' ? '未设置' : '标签'}</>
      )}
    </Wrapper>
  )
}

export default ActiveTag
