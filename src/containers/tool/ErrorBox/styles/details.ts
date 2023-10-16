import styled from 'styled-components'

// import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.columnGrow()};
  font-size: 13px;
`
export const TitleWrapper = styled.div`
  ${css.row('align-start')};
`
export const Title = styled.div`
  color: ${theme('rainbow.red')};
  font-weight: bold;
`
export const Desc = styled.div`
  color: ${theme('rainbow.red')};
  margin-left: 10px;
  width: 82%;
  max-width: 82%;
`
