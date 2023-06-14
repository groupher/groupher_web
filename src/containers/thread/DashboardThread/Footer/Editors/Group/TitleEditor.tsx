import { FC } from 'react'

import Button from '@/widgets/Buttons/Button'
import { SpaceGrow, Br } from '@/widgets/Common'

import {
  Wrapper,
  InputWrapper,
  Label,
  ArrowIcon,
  Inputer,
} from '../../../styles/footer/editors/group/title_editor'

type TProps = {
  onHide: () => void
}

const TitleEditor: FC<TProps> = ({ onHide }) => {
  return (
    <Wrapper>
      <InputWrapper>
        <Label>标题</Label>
        <Inputer placeholder="社区标题（可选）" />
      </InputWrapper>
      <Br top={15} />
      <InputWrapper>
        <Label>描述</Label>
        <Inputer placeholder="社区描述（可选）" behavior="textarea" />
      </InputWrapper>

      <SpaceGrow />
      <Br top={40} />
      <Button left={-8} size="small" noBorder ghost onClick={() => onHide()}>
        <ArrowIcon />
        收起
      </Button>
    </Wrapper>
  )
}

export default TitleEditor
