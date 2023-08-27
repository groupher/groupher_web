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

import { Wrapper, Desc, Footer, RootSign } from './styles'
import { useInit, updatePassport } from './logic' /* eslint-disable-next-line */

// const log = buildLog('C:PassportEditor')

type TProps = {
  passportEditor?: TStore
  testid: string
}

const PassportEditorContainer: FC<TProps> = ({ passportEditor: store, testid }) => {
  useInit(store)
  const {
    curCommunity,
    allModeratorRules,
    allRootRules,
    selectedRulesData,
    activeModerator,
    isActiveModeratorRoot,
    isCurUserModeratorRoot,
  } = store

  const rules = isActiveModeratorRoot ? allRootRules : allModeratorRules
  const readonly = isActiveModeratorRoot || !isCurUserModeratorRoot

  return (
    <Wrapper testid={testid}>
      {!isActiveModeratorRoot ? <h3>权限设置</h3> : <RootSign>ROOT</RootSign>}
      {isActiveModeratorRoot ? (
        <Desc>
          {activeModerator.nickname} 拥有 {curCommunity.title} 社区的所有管理权限
        </Desc>
      ) : (
        <Desc>
          在 {curCommunity.title} 社区范围内，{activeModerator.nickname} 拥有以下权限
        </Desc>
      )}
      <SexyDivider bottom={30} />
      <Selects
        rules={rules}
        moderatorRules={allModeratorRules}
        selectedRules={selectedRulesData}
        readonly={readonly}
      />
      <SexyDivider bottom={30} />

      {!readonly && (
        <Footer>
          <Button type="red" ghost>
            删除管理员
          </Button>
          <Button onClick={() => updatePassport()}>更新权限</Button>
        </Footer>
      )}

      {isActiveModeratorRoot && isCurUserModeratorRoot && (
        <Footer>
          <Button ghost left={30}>
            转移 ROOT 给其他管理员
          </Button>
        </Footer>
      )}
    </Wrapper>
  )
}

export default bond(PassportEditorContainer, 'passportEditor') as FC<TProps>
