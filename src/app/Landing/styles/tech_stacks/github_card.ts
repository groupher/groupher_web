import styled, { css } from '@/css'

import GithubSVG from '@/icons/social/Github'
import PuzzleSVG from '@/icons/Puzzle'
import PuzzleFrame from '@/icons/PuzzleFrame'
import Puzzle2SVG from '@/icons/Puzzle2'

import { GradientText } from '..'
import { getCursorGradient, getGithubGradient } from '../metric'

export const Wrapper = styled.div<{ wallpaper: string }>`
  ${css.column()};
  width: 45%;
  height: 528px;
  margin-top: 35px;
  border-radius: 10px;
  position: relative;
  padding: 35px 55px;
  background: ${({ wallpaper }) => getGithubGradient(wallpaper)};
`
export const PuzzleTopIcon = styled(PuzzleFrame)`
  ${css.size(48)};
  fill: white;
  position: absolute;
  top: -14px;
  right: 35px;
  transform: rotate(90deg);
  opacity: 0.18;
  transform: rotate(40deg);
`
export const PuzzleRightIcon = styled(PuzzleSVG)`
  ${css.size(35)};
  fill: white;
  position: absolute;
  top: 40px;
  right: -22px;
`
export const PuzzleIcon = styled(PuzzleFrame)`
  ${css.size(50)};
  fill: white;
  position: absolute;
  top: 16px;
  right: 100px;
  transform: rotate(10deg);
  opacity: 0.08;
`
export const Puzzle2Icon = styled(Puzzle2SVG)`
  ${css.size(28)};
  fill: white;
  position: absolute;
  top: 10px;
  right: 185px;
  transform: rotate(-20deg);
  opacity: 0.08;
`
export const Puzzle3Icon = styled(PuzzleFrame)`
  ${css.size(40)};
  fill: white;
  position: absolute;
  top: 188px;
  left: -12px;
  transform: rotate(-20deg);
  z-index: 2;
  opacity: 0.15;
`

export const Banner = styled.div``
export const Title = styled.div`
  font-size: 20px;
  color: #e0e0e0;
  font-weight: 550;
`
export const Desc = styled.div`
  color: #ababab;
  font-size: 15px;
  margin-top: 3px;
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
