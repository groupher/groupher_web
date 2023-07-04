import styled from 'styled-components'

import type { TTestable } from '@/spec'

import { COLORS } from '@/constant/colors'

import InfoSVG from '@/icons/Info'

// import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('justify-between')};
  flex-wrap: wrap;

  border-bottom: 1px solid;
  border-color: ${theme('divider')};
  /* border-radius: 5px; */
  /* box-shadow: rgb(0 0 0 / 7%) 0px 0px 24px; */
  /* padding: 30px 10px; */
  padding: 20px 0;
  padding-top: 15px;
  margin-bottom: 25px;
  margin-top: -8px;
`
export const Header = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 8px;
  width: 100%;
`
export const Title = styled.h2<{ color: string }>`
  color: ${theme('article.title')};
  padding: 0 6px;
  padding-right: 8px;
  margin-left: -4px;
  position: relative;
  z-index: 2;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 4px;
    background: ${({ color }) => `linear-gradient(180deg, transparent 30%, ${COLORS[color]} 0)`};
    /* background: ${({ color }) => `linear-gradient(-90deg, transparent 60%, ${color} 0)`}; */
    opacity: 0.2;
    width: 100%;
    height: 15px;
    border-radius: 3px;
    z-index: -1;
  }
`
export const Desc = styled.p`
  line-height: 1.75em;
  font-size: 13px;
  color: ${theme('article.digest')};
`
export const InfoIcon = styled(InfoSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
  margin-right: 2px;
  margin-bottom: 3px;
  opacity: 0.7;

  /* transform: rotate(45deg); */
`
