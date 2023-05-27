import { FC } from 'react'

import type { TTag } from '@/spec'
import { Wrapper, UpdateWrapper, ActionButton } from './styles/footer'

import { onCreate, onUpdate, onDelete } from './logic'

type TProps = {
  tag: TTag
  mode: 'create' | 'edit'
  processing: boolean
}

const Footer: FC<TProps> = ({ tag, mode, processing }) => {
  return (
    <Wrapper>
      {mode === 'create' ? (
        <ActionButton top={15} onClick={() => onCreate()} loading={processing}>
          创建新标签
        </ActionButton>
      ) : (
        <UpdateWrapper>
          <ActionButton bottom={15} onClick={() => onUpdate()} loading={processing}>
            更新标签
          </ActionButton>

          <ActionButton type="red" ghost onClick={() => onDelete(tag)} loading={processing}>
            删除标签
          </ActionButton>
        </UpdateWrapper>
      )}
    </Wrapper>
  )
}

export default Footer
