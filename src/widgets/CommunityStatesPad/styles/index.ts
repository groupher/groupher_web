// import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row()};
  text-align: center;
  ${css.media.mobile`
    margin-top: -4px;
  `};
`
export const NumberSection = styled.div`
  ${css.column('align-end')};

  padding: 0 5px;
`
export const ContentSection = styled(NumberSection)``
export const VolunteerSection = styled(NumberSection)<{ alignCenter: boolean }>`
  align-items: ${({ alignCenter }) => (alignCenter ? 'center' : 'flex-end')};
`
export const ChargeSection = styled(NumberSection)`
  ${css.column('align-center', 'justify-between')};
  ${css.media.mobile`display: none`};
`
type TNumberTitle = { small?: boolean; readOnly?: boolean }
// text-decoration: ${({ readOnly }) => (readOnly ? '' : 'underline')};
export const NumberTitle = styled.div<TNumberTitle>`
  color: ${theme('article.digest')};
  font-size: ${({ small }) => (small ? '11px' : '12px')};
  margin-top: ${({ small }) => (small ? '4px' : '0')};
  margin-bottom: 2px;
  word-break: keep-all;

  &:hover {
    color: ${({ readOnly }) => (readOnly ? '' : theme('article.digest'))};
    cursor: ${({ readOnly }) => (readOnly ? '' : 'pointer')};
  }
`
export const NumberDivider = styled.div`
  border: 1px solid;
  border-color: ${theme('divider')};
  height: 20px;
  align-self: flex-end;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 15px;

  ${css.media.tablet`
    margin-left: 5px;
    margin-right: 5px;
  `};
  ${css.media.mobile`display: none`};
`
