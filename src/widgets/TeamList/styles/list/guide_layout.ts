import styled, { css, theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.row('align-center')};
`
export const SettingWrapper = styled.div`
  ${css.circle(36)};
  ${css.row('align-both')};

  background: #03343f;
  &:hover {
    border-color: #005759;
    cursor: pointer;
  }
`
export const Avatar = styled(Img)`
  ${css.circle(18)};
  margin-right: 12px;
`
export const SettingIcon = styled(Img)`
  ${css.size(15)};
  fill: ${theme('article.digest')};

  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
  }
`
