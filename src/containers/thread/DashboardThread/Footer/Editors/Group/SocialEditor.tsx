import { FC } from 'react'

import CancelButton from '@/widgets/Buttons/CancelButton'
import RealSocialEditor from '@/widgets/SocialEditor'

// import { ArrowIcon } from '../../../styles/footer/editors/group/social_editor'

type TProps = {
  onHide: () => void
}

const SocialEditor: FC<TProps> = ({ onHide }) => {
  return (
    <>
      <RealSocialEditor />
      <CancelButton onClick={onHide} />
    </>
  )
}

export default SocialEditor
