import styled from 'styled-components'

import type { TColorName } from '@/spec'

import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

import GithubSVG from '@/icons/social/Github'
import QuestionSVG from '@/icons/Question'
import BookSVG from '@/icons/Book'

export const Wrapper = styled.div`
  ${css.flexColumn('justify-center')};
  gap: 16px 0;
  width: 100%;
  margin-bottom: 35px;
`
export const Item = styled.div`
  ${css.flex('align-center')};
  cursor: pointer;
`
export const IconBox = styled.div`
  ${css.size(25)};
  ${css.flex('align-both')};
  position: relative;
  margin-right: 14px;
`
export const Cover = styled.div<{ color?: TColorName }>`
  ${css.size(25)};
  position: absolute;
  left: 0;
  top: 0;

  background-color: ${({ color }) => theme(`baseColor.${camelize(color)}`)};
  border-radius: 5px;
  opacity: 0.6;

  ${Item}:hover & {
    box-shadow: ${css.cardShadow};
    opacity: 0.8;
  }

  transition: all 0.2s;
`
export const CategoryCover = styled(Cover)`
  background: ${theme('divider')};
  border: 1px solid;
  border-color: ${theme('lightText')};
`
export const BookIcon = styled(BookSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  z-index: 1;
`
export const QuestionIcon = styled(QuestionSVG)`
  ${css.size(12)};
  fill: white;
  z-index: 1;
`
export const GithubIcon = styled(GithubSVG)`
  ${css.size(16)};
  fill: white;
  z-index: 1;
`

export const Title = styled.div<{ color: TColorName }>`
  font-size: 14px;
  color: ${theme('article.digest')};

  &:hover {
    color: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)};
    font-weight: 500;
  }
  transition: all 0.2s;
`
