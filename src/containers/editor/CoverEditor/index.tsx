/* *
 * CoverEditor
 *
 */

import type { FC } from 'react'

import Cover from './Cover'
import Toolbox from './Toolbox'

import { Wrapper } from './styles'

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
  // const imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/385126/600.jpg'
  // const imageUrl = '/changelog-demo-light.jpg'
  const imageUrl = '/changelog-demo-dark.jpg'
  // const imageUrl = ''

  return (
    <Wrapper $testid={testid}>
      <Cover imageUrl={imageUrl} />
      <Toolbox onDelete={onDelete} onReplace={onReplace} />
    </Wrapper>
  )
}

export default CoverEditor
