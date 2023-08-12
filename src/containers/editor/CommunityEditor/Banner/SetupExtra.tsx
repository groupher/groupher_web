import { FC, memo } from 'react'

import ArrowButton from '@/widgets/Buttons/ArrowButton'
import { Br, Space } from '@/widgets/Common'

import NextStepButton from './NextStepButton'

import {
  Wrapper,
  IntroTitle,
  ApplyIcon,
  NextBtn,
  InfoWrapper,
  InputsWrapper,
  InputBox,
  ExtraInputBox,
} from '../styles/banner/setup_extra'

import type { TSetupExtraStatus, TValidState } from '../spec'
import { pervStep, nextStep, inputOnChange } from '../logic'

type TProps = {
  status: TSetupExtraStatus
  validState: TValidState
}

const SetupExtra: FC<TProps> = ({ status, validState }) => {
  const { homepage, extraInfo } = status

  const { isTitleValid, isDescValid, isLogoValid, submitting } = validState
  const isValid = isTitleValid && isDescValid && isLogoValid

  return (
    <Wrapper>
      <IntroTitle>
        <ApplyIcon />
        更多信息（可选）
      </IntroTitle>
      <InfoWrapper>
        <InputsWrapper>
          <InputBox
            value={homepage}
            placeholder="官网主页"
            onChange={(e) => inputOnChange(e, 'homepage')}
          />
          <Br bottom={10} />
          <ExtraInputBox
            value={extraInfo}
            placeholder="其他信息（支持 Markdown）"
            onChange={(e) => inputOnChange(e, 'extraInfo')}
            behavior="textarea"
          />
        </InputsWrapper>
      </InfoWrapper>

      <NextBtn>
        <ArrowButton leftLayout onClick={pervStep} dimWhenIdle>
          上一步
        </ArrowButton>
        <Space right={26} />
        <NextStepButton onClick={nextStep} disabled={!isValid} text="提 交" loading={submitting} />
      </NextBtn>
    </Wrapper>
  )
}

export default memo(SetupExtra)
