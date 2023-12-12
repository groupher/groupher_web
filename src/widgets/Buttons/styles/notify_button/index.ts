import type { TTestable } from '@/spec'
import Img from '@/Img'
import styled, { css, theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column()};
`
export const Main = styled.div`
  ${css.row('align-center')};
  width: 80px;
`
const NotifyIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(15)};
  margin-right: 5px;
  cursor: pointer;
`
export const NotifyOnIcon = styled(NotifyIcon)`
  fill: #00a49a;
`
export const NotifyOffIcon = styled(NotifyIcon)`
  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
  }
`
export const Title = styled.div<{ active?: boolean }>`
  color: ${({ active }) => (active ? theme('article.title') : theme('article.digest'))};
  font-size: 13px;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
    cursor: pointer;
  }
  transition: color 0.2s;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  width: 160px;
  font-size: 12px;
`
export const Focus = styled.span`
  color: ${theme('article.title')};
  font-weight: bold;
  margin-left: 2px;
  margin-right: 2px;
`
