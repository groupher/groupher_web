import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.column()};
  width: 100%;
  padding: 20px;
`
export const UserWrapper = styled.div`
  width: 100%;
  position: relative;
  ${css.row('align-center')};
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
  }
`
export const Avatar = styled(Img)`
  ${css.circle(32)};
  margin-right: 10px;
  fill: ${theme('button.primary')};
`
export const Intro = styled.div`
  flex-grow: 1;
`
export const Name = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 16px;

  ${UserWrapper}:hover & {
    color: ${theme('button.primary')};
  }
`
export const Bio = styled.div`
  color: ${theme('article.digest')};
  ${css.cutRest('260px')};

  ${UserWrapper}:hover & {
    color: ${theme('button.primary')};
    opacity: 0.8;
  }
`
export const CheckWrapper = styled.div`
  margin-top: 5px;
`
export const RemoveIcon = styled(Img)`
  ${css.size(14)};
  fill: ${theme('baseColor.red')};
  margin-top: 5px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`
