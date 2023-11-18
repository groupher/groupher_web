import styled from 'styled-components'

import type { TSpace, TTestable } from '@/spec'
import css, { animate, theme, zIndex } from '@/css'

import GotoTopSVG from '@/icons/Arrow2Top'
import GotoBackSVG from '@/icons/Arrow'

type TWrapper = TTestable & { isMenuActive: boolean; show: boolean }
export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.row('align-both')};
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: fixed;
  left: 0;
  bottom: 25px;
  width: 100%;
  height: 38px;
  z-index: ${zIndex.modeLine};

  animation: ${animate.fadeInUp} 0.2s linear;
`
export const InnerWrapper = styled.div<{ expand: boolean }>`
  ${css.row('justify-between', 'align-center')};
  height: 100%;
  padding: 0 10px;
  /* width: calc(100% - 45px); */
  width: calc(100% - 25px);
  border-radius: 15px;

  transition: all 0.1s;
`

export const MainMenusWrapper = styled.div`
  ${css.row('justify-between', 'align-center')};
  flex-grow: 1;
  background: ${theme('alphaBg2')};
  height: 100%;
  padding: 0 8px;
  border-radius: 15px;
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: -5px 6px 37px -8px rgba(0, 0, 0, 0.32);
`

export const ActionBallWrapper = styled.div<TSpace>`
  ${css.row('align-both')};
  width: 35px;
  height: 34px;
  border-radius: 15px;
  background: ${theme('alphaBg2')};

  margin-left: ${({ left }) => `${left || 0}px`};
  margin-right: ${({ right }) => `${right || 0}px`};

  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: -5px 6px 37px -8px rgba(0, 0, 0, 0.62);
`
export const GoBackIcon = styled(GotoBackSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
`
export const GotoTopIcon = styled(GotoTopSVG)`
  ${css.size(15)};
  fill: ${theme('article.title')};
`
export const MenuItem = styled.div`
  ${css.row('align-center')};
`
export const MenuDesc = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
`
