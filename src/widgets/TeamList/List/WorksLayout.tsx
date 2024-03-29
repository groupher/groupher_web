/*
 *
 * TeamList
 *
 */

import { FC, memo } from 'react'

import type { TUser } from '@/spec'
import { ICON } from '@/config'
import { buildLog } from '@/logger'

import Button from '@/widgets/Buttons/Button'
import UserItem from '../UserItem'

import { Wrapper, SettingWrapper, SettingIcon } from '../styles/list/works_layout'

const _log = buildLog('w:TeamList:index')

type TProps = {
  users: TUser[]
  withSetter?: boolean
  onSetting: () => void
}

const WorksLayout: FC<TProps> = ({ users, withSetter = false, onSetting }) => {
  return (
    <Wrapper>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
      {withSetter && (
        <SettingWrapper onClick={onSetting}>
          <Button size="small" ghost noBorder>
            管理
            <SettingIcon src={`${ICON}/shape/settings.svg`} />
          </Button>
        </SettingWrapper>
      )}
    </Wrapper>
  )
}

export default memo(WorksLayout)
