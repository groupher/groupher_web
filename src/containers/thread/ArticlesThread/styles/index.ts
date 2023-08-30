import styled from 'styled-components'

import { values, includes } from 'ramda'
import type { TThread } from '@/spec'
import { CARD_THREAD } from '@/constant/thread'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.flex()};
  width: 100%;
`

type TMainWrapper = {
  thread?: TThread
  isViewingArticle?: boolean
}

export const SidebarWrapper = styled.div<TMainWrapper>`
  flex-grow: 1;
  width: 100%;
  max-width: 600px;
  margin-left: ${({ isViewingArticle }) => (isViewingArticle ? '2%' : '14%')};

  transition: all 0.2s;
`
export const MainWrapper = styled.div<TMainWrapper>`
  flex-grow: 1;
  width: 100%;

  background: transparent;
  /* background: ${({ thread }) =>
    includes(thread, values(CARD_THREAD)) ? 'transparent' : theme('content.bg')}; */

  border-radius: 6px;

  margin-top: 12px;
  /* padding-top: ${({ thread }) => (includes(thread, values(CARD_THREAD)) ? '13px' : '16px')}; */
  padding-left: ${({ thread }) => (includes(thread, values(CARD_THREAD)) ? '15px' : 0)};
  padding-right: ${({ thread }) => (includes(thread, values(CARD_THREAD)) ? 0 : '80px')};
  margin-right: ${({ thread }) => (includes(thread, values(CARD_THREAD)) ? '35px' : '65px')};

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
export const FilterWrapper = styled.div<{ thread: TThread }>`
  ${css.flex('align-center')};
  margin-bottom: 5px;

  ${css.media.mobile`
    margin-bottom: 0;
  `};
`
