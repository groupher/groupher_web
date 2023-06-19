import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  margin-bottom: 20px;
`
export const Note = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
`
export const ItemsWrapper = styled.div`
  ${css.flexColumn('')};
  width: 260px;
  gap: 10px 0;
`
export const Item = styled.div`
  ${css.flex('align-center')};
`
export const Title = styled.div`
  font-size: 12px;
  color: ${theme('article.title')};
  width: 80px;
`
export const LinkRaw = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.8;
`
