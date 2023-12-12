import type { TTestable } from '@/spec'
import styled, { css, animate, theme, zIndex } from '@/css'

import Img from '@/Img'
import GotoTopSVG from '@/icons/Arrow2Top'
import MoreSVG from '@/icons/menu/MoreL'

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
  height: 35px;
  z-index: ${zIndex.modeLine};

  animation: ${animate.fadeInUp} 0.2s linear;
`
export const InnerWrapper = styled.div<{ expand: boolean }>`
  ${css.row('justify-between', 'align-center')};
  height: 100%;
  padding: 0 10px;
  /* width: calc(100% - 45px); */
  width: ${({ expand }) => (expand ? 'calc(100% - 26px)' : 'calc(100% - 70px)')};
  border-radius: 15px;

  transition: all 0.1s;
`
export const MoreIcon = styled(MoreSVG)`
  width: 14px;
  height: 25px;
  fill: ${theme('article.info')};
  opacity: 0.6;
  margin-right: -10px;
  margin-top: -1px;
`

export const MainMenusWrapper = styled.div`
  ${css.row('justify-between', 'align-center')};
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
export const CommunityLogo = styled(Img)`
  ${css.size(13)};
  margin-left: -4px;
  margin-right: 2px;
`

export const Go2TopWrapper = styled.div`
  ${css.row('align-both')};
  width: 36px;
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
  ${css.row('align-center')};
`
export const MenuDesc = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
`
