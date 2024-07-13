import styled, { css, theme, animate } from '~/css'

export const NumbersWrapper = styled.div`
  ${css.row('align-center')};
  margin-top: -2.1rem;
`
export const NumbersInfo = styled(NumbersWrapper)`
  margin-top: 0;
`
// background: ${theme('hoverBg')};
export const NumberSection = styled.div<{ readOnly: boolean }>`
  ${css.column('justify-center')};

  padding: 0 5px;
  border-radius: 4px;

  &:hover {
    background: ${({ readOnly }) => (readOnly ? '' : theme('hoverBg'))};
    cursor: ${({ readOnly }) => (readOnly ? '' : 'pointer')};
  }
`
export const NumberTitle = styled.div<{ readOnly: boolean }>`
  color: ${theme('article.digest')};
  text-align: center;
  &:hover {
    color: ${({ readOnly }) => (readOnly ? '' : '#f1c48f')};
    text-decoration: ${({ readOnly }) => (readOnly ? '' : 'underline')};
    animation: ${animate.pulse} 0.4s linear;
  }
`
export const NumberItem = styled.div<{ readOnly: boolean }>`
  font-size: 1.5rem;
  text-align: center;

  color: ${theme('article.digest')};
  &:hover {
    color: ${({ readOnly }) => (readOnly ? '' : '#f1c48f')};
    text-decoration: ${({ readOnly }) => (readOnly ? '' : 'underline')};
    animation: ${animate.pulse} 0.4s linear;
  }
`
export const NumberDivider = styled.div`
  border: 1px solid;
  border-color: ${theme('divider')};
  height: 70%;
  align-self: center;
  margin-left: 10px;
  margin-right: 10px;
`
