import { FC } from 'react'
import { observer } from 'mobx-react'

import { ARTICLE_CAT } from '@/constant/gtd'
import useNameAlias from '@/hooks/useNameAlias'

import { isRejectedState } from '@/helper'

import type { TProps as TArticleStateBadgeProps } from '.'

import { Wrapper, IconWrapper, ICON } from './styles/label'

type TProps = Pick<TArticleStateBadgeProps, 'cat' | 'smaller' | 'state'>

const Label: FC<TProps> = ({ cat, state, smaller }) => {
  const nameAlias = useNameAlias('kanban')

  if (isRejectedState(state)) {
    return (
      <Wrapper state={state} $smaller={smaller}>
        <IconWrapper>
          <ICON.REJECT />
        </IconWrapper>
        {nameAlias[cat.toLowerCase()].name}
      </Wrapper>
    )
  }

  switch (cat) {
    case ARTICLE_CAT.FEATURE: {
      return (
        <Wrapper state={state} $smaller={smaller}>
          <IconWrapper>
            <ICON.FEATURE />
          </IconWrapper>
          {nameAlias[cat.toLowerCase()].name}
        </Wrapper>
      )
    }

    case ARTICLE_CAT.BUG: {
      return (
        <Wrapper state={state} $smaller={smaller}>
          <IconWrapper>
            <ICON.BUG />
          </IconWrapper>
          {nameAlias[cat.toLowerCase()].name}
        </Wrapper>
      )
    }

    case ARTICLE_CAT.QUESTION: {
      return (
        <Wrapper state={state} $smaller={smaller}>
          <IconWrapper>
            <ICON.QUESTION />
          </IconWrapper>
          {nameAlias[cat.toLowerCase()].name}
        </Wrapper>
      )
    }

    default:
      return (
        <Wrapper state={state} $smaller={smaller}>
          {nameAlias[cat.toLowerCase()].name}
        </Wrapper>
      )
  }
}

export default observer(Label)
