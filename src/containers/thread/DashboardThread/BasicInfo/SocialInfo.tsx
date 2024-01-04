import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import SocialEditor from '@/widgets/SocialEditor'

import { SETTING_FIELD } from '../constant'
import SavingBar from '../SavingBar'

import useBaseInfo from '../hooks/useBaseInfo'
import { Wrapper } from '../styles/basic_info/base_info'
import { updateSocialLinks } from '../logic'

const SocialInfo: FC = () => {
  const { socialLinks, saving, isSocialLinksTouched } = useBaseInfo()

  return (
    <Wrapper>
      <SocialEditor
        width="100%"
        value={socialLinks}
        onChange={(socials) => updateSocialLinks(socials)}
      />

      <SavingBar
        isTouched={isSocialLinksTouched}
        field={SETTING_FIELD.SOCIAL_LINKS}
        loading={saving}
        top={50}
      />
    </Wrapper>
  )
}

export default observer(SocialInfo)
