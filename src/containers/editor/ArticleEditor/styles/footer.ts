import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  width: 700px;
  color: ${theme('article.digest')};
  padding-left: 5px;
`

export const PublishFooter = styled.div`
  border-top: 3px solid;
  border-top-color: ${theme('divider')};
  margin-top: 28px;
  padding-top: 20px;
  ${css.row('align-center', 'justify-between')};
  width: 100%;
  padding-left: 20px;
  padding-right: 35px;
`
