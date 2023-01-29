import styled from 'styled-components'

import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import css, { theme } from '@/utils/css'
import EditPublishSVG from '@/icons/EditPublish'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.flex('align-center', 'justify-between')};
  margin-top: 15px;
`
export const AccountWrapper = styled.div`
  ${css.flex('align-center')};
`
export const Avatar = styled(Img)<{ avatarLayout: TAvatarLayout }>`
  ${css.size(22)};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%')};
`
export const UserName = styled.div`
  color: ${theme('thread.articleDIgest')};
  font-size: 14px;
  margin-left: 12px;
`
export const ActionsWrapper = styled.div`
  ${css.flex('align-center')};
`
export const Publishcon = styled(EditPublishSVG)`
  ${css.size(13)};
  fill: white;
  margin-right: 6px;
`
