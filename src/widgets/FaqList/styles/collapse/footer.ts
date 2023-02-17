import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import Button from '@/widgets/Buttons/Button'
import BookSVG from '@/icons/Book'
import PeopleSVG from '@/icons/People'

export const Wrapper = styled.div`
  ${css.flexColumn('align-both')};
  font-size: 14px;
  margin-top: 60px;
  margin-left: -30px;
  padding-top: 30px;

  border-top: 1px solid transparent;
  border-image: linear-gradient(
    0.35turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;

  ${css.media.mobile`
    margin-top: 35px;
    margin-left: -10px;
  `};
`

export const Note = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  opacity: 0.8;
`

export const BookIcon = styled(BookSVG)`
  ${css.size(13)};
  fill: white;
  margin-right: 6px;
`
export const PeopleIcon = styled(PeopleSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 6px;
`

export const MoreButton = styled(Button)`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

export const AskButton = styled(Button)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`

export const Bottom = styled.div`
  margin-top: 15px;
  ${css.flex('align-center')};
  gap: 0 18px;
`
