import styled, { css, theme } from '@/css'

import AccountSVG from '@/icons/Acount'
import { WithMargin } from '@/widgets/Common'

export const NormalWrapper = styled(WithMargin)`
  ${css.row('align-center')};
`
export const WithBgWrapper = styled(NormalWrapper)`
  border: 1px solid;
  border-color: ${theme('divider')};
  height: 32px;
  border-radius: 10px;
  padding: 5px 8px;
  width: auto;
  background: ${theme('alphaBg')};
  box-shadow: ${theme('popover.boxShadow')};

  &:hover {
    cursor: pointer;
  }
`
export const HoverBox = styled.div`
  ${css.size(24)};
  ${css.row('align-both')};
  border-radius: 5px;

  &:hover {
    background: ${theme('hoverBg')};
    border: 1px solid;
    border-color: ${theme('divider')};
    cursor: pointer;
  }
`
export const UnloginIcon = styled(AccountSVG)`
  fill: ${theme('article.digest')};
  ${css.size(13)};
  cursor: pointer;
  &:hover {
    fill: ${theme('article.title')};
  }
`
export const NickName = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  ${css.cutRest('80px')};
  margin-left: 10px;
`

export const UnLoginText = styled(NickName)`
  font-size: 12px;
  margin-top: 1px;
`
