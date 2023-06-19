import { FC } from 'react'

import type { THeaderSettings, TTouched } from '../spec'

import Templates from './Templates'
import Editor from './Editors'

import { Wrapper } from '../styles/header'

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
    </Wrapper>
  )
}

export default Header
