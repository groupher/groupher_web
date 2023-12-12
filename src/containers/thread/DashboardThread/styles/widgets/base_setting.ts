import type { TColorName } from '@/spec'
import styled, { css, theme, rainbow } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
`
export const Label = styled.div<{ color: TColorName }>`
  ${css.circle(28)};
  ${css.row('align-both')};
  border: 1px solid;
  border-color: ${({ color }) => rainbow(color)};
  cursor: pointer;
  margin-left: -2px;
`
export const TheColor = styled.div<{ color: TColorName }>`
  ${css.circle(20)};
  background-color: ${({ color }) => rainbow(color)};
`

// threads
export const ThreadsWrapper = styled.div`
  ${css.rowWrap('justify-between')};

  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgb(0 0 0 / 7%) 0px 0px 24px;
  padding: 10px 14px;
  padding-right: 0;
`
export const Section = styled.div`
  width: 48%;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 44px;
  margin-bottom: 15px;
`
export const Header = styled.div`
  ${css.row('align-center')};
  width: 100%;
`
export const ThreadTitle = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  margin-top: 4px;
  font-size: 13px;
  width: 75%;
`
