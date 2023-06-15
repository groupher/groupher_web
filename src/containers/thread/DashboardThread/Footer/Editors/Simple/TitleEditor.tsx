import { FC } from 'react'

import Button from '@/widgets/Buttons/Button'
import { Br } from '@/widgets/Common'

import {
  Wrapper,
  InputWrapper,
  ArrowIcon,
  Inputer,
} from '../../../styles/footer/editors/simple/title_editor'

type TProps = {
  onHide: () => void
}

const TitleEditor: FC<TProps> = ({ onHide }) => {
  return (
    <Wrapper>
      <InputWrapper>
        <Inputer placeholder="社区标题" />
      </InputWrapper>
      <Br top={20} />
      <Button left={-8} size="small" noBorder ghost onClick={() => onHide()}>
        <ArrowIcon />
        收起
      </Button>
    </Wrapper>
  )
}

export default TitleEditor
