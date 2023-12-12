import styled, { css, theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.rowGrow('align-center')};
`
export const Label = styled.div`
  ${css.row('align-center')};
  cursor: pointer;
`
export const BoxedLabel = styled(Label)`
  ${css.row('align-center')};
  cursor: pointer;
  border: 1px solid;
  padding: 0 10px;
  border-radius: 5px;
  border-color: ${theme('button.primary')};
`
export const LabelIcon = styled(Img)`
  ${css.size(18)};
  fill: ${theme('banner.title')};
  &:hover {
    fill: ${theme('tabs.headerActive')};
  }
`
export const LabelText = styled.div`
  color: ${theme('tabs.headerActive')};
  font-size: 0.9rem;
`
export const LabelCount = styled.div`
  color: ${theme('banner.desc')};
  font-size: 0.8rem;
  flex-grow: 1;
  text-align: right;
`
