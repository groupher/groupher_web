import { FC } from 'react'

import type { TFooterSettings, TTouched } from '../spec'

import Templates from './Templates'
import Editor from './Editors'

import { Wrapper } from '../styles/header'

type TProps = {
  settings: TFooterSettings
  touched: TTouched
}

const Header: FC<TProps> = ({ settings, touched }) => {
  return (
    <Wrapper>
      <Templates settings={settings} isTouched={touched.footerLayout} />
      <br />
      <br />
      <Editor footerLayout={settings.footerLayout} />
    </Wrapper>
  )
}

export default Header
