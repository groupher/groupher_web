/* *
 * TagSettingEditor
 *
 */

import { FC } from 'react'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import type { TStore } from './store'
import { Wrapper } from './styles'
import { useInit } from './logic' /* eslint-disable-next-line */

// const log = buildLog('C:TagSettingEditor')

type TProps = {
  tagSettingEditor?: TStore
  testid: string
}

const TagSettingEditorContainer: FC<TProps> = ({ tagSettingEditor: store, testid }) => {
  useInit(store)

  return (
    <Wrapper testid={testid}>
      <h2>TagSettingEditor hooks container!</h2>
      <div>impress me!</div>
    </Wrapper>
  )
}

export default bond(TagSettingEditorContainer, 'tagSettingEditor') as FC<TProps>
