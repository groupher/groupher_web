import { FC } from 'react'

import { TArticleState } from '@/spec'
import { ARTICLE_STATE } from '@/constant'

import { Trans } from '@/utils/i18n'

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
}

const Icon: FC<TProps> = ({ activeState }) => {
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

const ActiveState: FC<TProps> = ({ activeState }) => {
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
        <>未设置</>
      )}
    </Wrapper>
  )
}

export default ActiveState
