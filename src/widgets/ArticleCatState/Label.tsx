import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { ARTICLE_CAT } from '@/constant/gtd'
import useNameAlias from '@/hooks/useNameAlias'

import type { TProps as TArticleStateBadgeProps } from '.'

import { Wrapper, IconWrapper, ICON } from './styles/label'

type TProps = Pick<TArticleStateBadgeProps, 'cat' | 'smaller'>

const Label: FC<TProps> = ({ cat, smaller }) => {
  const nameAlias = useNameAlias('kanban')

  switch (cat) {
    case ARTICLE_CAT.FEATURE: {
      return (
        <Wrapper $smaller={smaller}>
          <IconWrapper>
            <ICON.FEATURE />
          </IconWrapper>
          {nameAlias[cat.toLowerCase()]?.name}
        </Wrapper>
      )
    }

    case ARTICLE_CAT.BUG: {
      return (
        <Wrapper $smaller={smaller}>
          <IconWrapper>
            <ICON.BUG />
          </IconWrapper>
          {nameAlias[cat.toLowerCase()]?.name}
        </Wrapper>
      )
    }

    case ARTICLE_CAT.QUESTION: {
      return (
        <Wrapper $smaller={smaller}>
          <IconWrapper>
            <ICON.QUESTION />
          </IconWrapper>
          {nameAlias[cat.toLowerCase()]?.name}
        </Wrapper>
      )
    }

    default:
      return <Wrapper $smaller={smaller}>{nameAlias[cat.toLowerCase()]?.name}</Wrapper>
  }
}

export default observer(Label)
