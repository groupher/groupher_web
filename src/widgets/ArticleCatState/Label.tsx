import { FC, memo } from 'react'

import { ARTICLE_STATE, ARTICLE_CAT } from '@/constant/gtd'

import { Trans } from '@/i18n'
import { isRejectedState } from '@/helper'

import type { TProps as TArticleStateBadgeProps } from '.'

import {
  Wrapper,
  IconWrapper,
  ICON,
  BugWrapper,
  QuestionWrapper,
  OtherWrapper,
} from './styles/label'

type TProps = Pick<TArticleStateBadgeProps, 'cat' | 'smaller' | 'state'>

const Label: FC<TProps> = ({ cat, state, smaller }) => {
  if (isRejectedState(state)) {
    return (
      <Wrapper state={state} smaller={smaller}>
        <IconWrapper>
          <ICON.REJECT />
        </IconWrapper>
        {Trans(state)}
      </Wrapper>
    )
  }

  switch (cat) {
    case ARTICLE_CAT.FEATURE: {
      return (
        <Wrapper state={state} smaller={smaller}>
          <IconWrapper>
            <ICON.FEATURE />
          </IconWrapper>
          {Trans(ARTICLE_CAT.FEATURE)}
        </Wrapper>
      )
    }

    case ARTICLE_CAT.BUG: {
      return (
        <BugWrapper state={state} smaller={smaller}>
          <IconWrapper>
            <ICON.BUG />
          </IconWrapper>
          {Trans(ARTICLE_CAT.BUG)}
        </BugWrapper>
      )
    }

    case ARTICLE_CAT.QUESTION: {
      if (state === ARTICLE_STATE.RESOLVED) {
        return <QuestionWrapper smaller={smaller}>{Trans(ARTICLE_STATE.RESOLVED)}</QuestionWrapper>
      }

      return (
        <OtherWrapper>
          <IconWrapper>
            <ICON.BUG />
          </IconWrapper>
          {Trans(ARTICLE_CAT.QUESTION)}
        </OtherWrapper>
      )
    }

    default:
      return <OtherWrapper>其它</OtherWrapper>
  }
}

export default memo(Label)
