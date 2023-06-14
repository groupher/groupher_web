import { FC } from 'react'

import { FOOTER_LAYOUT } from '@/constant/layout'

import type { TFooterSettings } from '../../spec'
import SimpleEditor from './Simple'
import GroupEditor from './Group'

type TProps = {
  settings: TFooterSettings
}

const Editor: FC<TProps> = ({ settings }) => {
  const { footerLayout } = settings

  return (
    <>
      {footerLayout === FOOTER_LAYOUT.SIMPLE && <SimpleEditor settings={settings} />}
      {footerLayout === FOOTER_LAYOUT.GROUP && <GroupEditor settings={settings} />}
    </>
  )
}

export default Editor
