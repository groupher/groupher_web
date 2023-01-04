import { FC } from 'react'

import type { TFooterEditType } from '../../../spec'
import { FOOTER_EDIT_TYPE } from '../../../constant'

import SocialEditor from './SocialEditor'
import LogoEditor from './LogoEditor'
import TitleEditor from './TitleEditor'

type TProps = {
  type: TFooterEditType
  onHide: () => void
}

const MainEditor: FC<TProps> = ({ type, onHide }) => {
  return (
    <div>
      {type === FOOTER_EDIT_TYPE.LOGO && (
        <LogoEditor onHide={() => onHide()}>Logo editor</LogoEditor>
      )}
      {type === FOOTER_EDIT_TYPE.TITLE && <TitleEditor onHide={() => onHide()} />}
      {type === FOOTER_EDIT_TYPE.SOCIAL && <SocialEditor onHide={() => onHide()} />}
    </div>
  )
}

export default MainEditor
