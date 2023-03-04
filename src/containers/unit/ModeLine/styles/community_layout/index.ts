import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme, zIndex } from '@/utils/css'

import GotoTopSVG from '@/icons/Arrow2Top'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable & { isMenuActive: boolean }>`
  position: fixed;
  left: 0;
  bottom: 15px;
  ${css.flex('align-both')};
  width: 100%;
  height: 35px;
  z-index: ${zIndex.modeLine};
`
export const InnerWrapper = styled.div`
  ${css.flex('justify-between', 'align-center')};
  height: 100%;
  padding: 0 10px;
  width: calc(100% - 50px);

  border-radius: 15px;
`
export const MainMenusWrapper = styled.div`
  ${css.flex('justify-between', 'align-center')};
  flex-grow: 1;
  background: ${theme('alphaBg2')};
  height: 100%;
  padding: 0 16px;
  padding-right: 18px;
  border-radius: 15px;
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: -5px 6px 37px -8px rgba(0, 0, 0, 0.42);
`
export const Go2TopWrapper = styled.div`
  ${css.flex('align-both')};
  width: 40px;
  height: 100%;
  border-radius: 15px;
  margin-left: 8px;
  background: ${theme('alphaBg2')};

  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: -5px 6px 37px -8px rgba(0, 0, 0, 0.42);
`
export const GotoTopIcon = styled(GotoTopSVG)`
  ${css.size(15)};
  fill: ${theme('article.title')};
`
export const MenuItem = styled.div`
  ${css.flex('align-center')};
`
export const MenuDesc = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
`
