import styled from 'styled-components'

// import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.columnGrow('align-center')};
  margin-top: 30px;
  width: 80%;
`
export const Desc = styled.div`
  ${css.row('align-center')};
  margin-top: 10px;
  color: ${theme('article.digest')};
`
export const BtnWrapper = styled.div`
  align-self: flex-end;
  margin-top: 120px;
`
