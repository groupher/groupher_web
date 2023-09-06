import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import SocialEditor from '@/widgets/SocialEditor'

import { SETTING_FIELD } from '../constant'
import SavingBar from '../SavingBar'

import type { TBaseInfoSettings, TTouched } from '../spec'

import { Wrapper } from '../styles/basic_info/base_info'
import { updateSocialLinks } from '../logic'

type TProps = {
  testid?: TPostLayout
  settings: TBaseInfoSettings
  touched: TTouched
}

const SocialInfo: FC<TProps> = ({ testid = 'basic-info', settings, touched }) => {
  const { socialLinks, saving } = settings

  return (
    <Wrapper>
      <SocialEditor
        width="100%"
        value={socialLinks}
        onChange={(socials) => updateSocialLinks(socials)}
      />

      <SavingBar
        isTouched={touched.socialLinks}
        field={SETTING_FIELD.SOCIAL_LINKS}
        loading={saving}
        top={50}
      />
    </Wrapper>
  )
}

export default memo(SocialInfo)
