import { FC } from 'react'

import type { TFooterSettings, TTouched } from '../spec'

import { SETTING_FIELD } from '../constant'

import SavingBar from '../SavingBar'

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

      <SavingBar
        field={SETTING_FIELD.FOOTER_LINKS}
        isTouched={touched.footerLinks}
        loading={settings.saving}
        top={30}
        width="98%"
      />
    </Wrapper>
  )
}

export default Footer
