import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import ShareSVG from '@/icons/Share'
import QuestionSVG from '@/icons/Question'
import BookSVG from '@/icons/Book'
import { Bar as BarBase } from '@/widgets/Common'

import ArrowSimple from '@/icons/ArrowSimple'

export const Wrapper = styled.div`
  ${css.flex()};
  width: 100%;
  padding: 30px 40px;
`
export const Sidebar = styled.div`
  width: 115px;
  height: 340px;
  border-right: 1px solid;
  border-right-color: ${theme('divider')};
`
export const Content = styled.div`
  ${css.flexColumn('align-center')};
  flex-grow: 1;
  width: 260px;
  gap: 10px;
  padding-left: 15px;
`
export const InnerContent = styled.div`
  ${css.flexColumn()};
  width: 260px;
  position: relative;
`
export const ShareIcon = styled(ShareSVG)`
  ${css.size(12)};
  fill: #e9c79a;
  position: absolute;
  top: 11px;
  right: -1px;
`

export const Footer = styled.div`
  ${css.flex('align-center')};
  margin-top: 20px;
  width: 100%;
  width: 270px;
`
const ArrowIcon = styled(ArrowSimple)`
  ${css.size(18)};
  fill: #aac387;
`
export const LeftArrowIcon = styled(ArrowIcon)``
export const RightArrowIcon = styled(ArrowIcon)`
  transform: rotate(180deg);
`
export const BookIcon = styled(BookSVG)`
  ${css.size(15)};
  fill: #e9c79a;
  z-index: 1;
`
export const QuestionIcon = styled(QuestionSVG)`
  ${css.size(12)};
  fill: #e9c79a;
  z-index: 1;
`
export const PinnedItem = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 10px;
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
  margin-top: 10px;
  margin-bottom: 10px;

  background: linear-gradient(137deg, #ecc297 52%, #fcebd9 100%);
  backdrop-filter: blur(5px);

  opacity: 0.3;
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

export const Divider = styled.div`
  width: 300px;
  height: 1px;

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(0.35turn, transparent, #b6cc97, #b6cc97, #b6cc97, transparent);

  border-image-slice: 1;

  margin-top: 30px;

  opacity: 0.5;
`

export const Bar = styled(BarBase)`
  background: #dcb370;
  background: #ecc297;
`

export const GreyBar = styled(BarBase)`
  background: ${theme('article.digest')};
`
export const Previous = styled.div`
  opacity: 0.2;
`
