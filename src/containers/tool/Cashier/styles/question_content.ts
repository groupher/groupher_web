//
import styled from 'styled-components'

// import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.flexColumnGrow()};
  margin-top: 10px;
  padding-left: 15px;
`

export const Title = styled.div`
  color: ${theme('article.title')};
  font-weight: bold;
`

export const Desc = styled.div`
  color: ${theme('article.digest')};
  margin-top: 3px;
`

export const Divider = styled.div`
  border-top: 1px solid;
  color: ${theme('article.digest')};
  width: 100%;
  opacity: 0.4;
  margin-top: 8px;
  margin-bottom: 8px;
`
