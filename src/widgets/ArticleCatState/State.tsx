import { FC, memo } from 'react'

import { ARTICLE_STATE } from '@/constant'

import type { TProps as TArticleStateBadgeProps } from './index'

import {
  Wrapper,
  NoBgWrapper,
  WipIcon,
  TODOIcon,
  DoneIcon,
  ResolveIcon,
  RejectIcon,
  //
  NoBgIcon,
} from './styles/state'

type TProps = Pick<TArticleStateBadgeProps, 'state' | 'cat' | 'smaller'>

const State: FC<TProps> = ({ state, cat, smaller }) => {
  switch (state) {
    case ARTICLE_STATE.DONE: {
      return (
        <Wrapper cat={cat} smaller={smaller}>
          <DoneIcon cat={cat} smaller={smaller} />
        </Wrapper>
      )
    }

    case ARTICLE_STATE.WIP: {
      return (
        <Wrapper cat={cat} smaller={smaller}>
          <WipIcon cat={cat} smaller={smaller} />
        </Wrapper>
      )
    }

    case ARTICLE_STATE.TODO: {
      return (
        <Wrapper cat={cat} smaller={smaller}>
          <TODOIcon cat={cat} smaller={smaller} />
        </Wrapper>
      )
    }

    case ARTICLE_STATE.RESOLVE: {
      return (
        <NoBgWrapper>
          <ResolveIcon smaller={smaller} />
        </NoBgWrapper>
      )
    }

    case ARTICLE_STATE.REJECT_STALE:
    case ARTICLE_STATE.REJECT_NO_PLAN:
    case ARTICLE_STATE.REJECT_NO_FIX:
    case ARTICLE_STATE.REJECT_DUP: {
      return (
        <NoBgWrapper>
          <RejectIcon smaller={smaller} />
        </NoBgWrapper>
      )
    }

    default: {
      const Icon = NoBgIcon[cat]
      if (!Icon) return null

      return (
        <NoBgWrapper>
          <Icon />
        </NoBgWrapper>
      )
    }
  }
}

export default memo(State)
