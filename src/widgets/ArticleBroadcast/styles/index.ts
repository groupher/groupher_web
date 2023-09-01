import styled from 'styled-components'

import type { TTestable, TSpace, TColorName } from '@/spec'

import ArrowButton from '@/widgets/Buttons/ArrowButton'
import BroadcastSVG from '@/icons/Broadcast'

// import Img from '@/Img'
import css, { theme } from '@/css'
import { camelize } from '@/utils/fmt'

type TWrapper = { color: TColorName } & TSpace & TTestable
export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('align-center')};
  position: relative;
  padding: 0 22px;

  height: 120px;
  /* background: #fafafb; */
  background-color: ${({ color }) => theme(`baseColor.${color.toLowerCase()}Bg`)};
  border-radius: 15px;

  ${(props) => css.spaceMargins(props)};

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
  opacity: 0.2;
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
  opacity: 0.1;
`
export const Content = styled.div`
  width: 55%;
`
export const Title = styled.span<{ color: TColorName }>`
  ${css.row('align-center')};
  display: inline-flex;
  font-size: 15px;
  color: ${theme('article.title')};
  font-weight: 600;
  position: relative;
  padding-left: 5px;
  z-index: 2;

  &:after {
    content: '';
    height: 10px;
    width: calc(100% + 10px);
    border-radius: 5px;
    position: absolute;
    left: 0;
    bottom: 1px;
    background-color: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)};
    opacity: 0.25;
  }
`
export const Desc = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  ${css.lineClamp(2)};
  margin-top: 10px;
`
export const LinkButton = styled(ArrowButton)<{ color: TColorName }>`
  border-radius: 6px;
  background: ${theme('alphaBg')};
  padding: 6px 15px;
  font-size: 13px;

  &:hover {
    background: ${theme('alphaBg2')};
  }

  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`
export const NotifyIcon = styled(BroadcastSVG)<{ color: TColorName }>`
  ${css.size(24)};
  position: absolute;
  top: 4px;
  left: 130px;
  margin-top: -2px;
  margin-right: 5px;
  transform: rotateZ(20deg) rotateY(180deg);
  mix-blend-mode: color-burn;
  fill: ${({ color }) => theme(`baseColor.${camelize(color)}`)};
  opacity: 0.3;
`
