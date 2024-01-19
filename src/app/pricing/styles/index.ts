import styled, { css, gradientBg, theme, rainbow } from '@/css'
import type { TColor } from '@/spec'

import Button from '@/widgets/Buttons/Button'

export const Wrapper = styled.div`
  max-width: 1200px;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`
export const InnerWrapper = styled.div`
  ${css.row('justify-center')};
  width: 100%;
  gap: 0 35px;
`
type TColumn = TColor & { $opacity?: number }
export const Column = styled.div<TColumn>`
  ${css.column()};
  width: 320px;
  height: 680px;
  padding: 15px 28px;
  border-bottom: 1px solid transparent;
  /* border-bottom-color: ${({ $color }) => ($color === 'BLACK' ? theme('divider') : 'transparent')}; */
  /* box-shadow: ${theme('shadow.md')}; */
  border-radius: 28px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ $color }) => gradientBg($color)};
    opacity: ${({ $opacity }) => $opacity || 1};
    z-index: 0;
  }
`
export const Board = styled.div`
  width: 300px;
  padding: 20px;
  position: absolute;
  left: 10px;
  bottom: 75px;
  height: calc(100% - 270px);
  background: ${theme('htmlBg')};
  border-radius: 35px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  z-index: 2;
`
export const TopTitle = styled.div<TColor>`
  color: ${({ $color }) => rainbow($color)};
  font-size: 15px;
  margin-left: 2px;
  margin-bottom: 10px;
  z-index: 3;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  opacity: 0.8;
  font-size: 15px;
  margin-left: 2px;
  z-index: 3;
`
export const Price = styled.div`
  color: ${theme('article.title')};
  font-size: 26px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 5px;
  opacity: 0.8;
  z-index: 3;

  &:before {
    content: "¥";
    font-size: 22px;
    opacity: 0.6;
    margin-right: 6px;
    color: ${theme('article.digest')};
  }

  &:after {
    content: "元/月";
    font-size: 16px;
    opacity: 0.8;
    margin-left: 6px;
    color: ${theme('article.digest')};
  }
`
export const CancelNote = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  opacity: 0.8;
  z-index: 3;
`
export const UpgradeButton = styled(Button)`
  width: 100%;
`
export const ButtonWrapper = styled.div`
  position: absolute;
  width: 280px;
  bottom: 22px;
  left: 18px;
  z-index: 3;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
  transition: opacity 0.2s ease-in-out;
`
