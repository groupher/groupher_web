import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TArticleState, TActive, TColor } from '@/spec'
import { ARTICLE_STATE } from '@/constant/gtd'

import { Trans } from '@/i18n'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import {
  Wrapper,
  Hint,
  LabelWrapper,
  StateTitle,
  TodoIcon,
  WipIcon,
  DoneIcon,
  RejectIcon,
} from './styles/active_label'

type TProps = {
  state: TArticleState
}

type TTIcon = Omit<TProps, 'mode'> & TActive & TColor
const Icon: FC<TTIcon> = ({ state, $active, $color }) => {
  switch (state) {
    case ARTICLE_STATE.TODO: {
      return <TodoIcon $active={$active} $color={$color} />
    }
    case ARTICLE_STATE.WIP: {
      return <WipIcon $active={$active} $color={$color} />
    }
    case ARTICLE_STATE.DONE: {
      return <DoneIcon $active={$active} $color={$color} />
    }
    default: {
      return <RejectIcon $active={$active} $color={$color} />
    }
  }
}

const ActiveLabel: FC<TProps> = ({ state }) => {
  const $active = state && state !== ARTICLE_STATE.ALL
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper>
      <Hint>状态</Hint>
      <LabelWrapper>
        <Icon state={state} $active={$active} $color={primaryColor} />
        <StateTitle>{Trans(state)}</StateTitle>
      </LabelWrapper>
    </Wrapper>
  )
}

export default observer(ActiveLabel)
