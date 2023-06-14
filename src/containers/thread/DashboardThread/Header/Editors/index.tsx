import { FC } from 'react'

import type { THeaderLayout } from '@/spec'
import { HEADER_LAYOUT } from '@/constant/layout'

import SimpleEditor from './Simple'
import FullEditor from './Full'

type TProps = {
  headerLayout: THeaderLayout
}

const Editor: FC<TProps> = ({ headerLayout }) => {
  return (
    <div>
      {headerLayout === HEADER_LAYOUT.CENTER && <SimpleEditor />}
      {headerLayout === HEADER_LAYOUT.RIGHT && <FullEditor />}
    </div>
  )
}

export default Editor
