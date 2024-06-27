/* *
 * PassportEditor
 *
 */

import { type FC, useEffect } from 'react'

import useViewingCommunity from '~/hooks/useViewingCommunity'

import { SexyDivider } from '~/widgets/Common'
import Button from '~/widgets/Buttons/Button'

import Selects from './Selects'

import useLogic from './useLogic'
import { Wrapper, Desc, Footer, RootSign } from './styles'

const PassportEditor: FC = () => {
  const curCommunity = useViewingCommunity()

  useEffect(() => {
    loadAllPassportRules()
  }, [])

  const {
    activeModerator,
    loadAllPassportRules,
    updatePassport,
    getIsActiveModeratorRoot,
    getIsCurUserModeratorRoot,
    getIsReadonly,
  } = useLogic()

  const isActiveModeratorRoot = getIsActiveModeratorRoot()
  const isCurUserModeratorRoot = getIsCurUserModeratorRoot()

  const readonly = getIsReadonly()

  if (!activeModerator) return null

  return (
    <Wrapper $testid="passport-editor">
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
      <Selects />
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

export default PassportEditor
