import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 300px;
  height: 100%;
  padding-left: 60px;
`
export const InnerWrapper = styled.div`
  ${css.column('align-start')};
`
export const Header = styled.div`
  ${css.column('align-start')};
  width: 300px;
  margin-bottom: 38px;
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 28px;
  font-weight: 500;
`
export const Highlight = styled.span`
  color: ${theme('rainbow.orange')};
  font-weight: 600;
  margin-left: 1px;
`
export const Desc = styled.div`
  color: ${theme('hint')};
  width: 300px;
  font-size: 16px;
  margin-top: 10px;
  line-height: 26px;
`
export const Tabs = styled.div`
  ${css.column('align-start')};
  gap: 20px 0;
  border-left: 2px solid;
  border-left-color: #e9e9e9;
  padding: 0 20px;
`
export const TabItem = styled.div<TActive>`
  position: relative;
  font-size: 16px;
  font-weight: 500;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  opacity: ${({ $active }) => ($active ? 1 : 0.8)};
  cursor: pointer;

  &:hover {
    color: ${theme('article.title')};
  }

  &:before {
    content: '';
    position: absolute;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    top: 2px;
    left: -23px;
    height: 20px;
    width: 4px;
    border-radius: 5px;
    background: ${theme('rainbow.orange')};
  }

  transition: all 0.2s;
`
