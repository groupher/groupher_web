import { nilOrEmpty } from '~/validator'

import OSSUploader from '~/widgets/OSSUploader'
import ArrowButton from '~/widgets/Buttons/ArrowButton'
import { Br, Space } from '~/widgets/Common'

import NextStepButton from './NextStepButton'

import useLogic from '../useLogic'
import {
  Wrapper,
  IntroTitle,
  ApplyIcon,
  NextBtn,
  InfoWrapper,
  HolderWrapper,
  HolderInner,
  HolderIcon,
  HolderText,
  RealCover,
  InputsWrapper,
  InputBox,
} from '../styles/banner/setup_info'

export default () => {
  const { title, desc, logo, validState, pervStep, nextStep, inputOnChange } = useLogic()

  const { isTitleValid, isDescValid, isLogoValid } = validState
  const isValid = isTitleValid && isDescValid && isLogoValid

  return (
    <Wrapper>
      <IntroTitle>
        <ApplyIcon />
        基本信息
      </IntroTitle>
      <InfoWrapper>
        <OSSUploader onUploadDone={(url) => inputOnChange(url, 'logo')}>
          {nilOrEmpty(logo) ? (
            <HolderWrapper>
              <HolderInner>
                <HolderIcon />
                <HolderText>LOGO</HolderText>
              </HolderInner>
            </HolderWrapper>
          ) : (
            <RealCover src={logo} />
          )}
        </OSSUploader>
        <InputsWrapper>
          <InputBox
            value={title}
            placeholder="社区名称"
            onChange={(e) => inputOnChange(e, 'title')}
          />
          <Br bottom={10} />
          <InputBox
            value={desc}
            placeholder="社区一句话描述"
            onChange={(e) => inputOnChange(e, 'desc')}
          />
        </InputsWrapper>
      </InfoWrapper>

      <NextBtn>
        <ArrowButton leftLayout onClick={pervStep} dimWhenIdle>
          上一步
        </ArrowButton>
        <Space right={26} />
        <NextStepButton onClick={nextStep} disabled={!isValid} />
      </NextBtn>
    </Wrapper>
  )
}
