import { FC } from 'react'

import type { TChangeMode, TTag } from '@/spec'
import { CHANGE_MODE } from '@/constant/mode'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { Wrapper, UpdateWrapper, ActionButton } from './styles/footer'
import { onCreate, onUpdate, onDelete } from './logic'

type TProps = {
  tag: TTag
  mode: TChangeMode
  processing: boolean
}

const Footer: FC<TProps> = ({ tag, mode, processing }) => {
  if (processing) {
    return (
      <Wrapper>
        <LavaLampLoading />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      {mode === CHANGE_MODE.CREATE ? (
        <ActionButton top={15} onClick={() => onCreate()}>
          创建新标签
        </ActionButton>
      ) : (
        <UpdateWrapper>
          <ActionButton bottom={8} onClick={() => onUpdate()}>
            更新链接
          </ActionButton>

          <ActionButton type="red" onClick={() => onDelete(tag)} ghost noBorder>
            删除标签
          </ActionButton>
        </UpdateWrapper>
      )}
    </Wrapper>
  )
}

export default Footer
