import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  padding: 8px;
  padding-bottom: 2px;
`
export const Item = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 8px;
  cursor: pointer;
`
export const Icon = styled(Img)`
  ${css.size(14)};
  fill: ${theme('article.digest')};

  ${Item}:hover & {
    fill: ${theme('article.title')};
  }
`
export const Title = styled.div`
  font-size: 13px;
  fill: ${theme('article.digest')};
  margin-left: 5px;

  ${Item}:hover & {
    color: ${theme('article.title')};
  }
`
