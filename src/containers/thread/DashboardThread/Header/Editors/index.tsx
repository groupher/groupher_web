import { FC } from 'react'

import type { TFooterLayout } from '@/spec'
import { FOOTER_LAYOUT } from '@/constant/layout'

import SimpleEditor from './Simple'
import FullEditor from './Full'

type TProps = {
  footerLayout: TFooterLayout
}

const Editor: FC<TProps> = ({ footerLayout }) => {
  return (
    <div>
      {footerLayout === FOOTER_LAYOUT.SIMPLE && <SimpleEditor />}
      {footerLayout === FOOTER_LAYOUT.FULL && <FullEditor />}
    </div>
  )
}

export default Editor
