/* *
 * PassportEditor
 *
 */

import { FC } from 'react'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import { SexyDivider } from '@/widgets/Common'
import Button from '@/widgets/Buttons/Button'

import type { TStore } from './store'
import Selects from './Selects'

import { Wrapper, Desc } from './styles'
import { useInit, updatePassport } from './logic' /* eslint-disable-next-line */

// const log = buildLog('C:PassportEditor')

type TProps = {
  passportEditor?: TStore
  testid: string
}

const PassportEditorContainer: FC<TProps> = ({ passportEditor: store, testid }) => {
  useInit(store)
  const { curCommunity, allModeratorRules, allRootRules, selectedRulesData, activeModerator } =
    store

  return (
    <Wrapper testid={testid}>
      <h3>权限设置</h3>
      <Desc>
        在 {curCommunity.title} 社区范围内，{activeModerator.nickname} 拥有以下权限
      </Desc>
      <SexyDivider bottom={30} />

      <Selects rules={allModeratorRules} selectedRules={selectedRulesData} />

      <SexyDivider bottom={30} />

      <div>
        <Button onClick={() => updatePassport()}>更新权限</Button>
      </div>
    </Wrapper>
  )
}

export default bond(PassportEditorContainer, 'passportEditor') as FC<TProps>
