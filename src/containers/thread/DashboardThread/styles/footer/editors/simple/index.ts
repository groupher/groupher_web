import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('align-start', 'justify-between')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
`
export const LeftWrapper = styled.div`
  /* border: 1px solid;
  border-color: ${theme('divider')}; */
  flex-grow: 1;
  height: 200px;
  padding: 10px 20px;
  padding-left: 5px;
`
export const CenterWrapper = styled.div`
  ${css.flexColumn()};
  width: 280px;
  height: auto;
  gap: 25px 0;
  padding: 10px 20px;
  margin-right: 40px;
`
export const RightWrapper = styled.div`
  ${css.flexColumn('align-start')};
  width: 200px;
  margin-top: 8px;
`
