/* *
 * PassportEditor
 *
 */

import { FC } from 'react'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import type { TStore } from './store'

import Selects from './Selects'

import { Wrapper } from './styles'
import { useInit } from './logic' /* eslint-disable-next-line */

// const log = buildLog('C:PassportEditor')

type TProps = {
  passportEditor?: TStore
  testid: string
}

const PassportEditorContainer: FC<TProps> = ({ passportEditor: store, testid }) => {
  useInit(store)
  const { allModeratorRules, allRootRules, selectedRulesData } = store

  return (
    <Wrapper testid={testid}>
      <h2>PassportEditor hooks container!</h2>
      <div>impress me!</div>
      <br />

      <Selects rules={allModeratorRules} selectedRules={selectedRulesData} />
    </Wrapper>
  )
}

export default bond(PassportEditorContainer, 'passportEditor') as FC<TProps>
