import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  transform: scale(0.92);
`
export const LabelWrapper = styled.div`
  ${css.row('align-center')};
  padding: 5px 6px;
  padding-right: 8px;
  border-radius: 8px;
  background: ${theme('menuHoverBg')};
  border: 1px solid;
  // border-color: ${theme('rainbow.purple')};
  border-color: ${theme('divider')};
  margin-left: -1px;
  height: 26px;
`
export const Item = styled.div`
  ${css.row('align-center')};
`
export const StateTitle = styled.div`
  color: ${theme('article.title')};
  white-space: nowrap;
  margin-left: -4px;
`
export const IconWrapper = styled.div`
  transform: scale(0.9);
  margin-right: 4px;
`
