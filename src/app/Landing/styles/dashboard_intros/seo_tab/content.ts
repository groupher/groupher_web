import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row()};
  margin-top: 180px;
  width: 100%;
  height: 180px;
  padding: 10px 18px;
`
export const OgPanel = styled.div`
  width: 50%;
  padding-left: 10px;
  position: relative;
`
export const TwPanel = styled.div`
  width: 50%;
  padding-left: 50px;
  position: relative;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.title')};
  font-weight: 550;
`
export const Desc = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  font-weight: 400;
  margin-bottom: 10px;
`
