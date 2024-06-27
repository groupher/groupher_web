import styled, { css, theme } from '~/css'

import CheckSVG from '~/icons/Check'

export const Wrapper = styled.div`
  height: 320px;
  width: calc(100% + 6px);
  position: absolute;
  left: -3px;
  bottom: -50px;
  background: ${theme('hiddenPanel')};
  border-radius: 10px;
  padding: 0 82px;
  padding-top: 120px;
`
export const InnerWrapper = styled.div`
  width: calc(100% + 148px);
  ${css.rowWrap()};
  gap: 16px 0;
`
export const InnerWrapperColumn = styled.div`
  ${css.column()};
  width: calc(100% + 118px);
  gap: 12px;
`
export const Item = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  width: 33%;
`
export const ColumnItem = styled(Item)`
  width: 100%;
`
export const Dot = styled.div`
  ${css.circle(4)};
  background: ${theme('article.digest')};
  margin-right: 8px;
`
export const CheckIcon = styled(CheckSVG)`
  ${css.size(15)};
  margin-right: 8px;
  fill: ${theme('rainbow.green')};
`
export const Header = styled.div`
  ${css.column('align-both')};
  width: 100%;
  margin-bottom: 30px;
  margin-left: 25px;
`
export const Divider = styled.div`
  width: 160px;
  height: 2px;
  margin-left: -20px;
  margin-top: 20px;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.25turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
