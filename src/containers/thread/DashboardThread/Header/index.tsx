import { FC } from 'react'

import type { THeaderSettings, TTouched } from '../spec'

import { SETTING_FIELD } from '../constant'

import SavingBar from '../SavingBar'

import Templates from './Templates'
import Editor from './Editors'

import { Wrapper, SavingWrapper } from '../styles/header'

type TProps = {
  settings: THeaderSettings
  touched: TTouched
}

const Header: FC<TProps> = ({ settings, touched }) => {
  return (
    <Wrapper>
      <Templates settings={settings} isTouched={touched.headerLayout} />
      <br />
      <br />
      <Editor settings={settings} />

      <SavingWrapper>
        <SavingBar
          field={SETTING_FIELD.HEADER_LINKS}
          isTouched={touched.headerLinks}
          loading={settings.saving}
          top={30}
        />
      </SavingWrapper>
    </Wrapper>
  )
}

export default Header
