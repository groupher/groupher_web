import styled from 'styled-components'

import type { TTestable, TMetric, TActive } from '@/spec'
import Img from '@/Img'
import css, { theme, animate } from '@/css'

type TWrapper = { metric: TMetric } & TTestable
export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.column('align-center', 'justify-start')};
  /* ${({ metric }) => css.fitStickerWidth(metric)}; */
  min-height: 60vh;

  ${css.media.mobile`
    display: none;
  `};
`
export const InnerWrapper = styled.div`
  ${css.column('justify-between')}
  height: 100%;
  width: 100%;
`
export const MainWrapper = styled.div`
  ${css.column('align-center')};
`
const Icon = styled(Img)`
  ${css.size(22)};
  transition: all 0.2s;
  cursor: pointer;
`
export const CommunityIcon = styled(Icon)``
export const CommunityTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  margin-bottom: 8px;
`
export const Divider = styled.div`
  width: 50px;
  height: 1px;
  background: #004250;
  margin-top: 20px;
  margin-bottom: 20px;
`
export const LikeIcon = styled(Icon)`
  fill: #0c5473;
  ${css.size(22)};

  &:hover {
    fill: ${theme('rainbow.red')};
    animation: ${animate.pulse} 0.25s linear;
  }
`
export const CollectIcon = styled(Icon)`
  fill: #0c5473;

  &:hover {
    fill: #107eae;
    cursor: pointer;
  }
`
export const ShareIcon = styled(Icon)`
  fill: #0c5473;
  ${css.size(16)};
  margin-left: -1px;
`
export const Number = styled.div`
  ${css.row('align-baseline')};
  color: ${theme('article.title')};
  font-size: 13px;
  margin-top: 5px;
`
export const Text = styled.div`
  color: ${theme('article.digest')};
  font-size: 11px;
`

export const GoTopWrapper = styled.div<TActive>`
  ${css.row('align-both')};
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: absolute;
  bottom: -200px;
  left: 100px;
  width: 100%;

  animation: ${animate.jump} 0.6s linear;
`
