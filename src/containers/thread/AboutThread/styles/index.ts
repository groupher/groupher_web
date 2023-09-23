import styled from 'styled-components'

import type { TBannerLayout, TTestable } from '@/spec'
import css, { theme } from '@/css'
import { BANNER_LAYOUT } from '@/constant'

type TWrapper = TTestable & { bannerLayout: TBannerLayout }
export const Wrapper = styled.div.attrs<TWrapper>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('align-start')};
  width: 100%;

  padding-left: ${({ bannerLayout }) => (bannerLayout === BANNER_LAYOUT.SIDEBAR ? '90px' : '')};
  ${({ bannerLayout }) => (bannerLayout === BANNER_LAYOUT.TABBER ? 'padding: 0 6px;' : '')};

  ${css.media.mobile`
    ${css.column('align-start')};
  `};
`
export const MainWrapper = styled.div<{ isSidebarLayout: boolean }>`
  width: auto;
  min-height: 550px;
  flex-grow: 1;

  background: transparent;
  border-radius: 6px;
  margin-top: 25px;
  padding-left: ${({ isSidebarLayout }) => (isSidebarLayout ? '60px' : '')};

  ${css.media.mobile`
    width: 100%;
  `};
`
export const Block = styled.div`
  padding-bottom: 30px;
  width: 620px;

  ${css.media.mobile`
    width: 100%;
  `};
`
export const IntroBlock = styled(Block)`
  padding-right: 20px;
`
export const StateBlock = styled(Block)`
  padding-right: 0;
`
export const MemberBlock = styled(Block)`
  border-bottom: none;
`
export const Title = styled.div`
  font-size: 14px;
  color: ${theme('article.digest')};
  font-weight: 600;
  margin-bottom: 18px;
`
export const Desc = styled.div`
  font-size: 14.5px;
  color: ${theme('article.digest')};
  line-height: 1.8;
`
