import { FC, memo } from 'react'
import { isEmpty } from 'ramda'

import { cutRest } from '@/utils/fmt'

import ArrowButton from '@/widgets/Buttons/ArrowButton'

import NextStepButton from './NextStepButton'
import InputBox from './InputBox'

import { Wrapper, IntroTitle, DomainIcon, NextBtn, ErrorMsg } from '../styles/banner/setup_domain'

import type { TSetupDomainStatus, TValidState } from '../spec'
import { pervStep, nextStep, inputOnChange } from '../logic'

type TProps = {
  status: TSetupDomainStatus
  validState: TValidState
}
const SetupDomain: FC<TProps> = ({ status, validState }) => {
  const { slug } = status
  const { isRawValid, checking, communityExist } = validState

  return (
    <Wrapper>
      <IntroTitle>
        <DomainIcon />
        社区域名
      </IntroTitle>
      <InputBox value={slug} placeholder="your-domain" onChange={(e) => inputOnChange(e, 'slug')} />
      {!isEmpty(slug) && !communityExist && !isRawValid && (
        <ErrorMsg>仅支持英文、拼音或数字组合</ErrorMsg>
      )}

      {!checking && communityExist && (
        <ErrorMsg>{cutRest(slug, 8)} 已存在（或他人在申请中），请尝试其他域名</ErrorMsg>
      )}
      <NextBtn>
        <ArrowButton leftLayout onClick={pervStep} dimWhenIdle>
          上一步
        </ArrowButton>

        <NextStepButton loading={checking} onClick={nextStep} disabled={!isRawValid} />
      </NextBtn>
    </Wrapper>
  )
}

export default memo(SetupDomain)
