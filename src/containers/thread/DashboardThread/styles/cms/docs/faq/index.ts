import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('justify-center')};
  width: 85%;
  padding: 10px;
  color: ${theme('article.digest')};

  ul {
    margin-left: 2px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${theme('article.title')};
  }
  li {
    list-style: disc inside;
  }
`

export const InnerWrapper = styled.div`
  width: 360px;
`

export const ItemsWrapper = styled.div`
  ${css.flexColumn()};
`
