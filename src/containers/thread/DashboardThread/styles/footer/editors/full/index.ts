import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import PlusSVG from '@/icons/Plus'

export const Wrapper = styled.div`
  ${css.flexColumn('align-start', 'justify-between')};
`

export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
`
export const TopWrapper = styled.div`
  ${css.flex('align-start')};
  width: 100%;
  padding: 10px 20px;
  padding-left: 5px;
  margin-bottom: 80px;
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
    0.45turn,
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
  ${css.flex('justify-end', 'align-center')};
  width: 100%;
  margin-bottom: 25px;
`
export const PlusIcon = styled(PlusSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 6px;
`
export const LinkGroup = styled.div`
  ${css.flex('justify-between')};
  width: 100%;
`
export const ColumnWrapper = styled.div<{ alignRight?: boolean }>`
  ${({ alignRight }) =>
    !alignRight ? css.flexColumn('align-start') : css.flexColumn('align-end')};
  gap: 25px 0;
  width: 32%;
  height: 100%;
`
