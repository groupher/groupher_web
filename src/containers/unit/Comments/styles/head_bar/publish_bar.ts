import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import styled, { css, theme } from '@/css'
import EditPublishSVG from '@/icons/EditPublish'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-top: 15px;
`
export const AccountWrapper = styled.div`
  ${css.row('align-center')};
`
export const Avatar = styled(Img)<{ $avatarLayout: TAvatarLayout }>`
  ${css.size(22)};
  border-radius: ${({ $avatarLayout }) => ($avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%')};
`
export const UserName = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  margin-left: 12px;
`
export const ActionsWrapper = styled.div`
  ${css.row('align-center')};
`
export const Publishcon = styled(EditPublishSVG)`
  ${css.size(13)};
  fill: white;
  margin-right: 6px;
`
