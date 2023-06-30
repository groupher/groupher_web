import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import PlusSVG from '@/icons/Plus'

export const Wrapper = styled.div`
  ${css.flexColumn('align-start', 'justify-between')};
`
export const ActionRow = styled.div`
  ${css.flex('justify-start', 'align-center')};
  width: 250px;
  margin-bottom: 30px;
  margin-left: -1px;
`

export const PlusIcon = styled(PlusSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 6px;
`
export const LinkGroup = styled.div`
  ${css.flex('justify-start')};
  flex-wrap: wrap;
  width: calc(100% + 50px);
  gap: 30px;
`
export const ColumnWrapper = styled.div`
  width: 30%;
  height: 100%;
`
export const ItemsWrapper = styled.div`
  ${css.flexColumn()};
  gap: 25px 0;
  margin-bottom: 32px;
`

export const Adder = styled.div`
  width: 120px;
  margin-left: -5px;
  transform: scale(0.95);
  opacity: 0.8;

  ${ColumnWrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.25s;
`
