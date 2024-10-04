// import FileTree from '~/widgets/FileTree'
import type { FC } from 'react'

import type { TDocSettings } from '../spec'
import Header from './Header'
import BlockLayout from './BlockLayout'

import { Wrapper } from '../salon/doc'

type TProps = {
  settings: TDocSettings
}

const Doc: FC<TProps> = ({ settings }) => {
  return (
    <Wrapper>
      <Header />
      <BlockLayout settings={settings} />
      {/* <FileTree /> */}
    </Wrapper>
  )
}

export default Doc
