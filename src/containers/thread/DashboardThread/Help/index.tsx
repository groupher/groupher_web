// import FileTree from '@/widgets/FileTree'
import { FC } from 'react'

import type { THelpSettings } from '../spec'
import Header from './Header'
import BlockLayout from './BlockLayout'

import { Wrapper } from '../styles/help'

type TProps = {
  settings: THelpSettings
}

const Help: FC<TProps> = ({ settings }) => {
  return (
    <Wrapper>
      <Header />
      <BlockLayout settings={settings} />
      {/* <FileTree /> */}
    </Wrapper>
  )
}

export default Help
