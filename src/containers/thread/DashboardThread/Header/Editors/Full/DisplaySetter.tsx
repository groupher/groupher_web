import { FC } from 'react'

import Checker from '@/widgets/Checker'
import Button from '@/widgets/Buttons/Button'
import { Br } from '@/widgets/Common'

import type { TFooterEditType } from '../../../spec'

import { Wrapper, ArrowIcon } from '../../../styles/header/editors/full/display_setter'

type TProps = {
  type: TFooterEditType
  onHide: () => void
}

const DisplaySetter: FC<TProps> = ({ type, onHide }) => {
  return (
    <Wrapper>
      <Checker
        checked
        size="medium"
        onChange={(checked) => {
          console.log('## checked: ', checked)
        }}
      >
        LOGO 和名称
      </Checker>
      <Checker
        checked={false}
        size="medium"
        onChange={(checked) => {
          console.log('## checked: ', checked)
        }}
      >
        仅 LOGO
      </Checker>
      <Checker
        checked={false}
        size="medium"
        onChange={(checked) => {
          console.log('## checked: ', checked)
        }}
      >
        仅名称
      </Checker>

      <Br top={20} />
      <Button left={-5} size="small" noBorder ghost onClick={() => onHide()}>
        <ArrowIcon />
        收起
      </Button>
    </Wrapper>
  )
}

export default DisplaySetter
