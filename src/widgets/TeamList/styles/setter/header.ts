import styled, { css, theme } from '~/css'
import Img from '~/Img'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  height: 50px;
  width: 100%;
  background: ${theme('modal.bg')};
  filter: ${theme('modal.subPanelShadow')};
  color: ${theme('article.title')};
  padding-left: 20px;
  padding-right: 11px;
`
export const SearchWrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  width: 100%;
  padding-left: 3px;
`
export const PlusIcon = styled(Img)`
  ${css.size(12)};
  margin-right: 5px;
  fill: ${theme('button.primary')};
`
