import styled, { css } from '@/css'

import GithubSVG from '@/icons/social/Github'

import { GradientText } from '..'
import { getCursorGradient, getGithubGradient } from '../metric'

export const Wrapper = styled.div<{ wallpaper: string }>`
  ${css.column()};
  width: 44%;
  height: 528px;
  margin-top: 35px;
  border-radius: 10px;
  position: relative;
  padding: 35px 50px;
  background: ${({ wallpaper }) => getGithubGradient(wallpaper)};
`
export const Banner = styled.div``
export const Title = styled.div`
  font-size: 20px;
  color: #e0e0e0;
  font-weight: 550;
`
export const Desc = styled.div`
  color: #ababab;
  font-size: 16px;
  margin-top: 2px;
`
export const Topping = styled.div`
  ${css.row('align-center')};
  margin-bottom: 5px;
`
export const GithubIcon = styled(GithubSVG)<{ wallpaper: string }>`
  ${css.size(15)};
  fill: ${({ wallpaper }) => getCursorGradient(wallpaper)};
  margin-right: 5px;

  ${css.media.mobile`
    ${css.size(15)};
  `};
`
export const GithubLink = styled(GradientText)`
  ${css.row('align-center')};
  font-size: 15px;
  font-weight: 500;
`
