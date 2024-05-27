/* *
 * CoverEditor
 *
 */

import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import Cover from './Cover'
import Toolbox from './Toolbox'

import { useStore } from './store'
import { Wrapper } from './styles'
import { useInit } from './logic' /* eslint-disable-next-line */

type TProps = {
  testid?: string

  onDelete?: () => void
  onReplace?: () => void
}

const CoverEditor: FC<TProps> = ({
  testid = 'cover-editor',
  onDelete = console.log,
  onReplace = console.log,
}) => {
  const store = useStore()
  useInit(store)
  const { toolboxSetting } = store

  // const imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/385126/600.jpg'
  // const imageUrl = '/changelog-demo-light.jpg'
  const imageUrl = '/changelog-demo-dark.jpg'
  // const imageUrl = ''

  return (
    <Wrapper $testid={testid}>
      <Cover setting={toolboxSetting} imageUrl={imageUrl} />
      <Toolbox setting={toolboxSetting} onDelete={onDelete} onReplace={onReplace} />
    </Wrapper>
  )
}

export default observer(CoverEditor)
