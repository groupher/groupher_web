import styled, { css, theme, animate } from '@/css'
import Button from '@/widgets/Buttons/Button'
import Img from '@/Img'

import JoinEyeSVG from '@/icons/JoinEye'

export const BtnWrapper = styled.div`
  ${css.row('align-center')};
  padding: 2px 4px;
`
export const FollowingBtnWrapper = styled.div`
  ${css.row('align-center')};
  padding: 2px 0px;
`
const BtnIcon = styled(Img)`
  ${css.size(14)};
  margin-right: 2px;
`
export const WatchIcon = styled(BtnIcon)`
  fill: ${theme('button.fg')};
`
export const WatchedIcon = styled(BtnIcon)`
  fill: ${theme('banner.title')};
`
export const BtnText = styled.div`
  padding-top: 2px;
`
export const Popinfo = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
  padding: 5px 8px;
`

export const LoadingIcon = styled(BtnIcon)<{ light: boolean }>`
  fill: ${({ light }) => (light ? theme('button.fg') : theme('article.title'))};

  ${css.size(15)};
  animation: ${animate.rotate360} 1s linear infinite;
`
export const FollowingIcon = styled(JoinEyeSVG)`
  fill: ${theme('rainbow.green')};
  ${css.size(15)};
  margin-right: 3px;
  transform: scaleX(0.9);
  margin-top: -1px;
  ${BtnWrapper}:hover & {
    fill: ${theme('article.title')};
  }
`
export const FollowedButton = styled(Button)`
  border-radius: 10px;
  padding-top: 2px;
`
export const FollowingButton = styled(Button)<{ followingOffset: number }>`
  color: ${theme('rainbow.green')};
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin-left: ${({ followingOffset }) => `${followingOffset}px` || 0};
  /* background: #034556; */
  padding-top: 2px;
  padding-bottom: 2px;

  &:hover {
    color: ${theme('article.title')};
    background: #034556;
  }
`
