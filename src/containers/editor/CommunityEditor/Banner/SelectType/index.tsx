/*
 *
 * CommunitiesBanner
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/utils/logger'

import { Br } from '@/widgets/Common'

import Checker from '@/widgets/Checker'

import type { TCommunityType, TValidState } from '../../spec'
import NextStepButton from '../NextStepButton'
import TypeBoxes from './TypeBoxes'

import {
  Wrapper,
  InnerWrapper,
  IntroTitle,
  Note,
  NextBtn,
  ErrorMsg,
  InfoMsg,
} from '../../styles/banner/select_type'
import { nextStep, isOfficalOnChange } from '../../logic'

/* eslint-disable-next-line */
const log = buildLog('C:CommunitiesBanner')

type TProps = {
  status: {
    communityType: TCommunityType
  }
  validState: TValidState
}

const SelectType: FC<TProps> = ({ status: { communityType }, validState }) => {
  return (
    <Wrapper marginTop={communityType === null}>
      <InnerWrapper>
        <IntroTitle>你创建的反馈社区将服务于?</IntroTitle>

        <TypeBoxes communityType={communityType} />

        {!communityType && <Br bottom={200} />}
        {communityType && (
          <Note>
            <Checker
              checked={validState.isOfficalValid}
              size="small"
              onChange={isOfficalOnChange}
            />
            我来自产品官方团队, 选项解释.
          </Note>
        )}

        {communityType && (
          <NextBtn>
            {!validState.hasPendingApply && !validState.isLogin && (
              <ErrorMsg>创建社区需要先登录</ErrorMsg>
            )}
            {validState.isLogin && validState.hasPendingApply && (
              <InfoMsg>你上次申请的创建请求还在处理中，请等待处理后再次创建，谢谢!</InfoMsg>
            )}

            {!validState.hasPendingApply && (
              <NextStepButton
                onClick={nextStep}
                disabled={!(validState.isCommunityTypeValid && validState.isOfficalValid)}
              />
            )}
          </NextBtn>
        )}
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(SelectType)
