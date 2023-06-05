import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import PlusSVG from '@/icons/Plus'

export const Wrapper = styled.div`
  ${css.flexColumn('align-start', 'justify-between')};
`
export const TopWrapper = styled.div`
  ${css.flex('align-start')};
  width: 100%;
  padding: 10px 20px;
  padding-left: 0;
  margin-bottom: 50px;
`
export const TopLeft = styled.div`
  width: 45%;
`
export const TopRight = styled.div`
  ${css.flexColumn('align-both')};
  flex-grow: 1;
  min-height: 145px;
  height: auto;
  border-left: 1px solid transparent;
  border-image: linear-gradient(
    0.51turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
export const BottomWrapper = styled.div`
  width: 100%;
`
export const ActionRow = styled.div`
  ${css.flex('justify-start', 'align-center')};
  width: 100%;
  margin-bottom: 30px;
  margin-left: -2px;
`
export const PlusIcon = styled(PlusSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-left: 6px;
`
export const LinkGroup = styled.div`
  ${css.flex('justify-between')};
  width: calc(100% + 50px);
`
export const ColumnWrapper = styled.div`
  ${css.flexColumn()};

  gap: 25px 0;
  width: 30%;
  height: 100%;
`

export const Adder = styled.div`
  width: 120px;
  margin-left: -5px;
  transform: scale(0.95);
`
