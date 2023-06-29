import { FC, memo } from 'react'

import { ARTICLE_STATE } from '@/constant/gtd'

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

type TProps = Pick<TArticleStateBadgeProps, 'state' | 'cat' | 'smaller' | 'noBg'>

const State: FC<TProps> = ({ state, cat, smaller, noBg }) => {
  switch (state) {
    case ARTICLE_STATE.DONE: {
      return (
        <Wrapper cat={cat} smaller={smaller} noBg={noBg}>
          <DoneIcon cat={cat} smaller={smaller} />
        </Wrapper>
      )
    }

    case ARTICLE_STATE.WIP: {
      return (
        <Wrapper cat={cat} smaller={smaller} noBg={noBg}>
          <WipIcon cat={cat} smaller={smaller} />
        </Wrapper>
      )
    }

    case ARTICLE_STATE.TODO: {
      return (
        <Wrapper cat={cat} smaller={smaller} noBg={noBg}>
          <TODOIcon cat={cat} smaller={smaller} />
        </Wrapper>
      )
    }

    case ARTICLE_STATE.RESOLVED: {
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
