import styled from 'styled-components'

import type { TTestable, TSpace, TColorName } from '@/spec'

import Button from '@/widgets/Buttons/Button'
import ArrowSVG from '@/icons/ArrowSimple'

// import Img from '@/Img'
import css, { theme } from '@/utils/css'

type TWrapper = { color: TColorName } & TSpace & TTestable
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flex('align-center')};
  position: relative;
  padding: 0 22px;

  height: 120px;
  /* background: #fafafb; */
  background-color: ${({ color }) => theme(`baseColor.${color.toLowerCase()}Bg`)};
  border-radius: 15px;

  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};

  overflow: hidden;
  border-top: 1px solid transparent;
`
export const BgWrapper = styled.div`
  position: absolute;
  right: 22%;
  top: -50px;
  height: 100%;
  width: 30%;
  background-image: url(/pattern/ab-p2.png);
  mix-blend-mode: color-burn;
  transform: scale(0.8) rotate(215deg);
  opacity: 0.7;
`
export const BgWrapper2 = styled.div`
  position: absolute;
  right: 20%;
  bottom: -60px;
  height: 100%;
  width: 30%;
  background-image: url(/pattern/ab-p1.png);
  mix-blend-mode: color-burn;
  transform: rotate(168deg);
  opacity: 0.5;
`
export const Content = styled.div`
  width: 55%;
`
export const Title = styled.span<{ color: TColorName }>`
  font-size: 15px;
  color: ${theme('article.title')};
  font-weight: 600;
  position: relative;
  padding-left: 5px;

  &:after {
    content: '';
    height: 10px;
    width: calc(100% + 10px);
    border-radius: 5px;
    position: absolute;
    left: 0;
    bottom: -2px;
    background-color: ${({ color }) => theme(`baseColor.${color.toLowerCase()}`)};
    opacity: 0.25;
  }
`
export const Desc = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  ${css.lineClamp(2)};
  margin-top: 10px;
`
export const LinkButton = styled(Button)`
  border-radius: 6px;
  background: ${theme('alphaBg')};
  border: none;

  &:hover {
    background: ${theme('alphaBg2')};
    color: ${theme('baseColor.red')};
  }

  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`
export const LinkText = styled.div`
  color: ${theme('baseColor.red')};
  opacity: 0.8;
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(14)};
  transform: rotate(180deg);
  margin-left: 2px;
  margin-right: -5px;
  fill: ${theme('baseColor.red')};
`