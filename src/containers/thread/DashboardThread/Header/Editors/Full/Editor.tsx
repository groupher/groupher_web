import { FC } from 'react'

import type { TFooterEditType } from '../../../spec'
import { FOOTER_EDIT_TYPE } from '../../../constant'

import LogoEditor from './LogoEditor'
import DisplaySetter from './DisplaySetter'

type TProps = {
  type: TFooterEditType
  onHide: () => void
}

const Editor: FC<TProps> = ({ type, onHide }) => {
  return (
    <div>
      {type === FOOTER_EDIT_TYPE.LOGO && (
        <LogoEditor onHide={() => onHide()}>Logo editor</LogoEditor>
      )}
      {type === FOOTER_EDIT_TYPE.TITLE && <DisplaySetter type={type} onHide={() => onHide()} />}
    </div>
  )
}

export default Editor
