import { FC } from 'react'

import Button from '@/widgets/Buttons/Button'
import SocialEditor from '@/widgets/SocialEditor'

import { ArrowIcon } from '../../../styles/footer/editors/full/brand_editor'

type TProps = {
  onHide: () => void
}

const BrandEditor: FC<TProps> = ({ onHide }) => {
  return (
    <div>
      <SocialEditor />
      <Button left={-3} size="small" noBorder ghost onClick={() => onHide()}>
        <ArrowIcon />
        收起
      </Button>
    </div>
  )
}

export default BrandEditor
