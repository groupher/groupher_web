import { FC } from 'react'

import Button from '@/widgets/Buttons/Button'
import RealSocialEditor from '@/widgets/SocialEditor'

import { ArrowIcon } from '../../../styles/footer/editors/group/social_editor'

type TProps = {
  onHide: () => void
}

const SocialEditor: FC<TProps> = ({ onHide }) => {
  return (
    <>
      <RealSocialEditor />
      <Button left={-4} size="small" noBorder ghost onClick={() => onHide()}>
        <ArrowIcon />
        收起
      </Button>
    </>
  )
}

export default SocialEditor
