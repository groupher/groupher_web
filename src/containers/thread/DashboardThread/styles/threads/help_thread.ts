import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('justify-between')};
  flex-wrap: wrap;

  border-left: 2px solid;
  border-left-color: ${theme('divider')};
  padding: 10px 20px;
  padding-right: 0;
  gap: 20px;
`
export const Section = styled.div`
  width: 100%;
  padding-top: 4px;
`
export const Header = styled.div`
  ${css.flex('align-center')};
  width: 100%;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  margin-top: 2px;
  font-size: 12px;
  width: 80%;
  opacity: 0.8;
`
