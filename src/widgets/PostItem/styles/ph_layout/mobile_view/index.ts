import {
  Wrapper as WrapperDesktop,
  Main as MainDesktop,
  Avatar as AvatarDesktop,
  AvatarWrapper as AvatarWrapperDesktop,
} from '../desktop_view'

import styled, { css } from '@/css'

export const Wrapper = styled(WrapperDesktop)``
export const Main = styled(MainDesktop)`
  width: 100%;
`
export const AvatarWrapper = styled(AvatarWrapperDesktop)`
  margin-right: 6px;
`
export const Avatar = styled(AvatarDesktop)`
  ${css.size(22)};
`
