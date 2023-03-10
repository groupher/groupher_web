import { FC } from 'react'

import type { TFooterSettings, TTouched } from '../spec'

import Templates from './Templates'

import Editor from './Editors'

import { Wrapper } from '../styles/footer'

type TProps = {
  settings: TFooterSettings
  touched: TTouched
}

const Footer: FC<TProps> = ({ settings, touched }) => {
  return (
    <Wrapper>
      <Templates settings={settings} isTouched={touched.footerLayout} />
      <br />
      <br />
      <Editor settings={settings} />
    </Wrapper>
  )
}

export default Footer
