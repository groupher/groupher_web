import styled from 'styled-components'

import css, { theme } from '@/css'

import SeedSVG from '@/icons/Seed'
import TadaSVG from '@/icons/Tada'

import NoSVG from '@/icons/CloseCross'
import YesSVG from '@/icons/CheckBold'

type TPos = { top: string; left: string }

export const Wrapper = styled.div`
  ${css.row('align-both', 'justify-between')};
  position: relative;
  height: 560px;
  width: 1000px;
  padding-left: 40px;
  padding-right: 40px;
  transform: scale(0.9);
`

export const MainConnectLine = styled.div<TPos>`
  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};

  width: 310px;
  height: 2px;
  z-index: -1;

  border-bottom: 2px solid transparent;
  border-image: linear-gradient(0.32turn, transparent, transparent, #dddddd, #dddddd, #dddddd);
  border-image-slice: 1;

  filter: drop-shadow(2px 4px 6px lightgrey);
`

export const SeedIcon = styled(SeedSVG)<TPos>`
  ${css.size(18)};
  fill: ${theme('rainbow.green')};
  opacity: 0.6;
  z-index: 1;

  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};

  &:hover {
    transform: scale(1.8);
  }

  transition: all 0.2s;
`

export const TadaIcon = styled(TadaSVG)<TPos>`
  ${css.size(20)};

  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};

  filter: saturate(0.8) drop-shadow(2px 4px 6px #dddddd);

  &:hover {
    filter: saturate(1);
    transform: scale(1.8);
  }

  transition: all 0.2s;
`
export const HeadConnectLine = styled.div<TPos>`
  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};
  width: 50px;
  height: 2px;
  z-index: -1;
  border-bottom: 2px dashed;
  border-bottom-color: #dddddd;
  filter: drop-shadow(2px 4px 6px lightgrey);
`
export const TailConnectLine = styled(HeadConnectLine)`
  width: 50px;
`
export const PositionWrapper = styled.div<TPos>`
  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};
`
