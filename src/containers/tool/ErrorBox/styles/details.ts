import styled from 'styled-components'

// import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.columnGrow()};
  font-size: 13px;
`
export const TitleWrapper = styled.div`
  ${css.row('align-center')};
`
export const Title = styled.div`
  color: ${theme('baseColor.red')};
  opacity: 0.8;
`
export const Desc = styled.div`
  color: ${theme('baseColor.red')};
  margin-left: 10px;
`
