import { FC, memo } from 'react'

import { ARTICLE_STATE, ARTICLE_CAT } from '@/constant'
import { Trans } from '@/utils/i18n'

import type { TProps as TArticleStateBadgeProps } from './index'

import {
  Wrapper,
  BugWrapper,
  QuestionWrapper,
  LockWrapper,
  OtherWrapper,
} from './styles/label'

type TProps = Pick<
  TArticleStateBadgeProps,
  'cat' | 'noBg' | 'smaller' | 'state'
>

const Label: FC<TProps> = ({ cat, state, noBg, smaller }) => {
  switch (cat) {
    case ARTICLE_CAT.FEATURE: {
      return (
        <Wrapper noBg={noBg} state={state} smaller={smaller}>
          {Trans(ARTICLE_CAT.FEATURE)}
        </Wrapper>
      )
    }

    case ARTICLE_CAT.BUG: {
      return (
        <BugWrapper noBg={noBg} state={state} smaller={smaller}>
          {Trans(ARTICLE_CAT.BUG)}
        </BugWrapper>
      )
    }

    case ARTICLE_CAT.QUESTION: {
      if (state === ARTICLE_STATE.RESOLVE) {
        return (
          <QuestionWrapper smaller={smaller}>
            {Trans(ARTICLE_STATE.RESOLVE)}
          </QuestionWrapper>
        )
      }

      return <OtherWrapper>{Trans(ARTICLE_CAT.QUESTION)}</OtherWrapper>
    }

    case ARTICLE_CAT.REJECT_DUP: {
      return <LockWrapper smaller={smaller}>重复问题</LockWrapper>
    }

    case ARTICLE_CAT.REJECT_NO_FIX: {
      return <LockWrapper smaller={smaller}>不修复</LockWrapper>
    }
    case ARTICLE_CAT.REJECT_NO_PLAN: {
      return <LockWrapper smaller={smaller}>无计划</LockWrapper>
    }
    case ARTICLE_CAT.REJECT_STALE: {
      return <LockWrapper smaller={smaller}>陈帖归档</LockWrapper>
    }
    case ARTICLE_CAT.REJECT_REPRO: {
      return <LockWrapper smaller={smaller}>无法重现</LockWrapper>
    }
    default:
      return <OtherWrapper>其它</OtherWrapper>
  }
}

export default memo(Label)
