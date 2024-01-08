import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  width: 100%;
`
export const InnerWrapper = styled.div`
  ${css.row('align-both')};
  background: linear-gradient(rgb(236 229 255 / 30%) 0%, rgb(253 253 253 / 96%) 100%);
  width: 100%;
  height: 720px;
  position: relative;
`
export const Slogan = styled.div`
  ${css.column('align-both')};
  margin-bottom: 20px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 32px;
  font-weight: 500;

  text-shadow: rgb(0 0 0 / 8%) 0px 10px 20px;
  opacity: 0.9;
`
export const Desc = styled.div`
  ${css.row('align-center')};
  font-size: 17px;
  color: ${theme('article.digest')};
  margin-top: 12px;
  margin-bottom: 40px;
  opacity: 0.8;
`

export const Right = styled.div`
  ${css.row('align-both')};
  width: 50%;
  height: 100%;
`
