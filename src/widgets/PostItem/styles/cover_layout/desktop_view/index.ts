import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.flex()};
  width: 100%;
  position: relative;
  margin-bottom: 10px;
`
export const Main = styled.div`
  ${css.flexColumnGrow()};
`
export const CoverWrapper = styled.div`
  width: 180px;
  height: 100px;
  margin-right: 20px;
  margin-top: 4px;
`
export const CoverImg = styled(Img)`
  width: 180px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`
export const DigestWrapper = styled.div`
  ${css.cutRest('435px')};
  color: ${theme('article.digest')};
  margin-top: 6px;
  margin-bottom: 10px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: ${theme('article.title')};
  }
  transition: color 0.2s;
`
