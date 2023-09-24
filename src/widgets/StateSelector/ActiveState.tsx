import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TArticleState, TArticleCatMode, TActive, TPrimaryColor } from '@/spec'
import { ARTICLE_STATE, ARTICLE_STATE_MODE } from '@/constant/gtd'

import { Trans } from '@/i18n'
import usePrimaryColor from '@/hooks/usePrimaryColor'

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

type TTIcon = Omit<TProps, 'mode'> & TActive & TPrimaryColor
const Icon: FC<TTIcon> = ({ activeState, $active, primaryColor }) => {
  switch (activeState) {
    case ARTICLE_STATE.TODO: {
      return <TodoIcon $active={$active} primaryColor={primaryColor} />
    }
    case ARTICLE_STATE.WIP: {
      return <WipIcon $active={$active} primaryColor={primaryColor} />
    }
    case ARTICLE_STATE.DONE: {
      return <DoneIcon $active={$active} primaryColor={primaryColor} />
    }
    default: {
      return <RejectIcon $active={$active} primaryColor={primaryColor} />
    }
  }
}

const ActiveState: FC<TProps> = ({ activeState, mode = ARTICLE_STATE_MODE.FILTER }) => {
  const $active = activeState && activeState !== ARTICLE_STATE.ALL
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper>
      {activeState ? (
        <Item>
          <IconWrapper>
            <Icon activeState={activeState} $active={$active} primaryColor={primaryColor} />
          </IconWrapper>
          <StateTitle $active={$active} primaryColor={primaryColor}>
            {Trans(activeState)}
          </StateTitle>
        </Item>
      ) : (
        <>{mode === ARTICLE_STATE_MODE.FILTER ? '状态' : '未设置'}</>
      )}
    </Wrapper>
  )
}

export default observer(ActiveState)
