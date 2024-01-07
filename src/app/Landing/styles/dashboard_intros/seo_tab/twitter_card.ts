import styled, { css, theme } from '@/css'

import CommentSVG from '@/icons/Comment'
import HeartSVG from '@/icons/Heart'
import RetweetSVG from '@/icons/Retweet'
import ViewSVG from '@/icons/TwView'
import TwMarkSVG from '@/icons/BookMark'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 16px;
  padding-bottom: 5px;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 445px;
  height: 160px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px -1px 24px;
  z-index: 2;
  position: absolute;
  bottom: 8px;
  left: 8px;
`
export const Card = styled.div`
  ${css.row('align-center')};
  width: 100%;
  border-radius: 14px;
  height: 100px;
  border: 1px solid;
  border-color: ${theme('divider')};
  overflow: hidden;
`
export const Cover = styled.div`
  ${css.size(100)};
  min-widtH: 100px;
  background: ${theme('hoverBg')};
  border-right: 1px solid;
  border-right-color: ${theme('divider')};
`
export const Content = styled.div`
  margin-left: 10px;
`
export const Url = styled.div`
  color: rgb(83, 100, 113);
  font-size: 13px;
`
export const Title = styled.div`
  color: rgb(15, 20, 25);
  font-size: 14px;
  margin-bottom: 2px;
`

export const Footer = styled.div`
  ${css.row('align-center')};
  margin-top: 10px;
  padding: 0 10px;
`
export const CommentIcon = styled(CommentSVG)`
  ${css.size(11)};
  fill: ${theme('hint')};
`
export const HeartIcon = styled(HeartSVG)`
  ${css.size(15)};
  fill: tomato;
`
export const RetweetIcon = styled(RetweetSVG)`
  ${css.size(15)};
  fill: ${theme('hint')};
`
export const ViewIcon = styled(ViewSVG)`
  ${css.size(15)};
  fill: ${theme('hint')};
`
export const MarkIcon = styled(TwMarkSVG)`
  ${css.size(16)};
  fill: #009BEC;
`
export const Count = styled.div`
  font-size: 13px;
  fill: ${theme('article.title')};
  margin-left: 8px;
`
