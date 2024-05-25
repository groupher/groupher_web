import { values, includes } from 'ramda'

import type { TPostLayout, TThread } from '@/spec'
import { CARD_THREAD } from '@/const/thread'
import { POST_LAYOUT } from '@/const/layout'
import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row()};
  width: 100%;
`

type TMainWrapper = {
  $thread?: TThread
  $postLayout?: TPostLayout
}

export const SidebarWrapper = styled.div<TMainWrapper>`
  flex-grow: 1;
  width: 100%;
  padding: ${({ $postLayout }) => ($postLayout === POST_LAYOUT.MASONRY ? '0 12%;' : '0 20%;')};
`
export const MainWrapper = styled.div<TMainWrapper>`
  flex-grow: 1;
  width: 100%;

  background: transparent;
  border-radius: 6px;

  margin-top: 12px;
  padding-left: ${({ $thread }) => (includes($thread, values(CARD_THREAD)) ? '15px' : 0)};
  padding-right: ${({ $thread }) => (includes($thread, values(CARD_THREAD)) ? 0 : '80px')};
  margin-right: ${({ $thread }) => (includes($thread, values(CARD_THREAD)) ? '35px' : '50px')};

  border-right: 1px solid;
  border-right-color: ${theme('divider')};

  ${css.media.mobile`
     padding: 0px 18px;
     margin-right: 0;
  `};
`
export const MobileCardsMainWrapper = styled(MainWrapper)`
  padding: 0;
  padding-right: 10px;
`
export const FilterWrapper = styled.div`
  ${css.row('align-center')};
  margin-bottom: 5px;
  height: 40px;

  ${css.media.mobile`
    margin-bottom: 0;
  `};
`
