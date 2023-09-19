import { FC } from 'react'

import type { TArticleState, TArticleCatMode } from '@/spec'
import { ARTICLE_STATE, ARTICLE_STATE_MODE } from '@/constant/gtd'

import { Trans } from '@/i18n'

import {
  Wrapper,
  Item,
  StateTitle,
  TodoIcon,
  WipIcon,
  DoneIcon,
  RejectIcon,
  IconWrapper,
} from './styles/active_state'

type TProps = {
  activeState: TArticleState
  mode?: TArticleCatMode
}

type TTIcon = Omit<TProps, 'mode'>
const Icon: FC<TTIcon> = ({ activeState }) => {
  switch (activeState) {
    case ARTICLE_STATE.TODO: {
      return <TodoIcon />
    }
    case ARTICLE_STATE.WIP: {
      return <WipIcon />
    }
    case ARTICLE_STATE.DONE: {
      return <DoneIcon />
    }
    default: {
      return <RejectIcon />
    }
  }
}

const ActiveState: FC<TProps> = ({ activeState, mode = ARTICLE_STATE_MODE.FILTER }) => {
  return (
    <Wrapper>
      {activeState ? (
        <Item>
          <IconWrapper>
            <Icon activeState={activeState} />
          </IconWrapper>
          <StateTitle>{Trans(activeState)}</StateTitle>
        </Item>
      ) : (
        <>{mode === ARTICLE_STATE_MODE.FILTER ? '状态' : '未设置'}</>
      )}
    </Wrapper>
  )
}

export default ActiveState
