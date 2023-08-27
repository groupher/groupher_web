import styled from 'styled-components'

import Input from '@/widgets/Input'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  height: 100%;
`
export const Header = styled.div`
  ${css.flex('align-center', 'justify-between')};
  margin-bottom: 15px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
`
export const CodeWrapper = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-left: -5px;
`
export const Inputer = styled(Input)`
  background: ${theme('divider')};
`
