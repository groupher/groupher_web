import type { FC } from 'react'

import { ARTICLE_CAT } from '@/const/gtd'
import useNameAlias from '@/hooks/useNameAlias'

import type { TProps as TArticleStateBadgeProps } from '.'

import { Wrapper, IconWrapper, Icon } from './styles/label'

type TProps = Pick<TArticleStateBadgeProps, 'cat' | 'smaller'>

const Label: FC<TProps> = ({ cat, smaller }) => {
  const nameAlias = useNameAlias('kanban')

  switch (cat) {
    case ARTICLE_CAT.FEATURE: {
      return (
        <Wrapper $smaller={smaller}>
          <IconWrapper>
            <Icon.FEATURE />
          </IconWrapper>
          {nameAlias[cat.toLowerCase()]?.name}
        </Wrapper>
      )
    }

    case ARTICLE_CAT.BUG: {
      return (
        <Wrapper $smaller={smaller}>
          <IconWrapper>
            <Icon.BUG />
          </IconWrapper>
          {nameAlias[cat.toLowerCase()]?.name}
        </Wrapper>
      )
    }

    case ARTICLE_CAT.QUESTION: {
      return (
        <Wrapper $smaller={smaller}>
          <IconWrapper>
            <Icon.QUESTION />
          </IconWrapper>
          {nameAlias[cat.toLowerCase()]?.name}
        </Wrapper>
      )
    }

    default:
      return <Wrapper $smaller={smaller}>{nameAlias[cat.toLowerCase()]?.name}</Wrapper>
  }
}

export default Label
