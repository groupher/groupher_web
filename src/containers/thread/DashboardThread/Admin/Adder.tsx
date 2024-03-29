import { FC, memo } from 'react'

import { Space } from '@/widgets/Common'
import { Wrapper, Inputer, PlusIcon, AddButton } from '../styles/admin/adder'

const Adder: FC = () => {
  return (
    <Wrapper>
      <Inputer placeholder="账户名称 / 登入ID (TODO: use react-select)" />
      <Space right={30} />
      <AddButton size="small" disabled>
        <PlusIcon disabled />
        管理员
      </AddButton>
    </Wrapper>
  )
}

export default memo(Adder)
