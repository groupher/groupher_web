import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { FOOTER_LAYOUT } from '@/const/layout'

import useFooter from '../../logic/useFooter'
import SimpleEditor from './Simple'
import GroupEditor from './Group'

const Editor: FC = () => {
  const { footerLayout } = useFooter()

  return (
    <>
      {footerLayout === FOOTER_LAYOUT.SIMPLE && <SimpleEditor />}
      {footerLayout === FOOTER_LAYOUT.GROUP && <GroupEditor />}
    </>
  )
}

export default observer(Editor)
