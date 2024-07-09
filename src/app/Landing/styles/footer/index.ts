import styled, { css, theme } from '~/css'
import Img from '~/Img'
import Button from '~/widgets/Buttons/Button'

import { getPathGradient } from '../metric'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 100%;
  height: 300px;
`
export const Logo = styled(Img)`
  ${css.size(52)};
  margin-bottom: 20px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 28px;
  font-weight: 500;

  text-shadow: rgb(0 0 0 / 8%) 0px 10px 20px;
  opacity: 0.9;
`
export const Desc = styled.div`
  ${css.row('align-center')};
  font-size: 18px;
  color: ${theme('hint')};
  margin-top: 12px;
  margin-bottom: 38px;
`
export const Highlight = styled.span`
  color: ${theme('article.title')};
  margin-left: 1px;
  margin-right: 1px;
  font-weight: 500;
`
export const Buttons = styled.div`
  ${css.row('align-center')};
  gap: 0 18px;
  margin-bottom: 25px;
`
export const CreateButton = styled(Button)<{ wallpaper: string }>`
  background: ${({ wallpaper }) =>
    `linear-gradient(#323132, #323132) padding-box, linear-gradient(to left, ${getPathGradient(
      wallpaper,
    )}) border-box;`};

  border-radius: 10px;
  border: 4px solid transparent;
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }

  &:active {
    box-shadow: none;
  }

  transition: all 0.2s;
`
