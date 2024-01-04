import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { SETTING_FIELD } from '../constant'

import SavingBar from '../SavingBar'

import Templates from './Templates'
import Editor from './Editors'

import useFooterSettingsInfo from '../hooks/useFooterSettingsInfo'
import { Wrapper } from '../styles/footer'

const Footer: FC = () => {
  const { saving, isTouched } = useFooterSettingsInfo()

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

export default observer(Footer)
