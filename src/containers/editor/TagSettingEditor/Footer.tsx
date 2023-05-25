import { FC } from 'react'

import type { TTag } from '@/spec'
import { Wrapper, UpdateWrapper, ActionButton } from './styles/footer'

import { deleteArticleTag } from './logic'

type TProps = {
  tag: TTag
  mode: 'create' | 'edit'
}

const Footer: FC<TProps> = ({ tag, mode }) => {
  return (
    <Wrapper>
      {mode === 'create' ? (
        <ActionButton onClick={() => deleteArticleTag(tag)}>创建新标签</ActionButton>
      ) : (
        <UpdateWrapper>
          <ActionButton bottom={15} onClick={() => deleteArticleTag(tag)}>
            更新标签
          </ActionButton>

          <ActionButton type="red" ghost onClick={() => deleteArticleTag(tag)}>
            删除标签
          </ActionButton>
        </UpdateWrapper>
      )}
    </Wrapper>
  )
}

export default Footer
