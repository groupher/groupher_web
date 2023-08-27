import { FC, memo } from 'react'

import ArrowButton from '@/widgets/Buttons/ArrowButton'
import { Br, Space } from '@/widgets/Common'

import ScaleSelector from './ScaleSelector'
import NextStepButton from './NextStepButton'

import {
  Wrapper,
  IntroTitle,
  IntroDesc,
  ApplyIcon,
  NextBtn,
  InfoWrapper,
  InputsWrapper,
  InputBox,
  ExtraInputBox,
  Label,
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
        更多信息
      </IntroTitle>
      <IntroDesc>此处填写信息会在社区创建成功后，同步到该社区的 &quot;关于&quot; 页面中</IntroDesc>
      <InfoWrapper>
        <InputsWrapper>
          <Label>官方主页</Label>
          <InputBox
            value={homepage}
            placeholder="https://"
            onChange={(e) => inputOnChange(e, 'homepage')}
          />
          <Br bottom={26} />

          <Label>团队规模</Label>
          <ScaleSelector />
          <Br bottom={26} />

          <Label>您（的团队）所在城市是？</Label>
          <InputBox
            value={homepage}
            placeholder="https://"
            onChange={(e) => inputOnChange(e, 'homepage')}
          />
          <Br bottom={26} />

          <Label>您从哪里知道 Groupher 的？</Label>
          <InputBox
            value={homepage}
            placeholder="https://"
            onChange={(e) => inputOnChange(e, 'homepage')}
          />
          <Br bottom={26} />
          {/* <ExtraInputBox
            value={extraInfo}
            placeholder="其他信息（支持 Markdown）"
            onChange={(e) => inputOnChange(e, 'extraInfo')}
            behavior="textarea"
          /> */}
        </InputsWrapper>
      </InfoWrapper>
      <NextBtn>
        <ArrowButton leftLayout onClick={pervStep} dimWhenIdle>
          上一步
        </ArrowButton>
        <Space right={26} />
        <NextStepButton onClick={nextStep} disabled={!isValid} text="完 成" loading={submitting} />
      </NextBtn>
    </Wrapper>
  )
}

export default memo(SetupExtra)
