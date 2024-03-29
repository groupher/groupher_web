import styled, { css, theme } from '@/css'
import Img from '@/Img'
import Input from '@/widgets/Input'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  padding: 0 18px;
  margin-top: 20px;
`

export const SearchInput = styled(Input)`
  width: 360px;
`
export const PlusIcon = styled(Img)`
  ${css.size(12)};
  margin-right: 5px;
  fill: ${theme('button.primary')};
`
