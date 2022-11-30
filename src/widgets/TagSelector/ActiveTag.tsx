import { FC } from 'react'
import { TTag } from '@/spec'

import { Wrapper, TagItem, DotSign, TagTitle } from './styles/active_tag'

type TProps = {
  activeTag: TTag
}

const ActiveTag: FC<TProps> = ({ activeTag }) => {
  return (
    <Wrapper>
      {activeTag?.id ? (
        <TagItem>
          <DotSign color={activeTag.color} />
          <TagTitle>{activeTag.title}</TagTitle>
        </TagItem>
      ) : (
        <>未设置</>
      )}
    </Wrapper>
  )
}

export default ActiveTag
