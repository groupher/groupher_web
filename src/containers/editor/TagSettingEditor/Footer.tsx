import { FC } from 'react'

import type { TChangeMode, TTag } from '@/spec'
import { CHANGE_MODE } from '@/constant/mode'

import { Wrapper, UpdateWrapper, ActionButton } from './styles/footer'
import { onCreate, onUpdate, onDelete } from './logic'

type TProps = {
  tag: TTag
  mode: TChangeMode
  processing: boolean
}

const Footer: FC<TProps> = ({ tag, mode, processing }) => {
  return (
    <Wrapper>
      {mode === CHANGE_MODE.CREATE ? (
        <ActionButton top={15} onClick={() => onCreate()} loading={processing}>
          创建新标签
        </ActionButton>
      ) : (
        <UpdateWrapper>
          <ActionButton bottom={15} onClick={() => onUpdate()} loading={processing}>
            更新链接
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
