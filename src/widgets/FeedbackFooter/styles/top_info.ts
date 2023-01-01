import styled from 'styled-components'

import ArrowSVG from '@/icons/ArrowSimple'

// import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('justify-between')};
  margin-bottom: 35px;
`

export const Item = styled.div`
  ${css.flex('align-center')};
  gap: 0 6px;
  cursor: pointer;
  transition: all 0.2s;
`

export const ArrowIcon = styled(ArrowSVG)<{ reverse?: boolean }>`
  ${css.size(15)}
  fill: ${theme('article.digest')};
  opacity: 0.8;

  transform: ${({ reverse }) => (reverse ? 'rotate(180deg);' : '0')};

  ${Item}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`

export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  font-weight: 600;

  ${Item}:hover & {
    color: ${theme('article.title')};
  }

  transition: all 0.2s;
`
