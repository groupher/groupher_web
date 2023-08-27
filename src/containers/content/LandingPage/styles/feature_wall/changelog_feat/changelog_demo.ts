import styled from 'styled-components'

import { Bar as BarBase } from '@/widgets/Common'

import css, { theme, animate } from '@/css'

import StarSVG from './Star'

export const Wrapper = styled.div`
  ${css.flexColumn('align-both')};
  position: relative;
  padding-left: 10px;
`
export const Header = styled.div`
  ${css.flexColumn()};
  width: 260px;
  margin-top: 25px;
  margin-bottom: 10px;
`
export const Cover = styled.div`
  width: 260px;
  height: 140px;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;

  background: linear-gradient(137deg, rgba(244, 183, 180, 1) 52%, rgba(235, 171, 62, 0.3) 100%);
  backdrop-filter: blur(5px);

  opacity: 0.4;
`
export const Title = styled.div`
  ${css.flex('align-center')};
  color: #f9b7b6;
  font-weight: 600;
  font-size: 12px;
`
export const GreyTitle = styled(Title)`
  color: ${theme('article.digest')};
`
export const TagsWrapper = styled.div`
  ${css.flex('align-center')};
  margin-top: 10px;
`
export const Content = styled.div`
  ${css.flexColumn()};
  margin-top: 15px;
  width: 260px;
  gap: 10px;
`
export const Footer = styled.div`
  ${css.flex('align-center', 'justify-between')};
  margin-top: 20px;
  width: 260px;
`
export const Divider = styled.div`
  width: 300px;
  height: 1px;

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(0.35turn, transparent, #f9b7b6, #f9b7b6, #f9b7b6, transparent);

  border-image-slice: 1;

  margin-top: 30px;

  opacity: 0.5;
`

export const Bar = styled(BarBase)`
  background: #f9b7b6;
`

export const GreyBar = styled(BarBase)`
  background: ${theme('article.digest')};
`
export const Previous = styled.div`
  opacity: 0.2;
`
export const StarIcon = styled(StarSVG)`
  ${css.size(13)};
  fill: #f9b7b6;

  position: absolute;
  top: 60px;
  right: 100px;

  filter: drop-shadow(2px 4px 6px #f1cac9);
  z-index: 3;
  animation: ${animate.blinker} 3s linear infinite alternate;

  ${css.media.mobile`
    animation: none;
  `};
`

export const StarIcon2 = styled(StarSVG)`
  ${css.size(20)};
  fill: #ffd67e;

  position: absolute;
  top: 170px;
  right: 180px;

  filter: drop-shadow(2px 4px 6px #f1cac9);
  z-index: 3;
  animation: ${animate.breath} 2s linear infinite alternate;

  ${css.media.mobile`
    animation: none;
  `};
`

export const StarIcon3 = styled(StarSVG)`
  ${css.size(15)};
  fill: #f9b7b6;

  position: absolute;
  top: 160px;
  left: 100px;

  filter: drop-shadow(2px 4px 6px #f1cac9);
  z-index: 3;

  animation: ${animate.breath} 2s linear infinite alternate;

  ${css.media.mobile`
    animation: none;
  `};
`
