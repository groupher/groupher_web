import styled from 'styled-components'

import LockSVG from '@/icons/Lock'
import GlobalSVG from '@/icons/social/Global'
import SearchSVG from '@/icons/HeaderSearch'
import AuthSVG from '@/icons/Auth'
import HashSVG from '@/icons/HashTagBold'
import UploadSVG from '@/icons/Upload'
import CloudSVG from '@/icons/CloudCheck'

import { WithMargin, WithPosition } from '@/widgets/Common'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  padding: 15px;
  padding-top: 30px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`
type TLine = { height?: string; width?: string; $hovering: boolean }
export const Column = styled(WithPosition)<TLine>`
  height: ${({ height }) => height || '100px'};
  width: 1px;
  background: ${({ $hovering }) => ($hovering ? theme('rainbow.green') : theme('divider'))};
  opacity: ${({ $hovering }) => ($hovering ? 0.3 : 1)};
  z-index: 2;
  transition: all 0.2s;
`
export const Line = styled(WithPosition)<TLine>`
  width: ${({ width }) => width || '200px'};
  height: 1px;
  background: ${({ $hovering }) => ($hovering ? theme('rainbow.green') : theme('divider'))};
  opacity: ${({ $hovering }) => ($hovering ? 0.3 : 1)};
  z-index: 2;
  transition: all 0.2s;
`

export const BlocksWrapper = styled.div`
  ${css.row('align-center')};
  flex-wrap: wrap;
  gap: 12px;
`
export const Block = styled(WithMargin)<{ $opacity?: number }>`
  ${css.row('align-both')};
  color: ${theme('article.digest')};
  min-height: 34px;
  width: auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 8px;
  border-color: ${theme('divider')};
  background: ${theme('htmlBg')};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  z-index: 2;
  opacity: ${({ $opacity }) => $opacity || 1};

  transition: all 0.2s;
`
export const Title = styled.div`
  font-size: 12px;
  margin-left: 4px;
`
const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(12)};
    fill: ${theme('article.digest')};
    opacity: 0.8;
  `
}

export const ICON = {
  Lock: styled(commonIcon(LockSVG))`
    fill: ${theme('rainbow.green')};
    margin-top: -1px;
  `,
  Global: commonIcon(GlobalSVG),
  Search: commonIcon(SearchSVG),
  Auth: commonIcon(AuthSVG),
  Hash: styled(commonIcon(HashSVG))`
    transform: rotate(15deg);
  `,
  Upload: commonIcon(UploadSVG),
  Cloud: commonIcon(CloudSVG),
}
