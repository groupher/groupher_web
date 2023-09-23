import styled from 'styled-components'

import css, { theme } from '@/css'

import RootCheckSVG from '@/icons/CheckCircle'
import CheckSVG from '@/icons/Check'

export const Wrapper = styled.div`
  width: 100%;
  ${css.rowWrap()};
  gap: 10px 0;
  position: relative;
`
export const Item = styled.div`
  width: 50%;
`
export const ReadonlyItem = styled.div`
  ${css.row('align-center')};
  width: 50%;
`
export const CheckIcon = styled(CheckSVG)`
  ${css.size(12)};
  fill: ${theme('baseColor.green')};
  margin-right: 5px;
`
export const RootCheckIcon = styled(RootCheckSVG)`
  ${css.size(12)};
  fill: ${theme('baseColor.green')};
  margin-right: 5px;
`

export const ItemTitle = styled.div`
  ${css.lineClamp(1)};
`
