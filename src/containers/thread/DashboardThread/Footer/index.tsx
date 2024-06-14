import type { FC } from 'react'

import { SETTING_FIELD } from '../constant'

import SavingBar from '../SavingBar'

import Templates from './Templates'
import Editor from './Editors'

import useFooter from '../logic/useFooter'
import { Wrapper } from '../styles/footer'

const Footer: FC = () => {
  const { saving, getIsTouched } = useFooter()
  const isTouched = getIsTouched('footerLinks')

  return (
    <Wrapper>
      <Templates />
      <br />
      <br />
      <Editor />

      <SavingBar
        field={SETTING_FIELD.FOOTER_LINKS}
        isTouched={isTouched}
        loading={saving}
        top={30}
        width="98%"
      />
    </Wrapper>
  )
}

export default Footer
