import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  padding-right: 5px;
`
export const User = styled.div`
  ${css.flex()};
  margin-bottom: 25px;
`
export const Intro = styled.div`
  width: 100%;
`
export const Title = styled.div`
  ${css.flex('align-center')};
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
  background: ${theme('baseColor.blue')};
  color: white;
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
