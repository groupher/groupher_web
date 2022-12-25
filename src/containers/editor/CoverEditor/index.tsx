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
  const { toolboxSetting } = store

  const imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/385126/600.jpg'
  // const imageUrl = ''

  return (
    <Wrapper testid={testid}>
      <Cover setting={toolboxSetting} imageUrl={imageUrl} />
      <Toolbox setting={toolboxSetting} />
    </Wrapper>
  )
}

export default bond(CoverEditorContainer, 'coverEditor') as FC<TProps>
