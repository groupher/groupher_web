import styled from 'styled-components'

import css, { theme } from '@/css'

import QuestionSVG from '@/icons/Question'
import BookSVG from '@/icons/Book'
import { Bar as BarBase } from '@/widgets/Common'

export const Wrapper = styled.div`
  background: ${theme('htmlBg')};
  margin-top: 10px;
  width: 170px;
  height: 380px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 6px;
  box-shadow: rgba(100, 100, 111, 0.1) 1px 2px 29px 0px;
  padding: 15px 14px;
`

export const BookIcon = styled(BookSVG)`
  ${css.size(15)};
  fill: ${theme('rainbow.cyan')};
  z-index: 1;
`
export const QuestionIcon = styled(QuestionSVG)`
  ${css.size(12)};
  fill: ${theme('rainbow.cyan')};
  z-index: 1;
`
export const PinnedItem = styled.div`
  ${css.row('align-center')};
  margin-bottom: 10px;
`
export const Header = styled.div`
  ${css.column()};
  width: 260px;
  margin-top: 25px;
  margin-bottom: 10px;
`

export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('rainbow.cyan')};
  font-weight: 600;
  font-size: 12px;
`
export const GreyTitle = styled(Title)`
  color: ${theme('article.digest')};
`
export const TagsWrapper = styled.div`
  ${css.row('align-center')};
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
  background: ${theme('rainbow.cyan')};
`

export const GreyBar = styled(BarBase)`
  background: ${theme('article.digest')};
`
export const Previous = styled.div`
  opacity: 0.2;
`
