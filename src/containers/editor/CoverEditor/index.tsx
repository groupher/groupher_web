/* *
 * CoverEditor
 *
 */

import { FC } from 'react'

import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import Cover from './Cover'
import Toolbox from './Toolbox'

import type { TStore } from './store'
import { Wrapper } from './styles'
import { useInit } from './logic' /* eslint-disable-next-line */

const log = buildLog('C:CoverEditor')

type TProps = {
  coverEditor?: TStore
  testid?: string

  onDelete?: () => void
  onReplace?: () => void
}

const CoverEditorContainer: FC<TProps> = ({
  coverEditor: store,
  testid = 'cover-editor',
  onDelete = log,
  onReplace = log,
}) => {
  useInit(store)
  const { toolboxSetting } = store

  // const imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/385126/600.jpg'
  // const imageUrl = '/changelog-demo-light.jpg'
  const imageUrl = '/changelog-demo-dark.jpg'
  // const imageUrl = ''

  return (
    <Wrapper testid={testid}>
      <Cover setting={toolboxSetting} imageUrl={imageUrl} />
      <Toolbox setting={toolboxSetting} onDelete={onDelete} onReplace={onReplace} />
    </Wrapper>
  )
}

export default bond(CoverEditorContainer, 'coverEditor') as FC<TProps>
