import type { TSpace } from '~/spec'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div<TSpace>`
  ${css.row('align-end')};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
`

export const Hint = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  opacity: 0.8;
`
export const Main = styled.div`
  ${css.row('align-end')};
  margin-left: 4px;
  margin-right: 4px;
`
export const CurNum = styled.div<{ invalid: boolean }>`
  color: ${({ invalid }) => (invalid ? theme('rainbow.red') : theme('article.title'))};
  font-size: 14px;
`
export const Slash = styled.div`
  color: ${theme('article.digest')};
  font-size: 10px;
  margin-left: 6px;
  margin-right: 5px;
  margin-bottom: 2px;
`
export const TotalNum = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
`
