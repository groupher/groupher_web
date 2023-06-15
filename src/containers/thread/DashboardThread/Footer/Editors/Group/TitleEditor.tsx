import { FC } from 'react'

import CancelButton from '@/widgets/Buttons/CancelButton'
import { SpaceGrow, Br } from '@/widgets/Common'

import { Wrapper, InputWrapper, Inputer } from '../../../styles/footer/editors/group/title_editor'

type TProps = {
  onHide: () => void
}

const TitleEditor: FC<TProps> = ({ onHide }) => {
  return (
    <Wrapper>
      <InputWrapper>
        <Inputer placeholder="社区标题（可选）" />
      </InputWrapper>
      <Br top={15} />
      <InputWrapper>
        <Inputer placeholder="社区描述（可选）" behavior="textarea" />
      </InputWrapper>

      <SpaceGrow />
      {/* <CancelButton onClick={onHide} top={30} /> */}
      <CancelButton onClick={onHide} top={30} />
    </Wrapper>
  )
}

export default TitleEditor
