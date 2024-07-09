/*
 *
 * CommunitiesBanner
 *
 */

import useAccount from '~/hooks/useAccount'
import { Br } from '~/widgets/Common'
import ArrowLinker from '~/widgets/ArrowLinker'
import Checker from '~/widgets/Checker'

import NextStepButton from '../NextStepButton'
import TypeBoxes from './TypeBoxes'
import WarnBox from './WarnBox'

import useLogic from '../../useLogic'
import { Wrapper, InnerWrapper, IntroTitle, Note, NextBtn } from '../../styles/banner/select_type'

export default () => {
  const { isLogin } = useAccount()
  const { communityType, validState, nextStep, isOfficalOnChange } = useLogic()

  if (!validState.hasPendingApply && !isLogin) {
    return <WarnBox title="未登录" desc="创建社区需要先登录，谢谢~" />
  }

  if (isLogin && validState.hasPendingApply) {
    return (
      <WarnBox
        title="申请处理中"
        desc="你上次申请的创建请求还在处理中，请等待处理后再次创建，谢谢~"
      />
    )
  }

  return (
    <Wrapper marginTop={communityType === null}>
      <InnerWrapper>
        <IntroTitle>你创建的反馈社区将服务于?</IntroTitle>

        <TypeBoxes />

        {!communityType && <Br bottom={200} />}
        {communityType && (
          <Note>
            <Checker
              checked={validState.isOfficalValid}
              size="small"
              onChange={isOfficalOnChange}
            />
            我代表产品官方团队，
            <ArrowLinker href="/">为什么</ArrowLinker>
          </Note>
        )}

        {communityType && (
          <NextBtn>
            <NextStepButton
              onClick={nextStep}
              disabled={!(validState.isCommunityTypeValid && validState.isOfficalValid)}
            />
          </NextBtn>
        )}
      </InnerWrapper>
    </Wrapper>
  )
}
