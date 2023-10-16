import styled from 'styled-components'

import type { TActive } from '@/spec'

import SettingSVG from '@/icons/Setting'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  padding-right: 5px;
`
type TUser = TActive & { $noActive: boolean }

export const User = styled.div<TUser>`
  ${css.row()};
  margin-bottom: 25px;
  opacity: ${({ $active, $noActive }) => {
    if ($noActive) return 1

    return $active ? 1 : 0.6
  }};
  position: relative;

  transition: opacity 0.25s;
`

export const SettingIcon = styled(SettingSVG)`
  ${css.size(12)};
  fill: ${theme('lightText')};
  position: absolute;
  left: -30px;
  top: 10px;
`

export const Intro = styled.div`
  width: 100%;
`
export const Title = styled.div`
  ${css.row('align-center')};
  font-weight: 600;
`
export const Name = styled.div`
  color: ${theme('article.title')};
  font-size: 16px;
`
export const Login = styled.div`
  color: ${theme('lightText')};
  font-size: 14px;
  margin-left: 8px;
  margin-top: -1px;
`
export const RootSign = styled.div`
  background: ${theme('rainbow.blueBg')};
  color: ${theme('rainbow.blue')};
  border: 1px solid;
  border-color: ${theme('rainbow.blue')};
  font-size: 10px;
  padding: 0 5px;
  margin-left: 8px;
  border-radius: 5px;
  margin-top: -1px;
`
export const Bio = styled.div`
  color: ${theme('lightText')};
  font-size: 13px;
  width: 75%;
  ${css.lineClamp(2)};
`
