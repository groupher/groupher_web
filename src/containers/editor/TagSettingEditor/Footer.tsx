import { FC } from 'react'

import type { TTag } from '@/spec'
import { Wrapper, DeleteButton } from './styles/footer'

import { deleteArticleTag } from './logic'

type TProps = {
  tag: TTag
}

const Footer: FC<TProps> = ({ tag }) => {
  return (
    <Wrapper>
      <DeleteButton type="red" ghost onClick={() => deleteArticleTag(tag)}>
        删除标签
      </DeleteButton>
    </Wrapper>
  )
}

export default Footer
