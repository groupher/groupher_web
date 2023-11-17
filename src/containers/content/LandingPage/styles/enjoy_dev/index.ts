import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/css'

import SeedSVG from '@/icons/Seed'
import TadaSVG from '@/icons/Tada'

import NoSVG from '@/icons/CloseCross'
import YesSVG from '@/icons/CheckBold'

type TPos = { top: string; left: string }

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-both')};
  width: 100%;
  height: auto;
`
export const Slogan = styled.div`
  ${css.column('align-both')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 38px;
  font-weight: 500;

  text-shadow: rgb(0 0 0 / 8%) 0px 10px 20px;
  opacity: 0.9;

  ${css.media.mobile`
    font-size: 22px;
    font-weight: 600;
  `};
`
export const Desc = styled.div`
  ${css.row('align-center')};
  font-size: 17px;
  color: ${theme('article.digest')};
  margin-top: 12px;
  opacity: 0.8;

  ${css.media.mobile`
    font-size: 15px;
    text-align: center;
    padding: 0 20px;
  `};
`
export const Wall = styled.div`
  ${css.column('align-both')};
  width: 80%;
  height: auto;
  margin-top: 35px;
  position: relative;

  ${css.media.mobile`
    width: 2000%;
    overflow: scroll;
    transform: scale(0.7);
    padding-left: 600px;

    padding-left: 600px;
    height: 980px;
    overflow-y: hidden;
    margin-top: -100px;
  `};
`
export const BgWrapper = styled.div`
  opacity: 0.2;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: calc(100% + 60px);

  background-image: linear-gradient(#d9d9d9 1.5px, transparent 1.5px),
    linear-gradient(to right, #d9d9d9 1.5px, transparent 1.5px);
  background-size: 15px 15px;
  background-color: rgba(255, 255, 255, 0);

  border-radius: 30px;
`
export const BadWrapper = styled.div`
  ${css.row('align-both')};
  gap: 15px 0px;
  height: 140px;
  width: 100%;
  padding: 40px 80px;
  margin-top: -20px;

  ${css.media.mobile`
    transform: scale(1.2);
  `};
`
export const ConnectLine = styled.div`
  width: 60px;
  height: 2px;
  margin-top: -1px;

  border-bottom: 2px solid transparent;
  border-image: linear-gradient(
    0.35turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')}
  );

  border-image-slice: 1;
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
  ${css.size(16)};
  fill: ${theme('article.digest')};
  opacity: 0.3;
  z-index: 1;

  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};

  &:hover {
    fill: yellowgreen;
    opacity: 1;
    transform: scale(1.8);
  }

  transition: all 0.2s;
`

export const TadaIcon = styled(TadaSVG)<TPos>`
  ${css.size(16)};

  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};

  filter: saturate(0) drop-shadow(2px 4px 6px #dddddd);

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
export const GoodWrapper = styled.div`
  ${css.row('align-both', 'justify-between')};
  position: relative;
  height: 560px;
  width: 1000px;
  padding-left: 40px;
  padding-right: 40px;
`
export const PositionWrapper = styled.div<TPos>`
  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};
`

export const VS = styled.div`
  font-size: 50px;
  font-weight: 600;
  font-style: italic;
  color: ${theme('divider')};
  margin-top: 50px;
  margin-bottom: 40px;
  margin-left: -10px;
  padding: 0 20px;
  border-radius: 30px;
  position: relative;
  background: white;
`
const BottonNote = styled.div`
  ${css.row('align-center')};
  margin-top: 8px;
  color: ${theme('article.digest')};
  font-size: 20px;
  position: relative;
  z-index: 1;

  &:before {
    content: ' ';
    display: block;
    height: 90%;
    width: 100%;
    margin-left: -3px;
    margin-right: -3px;
    position: absolute;
    background: rgba(234, 221, 6, 0.3);
    transform: rotate(2deg);
    top: -1px;
    left: -1px;
    border-radius: 20% 25% 20% 24%;
    padding: 10px 3px 3px 10px;
    z-index: -1;
  }
`

export const YesNote = styled(BottonNote)`
  margin-top: 60px;
  color: ${theme('rainbow.green')};
  &:before {
    background: #d8ffca40;
  }

  ${css.media.mobile`
    margin-top: 20px;
  `};
`

export const NoNote = styled(BottonNote)`
  color: ${theme('rainbow.red')};

  &:before {
    background: #ffe7e79e;
  }
`

export const YesIcon = styled(YesSVG)`
  fill: ${theme('rainbow.green')};
  ${css.size(18)};
  margin-right: 8px;
  margin-left: -14px;
`
export const NoIcon = styled(NoSVG)`
  fill: ${theme('rainbow.red')};
  ${css.size(18)};
  margin-right: 8px;
  margin-left: -14px;
`
