import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  transform: scale(0.92);
`
export const Hint = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
  margin-right: 5px;
`
export const LabelWrapper = styled.div`
  ${css.row('align-center')};
  padding: 5px 6px;
  padding-right: 8px;
  border-radius: 8px;
  background: ${theme('hoverActive')};
  margin-left: 3px;
  box-shadow: ${theme('button.boxShadow')};
  height: 26px;
`
export const Item = styled.div`
  ${css.row('align-center')};
`
export const StateTitle = styled.div`
  color: ${theme('article.title')};
  font-weight: 500;
  white-space: nowrap;
  margin-left: -4px;

  ${Wrapper}:hover & {
    opacity: 0.8;
  }
`
export const IconWrapper = styled.div`
  transform: scale(0.9);
  margin-right: 4px;
`
