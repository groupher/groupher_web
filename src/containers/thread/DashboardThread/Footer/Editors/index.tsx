import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { FOOTER_LAYOUT } from '@/const/layout'

import useFooterSettingsInfo from '../../hooks/useFooterSettingsInfo'
import SimpleEditor from './Simple'
import GroupEditor from './Group'

const Editor: FC = () => {
  const { footerLayout } = useFooterSettingsInfo()

  return (
    <>
      {footerLayout === FOOTER_LAYOUT.SIMPLE && <SimpleEditor />}
      {footerLayout === FOOTER_LAYOUT.GROUP && <GroupEditor />}
    </>
  )
}

export default observer(Editor)
