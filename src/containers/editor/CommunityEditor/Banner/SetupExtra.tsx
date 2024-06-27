import { type FC, memo } from 'react'

import ArrowButton from '~/widgets/Buttons/ArrowButton'
import { Br, Space } from '~/widgets/Common'
import CitySelector from '~/widgets/CitySelector'

import { SOURCE_OPTIONS } from '../constant'

import ScaleSelector from './ScaleSelector'
import BlockSelector from './BlockSelector'
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
  Label,
} from '../styles/banner/setup_extra'

import type { TSetupExtraStatus, TValidState } from '../spec'
import { pervStep, nextStep, inputOnChange } from '../logic'

type TProps = {
  status: TSetupExtraStatus
  validState: TValidState
}

const SetupExtra: FC<TProps> = ({ status, validState }) => {
  const { homepage, city, source, communityType } = status

  const { isTitleValid, isDescValid, isLogoValid, submitting } = validState
  const isValid = isTitleValid && isDescValid && isLogoValid

  return (
    <Wrapper>
      <IntroTitle>
        <ApplyIcon />
        更多信息
      </IntroTitle>
      <IntroDesc>此处相关信息会在社区创建后，同步到该社区的 &quot;关于&quot; 页面</IntroDesc>
      <InfoWrapper>
        <InputsWrapper>
          <Label>官方主页</Label>
          <Br bottom={10} />
          <InputBox
            value={homepage}
            placeholder="https://"
            onChange={(e) => inputOnChange(e, 'homepage')}
          />
          <Br bottom={35} />

          <Label>团队规模</Label>
          <ScaleSelector communityType={communityType} />
          <Br bottom={40} />

          <Label>您（的团队）所在城市是？</Label>
          <Br bottom={20} />
          <CitySelector value={city} onChange={(v) => inputOnChange(v, 'city')} />
          <Br bottom={40} />

          <Label>您是从哪里知道 Groupher 的？</Label>
          <Br bottom={20} />
          <BlockSelector
            options={SOURCE_OPTIONS}
            radius={20}
            activeValue={source}
            onChange={(v) => inputOnChange(v, 'source')}
          />
          <Br bottom={20} />
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
