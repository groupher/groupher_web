import styled from 'styled-components'

import css, { theme } from '@/css'
import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div``
export const Note = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
`
export const ItemsWrapper = styled.div`
  ${css.column('')};
  width: 260px;
  gap: 10px 0;
`
export const Item = styled.div`
  ${css.row('align-center')};
`
export const Title = styled.div`
  ${css.row('align-center')};
  font-size: 12px;
  color: ${theme('article.title')};
  width: 80px;
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-left: 5px;
  transform: rotate(180deg);
`
export const LinkRaw = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
`
