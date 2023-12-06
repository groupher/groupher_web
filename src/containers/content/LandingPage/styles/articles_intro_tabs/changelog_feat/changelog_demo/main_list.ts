import styled from 'styled-components'

import UpvoteSVG from '@/icons/Upvote'

import { Bar as BarBase } from '@/widgets/Common'

import css, { theme, animate } from '@/css'

import StarSVG from '../Star'

export const Wrapper = styled.div`
  ${css.column('align-start')};
  width: 360px;
  height: 460px;
  z-index: 2;
  background: ${theme('htmlBg')};
  border-radius: 10px;
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgba(100, 100, 111, 0.1) 1px 2px 29px 0px;

  position: relative;
  padding-left: 40px;
  margin-top: 18px;
`
export const Header = styled.div`
  ${css.column()};
  width: 200px;
  margin-top: 25px;
  margin-bottom: 10px;
`
export const Cover = styled.div`
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 100px;
  border-radius: 5px;
  margin-bottom: 5px;

  background: ${theme('hoverBg')};
  border: 1px dotted;
  border-color: ${theme('hoverBg')};
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  font-weight: 500;
  font-size: 16px;
`
export const Version = styled.span`
  color: ${theme('hint')};
  opacity: 0.8;
  font-size: 15px;
  margin-left: 8px;
`
export const TagsWrapper = styled.div`
  ${css.row('align-center')};
  margin-top: 2px;
  color: ${theme('hint')};
  gap: 0 8px;
`
export const TagItem = styled.div`
  ${css.row('align-center')};
  font-size: 12px;
`
export const Content = styled.div`
  ${css.column()};
  margin-top: 15px;
  width: 200px;
  gap: 10px;
`
export const Footer = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-top: 14px;
  width: 200px;
`
export const UpvoteWrapper = styled.div`
  ${css.row('align-both')};
  margin-left: -4px;
  height: 18px;
  width: 38px;
  opacity: 0.8;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 4px;
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(11)};
  fill: ${theme('article.digest')};
`
export const UpvoteCount = styled.div`
  color: ${theme('article.digest')};
  font-weight: 500;
  font-size: 10px;
  margin-left: 2px;
`
export const UsersWrapper = styled.div`
  transform: scale(0.85);
  margin-left: 3px;
  opacity: 0.8;
`
export const PublishDate = styled.div`
  color: ${theme('hint')};
  font-size: 10px;
  opacity: 0.8;
`
export const Divider = styled.div`
  width: 300px;
  height: 1px;
  background: ${theme('divider')};
  margin-top: 30px;
`
export const Bar = styled(BarBase)`
  background: ${theme('hint')};
`
export const Previous = styled.div`
  opacity: 0.75;
`
export const StarIcon = styled(StarSVG)`
  ${css.size(13)};
  fill: ${theme('rainbow.orange')};

  position: absolute;
  top: 140px;
  left: 30px;

  filter: drop-shadow(2px 4px 6px #f1cac9);
  z-index: 3;
  animation: ${animate.breath} 2s linear infinite alternate;
`

export const StarIcon2 = styled(StarSVG)`
  ${css.size(20)};
  fill: #ffd67e;

  position: absolute;
  top: 70px;
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
