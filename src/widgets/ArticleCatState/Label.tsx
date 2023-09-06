import { FC, memo } from 'react'

import { ARTICLE_STATE, ARTICLE_CAT } from '@/constant/gtd'

import { Trans } from '@/utils/i18n'
import { isRejectedState } from '@/utils/helper'

import type { TProps as TArticleStateBadgeProps } from '.'

import { Wrapper, BugWrapper, QuestionWrapper, OtherWrapper } from './styles/label'

type TProps = Pick<TArticleStateBadgeProps, 'cat' | 'noBg' | 'smaller' | 'state'>

const Label: FC<TProps> = ({ cat, state, noBg, smaller }) => {
  if (isRejectedState(state)) {
    return (
      <Wrapper state={state} smaller={smaller} noBg>
        {Trans(state)}
      </Wrapper>
    )
  }

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
      if (state === ARTICLE_STATE.RESOLVED) {
        return <QuestionWrapper smaller={smaller}>{Trans(ARTICLE_STATE.RESOLVED)}</QuestionWrapper>
      }

      return <OtherWrapper>{Trans(ARTICLE_CAT.QUESTION)}</OtherWrapper>
    }

    default:
      return <OtherWrapper>其它</OtherWrapper>
  }
}

export default memo(Label)
