import Img from '@/Img'
import styled, { css, theme } from '@/css'

import AccountSVG from '@/icons/Acount'
import { LineDivider } from '@/widgets/Common'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  padding: 0 10%;
  width: 100%;
  height: 78px;
`
export const Logo = styled(Img)`
  ${css.size(20)};
  margin-right: 8px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  font-weight: 500;
`
export const Divider = styled(LineDivider)`
  background: ${theme('lightText')};
`

export const SubTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
`

export const Avatar = styled(Img)`
  ${css.circle(18)};
  ${css.row('justify-between')};
  margin-top: -4px;
`

const hoverEffect = `
  opacity: 0.8;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`

export const AccountIcon = styled(AccountSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  margin-top: -4px;

  ${hoverEffect}

  ${css.media.mobile`
    margin-right: 0;
  `};
`
