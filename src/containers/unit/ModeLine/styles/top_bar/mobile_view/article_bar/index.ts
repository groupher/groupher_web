import type { TActive } from '@/spec'
import Img from '@/Img'
import styled, { css, theme, zIndex } from '@/css'

export const Wrapper = styled.div<TActive>`
  ${css.row('justify-start')};
  position: fixed;
  z-index: ${zIndex.header};
  top: ${({ visible }) => (visible ? '0' : '-33px')};
  width: 100%;
  /* TODO: move namespace to modeline */
  background: ${theme('header.fixed')};
  opacity: ${({ visible }) => (visible ? 1 : '0')};
  height: 35px;
  padding-left: 5vw;

  transition: top 0.3s;
  transition-delay: 1s;
`
export const InnerWrapper = styled.div`
  width: 100%;
  height: 33px;
  ${css.row('align-center', 'justify-between')};
  padding-left: 0;
  padding-right: 0vw;
  transition: all 0.2s;
`
export const BaseInfo = styled.div`
  ${css.row('align-center')};
  height: 100%;
`
export const Avatar = styled(Img)`
  ${css.circle(16)};
  margin-top: -1px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
  margin-left: 12px;
  ${css.cutRest('60vw')};
`
