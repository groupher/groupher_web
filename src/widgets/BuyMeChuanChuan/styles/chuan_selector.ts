import type { TActive } from '~/spec'
import styled, { css, theme, animate } from '~/css'
import Img from '~/Img'

export const SelectBox = styled.div`
  ${css.row('align-center')};

  margin-top: 10px;
  border: 1px solid;
  border-color: ${theme('article.digest')};
  border-radius: 4px;
  background: ${theme('modal.innerSelectBg')};
  height: 90px;

  background-image: linear-gradient(#51abb2 2px, transparent 2px),
    linear-gradient(90deg, #51abb200 2px, transparent 2px),
    linear-gradient(#5eabb333 1px, transparent 1px),
    linear-gradient(90deg, #5eabb336 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
`

export const ChuanChuanIcon = styled(Img)`
  width: 55px;
  height: 55px;
`

export const Selectors = styled.div`
  ${css.row()};
`
export const By = styled.div`
  ${css.size(40)};
  ${css.row('align-both')};

  font-size: 30px;
  color: ${theme('article.digest')};
  margin-left: -20px;
  padding-bottom: 8px;
  transform: scaleY(0.8);
  opacity: 0.9;
`
export const Circle = styled.div<TActive>`
  ${css.circle(38)};
  ${css.row('align-both')};
  border: 1px solid;
  border-color: ${theme('font')};
  margin-right: 10px;
  color: ${({ active }) => (active ? 'white' : theme('article.title'))};
  background-color: ${({ active }) => (active ? theme('font') : '')};
  &:hover {
    cursor: pointer;
    animation: ${animate.pulse} 0.3s linear;
  }
  transition: background-color 0.2s ease-out;
`
