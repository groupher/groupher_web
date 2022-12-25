/* *
 * CoverEditor
 *
 */

import { FC } from 'react'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import Cover from './Cover'
import Toolbox from './Toolbox'

import type { TStore } from './store'
import { Wrapper } from './styles'
import { useInit } from './logic' /* eslint-disable-next-line */

// const log = buildLog('C:CoverEditor')

type TProps = {
  coverEditor?: TStore
  testid?: string
}

const CoverEditorContainer: FC<TProps> = ({ coverEditor: store, testid = 'cover-editor' }) => {
  useInit(store)

  return (
    <Wrapper testid={testid}>
      <Cover />
      <Toolbox />
    </Wrapper>
  )
}

export default bond(CoverEditorContainer, 'coverEditor') as FC<TProps>
