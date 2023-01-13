import styled from 'styled-components'

import type { TColorName } from '@/spec'

import css, { theme } from '@/utils/css'
import GithubSVG from '@/icons/social/Github'
import QuestionSVG from '@/icons/Question'
import BlocksSVG from '@/icons/Blocks'

export const Wrapper = styled.div`
  ${css.flexColumn('justify-center')};
  gap: 15px 0;
  width: 100%;
  margin-bottom: 35px;
`
export const Item = styled.div`
  ${css.flex('align-center')};
`
export const Cover = styled.div<{ color?: TColorName }>`
  ${css.size(26)};
  ${css.flex('align-both')};
  background-color: ${({ color }) => theme(`baseColor.${color?.toLowerCase()}`)};
  border-radius: 5px;
  margin-right: 14px;
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

export const BlocksIcon = styled(BlocksSVG)`
  ${css.size(15)};
  fill: ${theme('article.title')};
`
export const QuestionIcon = styled(QuestionSVG)`
  ${css.size(12)};
  fill: white;
`
export const GithubIcon = styled(GithubSVG)`
  ${css.size(16)};
  fill: white;
`

export const Title = styled.div<{ color: TColorName }>`
  font-size: 14px;
  color: ${theme('article.digest')};

  &:hover {
    color: ${({ color }) => theme(`baseColor.${color.toLowerCase()}`)};
    font-weight: 500;
    cursor: pointer;
  }
  transition: all 0.2s;
`
