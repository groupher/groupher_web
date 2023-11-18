import styled from 'styled-components'

import type { TAvatarLayout, TTestable } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column()};
  width: 100%;
`
export const Block = styled.div`
  width: 620px;

  ${css.media.mobile`
    width: 100%;
    margin-bottom: 0;
  `}
`

export const Header = styled.div`
  ${css.row('align-center')};
  margin-bottom: 30px;
`
export const Title = styled.div`
  ${css.row('align-center')};
  font-size: 14px;
  color: ${theme('article.digest')};
  font-weight: 600;
`
export const Count = styled.div`
  font-size: 11px;
  color: ${theme('article.info')};
  background-color: ${theme('textBadge')};
  padding: 1px 5px;
  margin-left: 10px;
  border-radius: 5px;
  font-weight: 600;
  margin-top: 1px;
`
export const AdminsRow = styled.div`
  ${css.rowWrap('align-center')};
`
export const Admin = styled.div`
  ${css.row('align-start')};
  width: 50%;
`
export const JoinersRow = styled.div`
  ${css.rowWrap('align-center')};
  gap: 10px;
  padding-right: 20px;
`
export const JoinersAvatar = styled(Img)<{ $avatarLayout: TAvatarLayout }>`
  ${css.size(20)};
  border-radius: ${({ $avatarLayout }) =>
    $avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%'};
`
