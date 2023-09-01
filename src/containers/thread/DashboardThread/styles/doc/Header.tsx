import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  width: 100%;
  ${css.row('align-center')};
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.35turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`

export const Title = styled.div`
  font-size: 14px;
  color: ${theme('article.title')};
`

export const ViewWrapper = styled.div``
