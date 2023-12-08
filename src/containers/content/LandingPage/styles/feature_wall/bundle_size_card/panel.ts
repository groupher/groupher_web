import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  box-shadow: ${theme('button.boxShadow')};
  padding: 15px;
  width: 250px;
  height: 384px;
  background: ${theme('htmlBg')};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-bottom: none;
`
export const Item = styled.div`
  margin-bottom: 12px;
`
export const Header = styled.div`
  ${css.row('align-center')};
  margin-bottom: 3px;
`
export const Bar = styled.div`
  height: 6px;
  width: 80px;
  background: ${theme('divider')};
  border-radius: 4px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
`
export const Size = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
`
