import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.flex()};
  width: 100%;
  position: relative;
`
export const Main = styled.div`
  ${css.flexColumnGrow()};
`
export const AvatarWrapper = styled.div`
  ${css.flexColumn('align-both')};
  margin-top: -3px;
`
export const UpvoteWrapper = styled.div`
  margin-left: -4px;
`
export const Avatar = styled(Img)`
  ${css.circle(36)};
  fill: ${theme('article.title')};
  opacity: ${theme('avatar.opacity')};
  margin-top: 2px;
`
export const SmallAvatar = styled(Avatar)`
  ${css.size(35)};
`
