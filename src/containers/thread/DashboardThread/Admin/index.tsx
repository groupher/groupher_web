import { FC, memo } from 'react'

import ArrowButton from '@/widgets/Buttons/ArrowButton'
import { Inline } from '@/widgets/Common'

import type { TAdminSettings } from '../spec'

import Portal from '../Portal'
import Adder from './Adder'
import List from './List'

import { Wrapper } from '../styles/admin'

type TProps = {
  settings: TAdminSettings
}

const Admin: FC<TProps> = ({ settings }) => {
  const { moderators, activeModerator } = settings

  return (
    <Wrapper>
      <Portal
        title="管理员"
        desc={
          <>
            添加可参与社区内容管理的账号。
            <Inline>
              <ArrowButton>设置参考</ArrowButton>
            </Inline>
          </>
        }
      />
      <Adder />
      <List moderators={moderators} activeModerator={activeModerator} />
    </Wrapper>
  )
}

export default memo(Admin)
