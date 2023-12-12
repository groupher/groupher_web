import styled, { css, theme } from '@/css'
import PlusSVG from '@/icons/Plus'

export const Wrapper = styled.div`
  ${css.column('align-start', 'justify-between')};
`
export const ActionRow = styled.div`
  ${css.row('justify-start', 'align-center')};
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
  ${css.rowWrap('justify-start')};
  width: calc(100% + 50px);
  gap: 30px;
`
export const ColumnWrapper = styled.div`
  width: 30%;
  height: 100%;
`
export const ItemsWrapper = styled.div`
  ${css.column()};
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
