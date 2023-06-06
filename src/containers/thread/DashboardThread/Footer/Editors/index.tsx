import { FC } from 'react'

import { FOOTER_LAYOUT } from '@/constant/layout'

import type { TFooterSettings } from '../../spec'
import SimpleEditor from './Simple'
import FullEditor from './Full'

type TProps = {
  settings: TFooterSettings
}

const Editor: FC<TProps> = ({ settings }) => {
  const { footerLayout } = settings

  return (
    <>
      {footerLayout === FOOTER_LAYOUT.SIMPLE && <SimpleEditor />}
      {footerLayout === FOOTER_LAYOUT.FULL && (
        <FullEditor links={settings.footerLinks} editingLink={settings.editingLink} />
      )}
    </>
  )
}

export default Editor
