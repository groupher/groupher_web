import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { SETTING_FIELD } from '../constant'

import SavingBar from '../SavingBar'

import Templates from './Templates'
import Editor from './Editors'

import useHeader from '../logic/useHeader'
import { Wrapper } from '../styles/header'

const Header: FC = () => {
  const { isTouched, saving } = useHeader()

  return (
    <Wrapper>
      <Templates />
      <br />
      <br />
      <Editor />

      <SavingBar
        field={SETTING_FIELD.HEADER_LINKS}
        isTouched={isTouched}
        loading={saving}
        width="97%"
        top={30}
      />
    </Wrapper>
  )
}

export default observer(Header)
