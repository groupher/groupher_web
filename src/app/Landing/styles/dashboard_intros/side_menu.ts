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
`
export const TabItem = styled.div<TActive>`
  position: relative;
  cursor: pointer;

  padding: ${({ $active }) => ($active ? '6px 10px' : '0 10px')};
  padding-left: 24px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 280px;

  background: ${({ $active }) => ($active ? theme('htmlBg') : 'transparent')};
  box-shadow: ${({ $active }) => ($active ? theme('button.boxShadow') : '')};

  &:before {
    content: '';
    position: absolute;
    opacity: ${({ $active }) => ($active ? 0.5 : 0)};
    top: 0;
    // left: -26px;
    left: -2px;
    height: 85px;
    width: 2px;
    border-radius: 5px;
    background: ${theme('rainbow.purple')};
    filter: saturate(1.2);
  }

  transition: all 0.2s;
`
export const ItemTitle = styled.div<TActive>`
  font-size: 16px;
  font-weight: 500;

  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  opacity: ${({ $active }) => ($active ? 1 : 0.8)};

  ${TabItem}:hover & {
    color: ${theme('article.title')};
  }
`
export const ItemDesc = styled.div`
  font-size: 15px;
  margin-top: 3px;
  width: 200px;
  font-weight: 400;
  color: ${theme('hint')};
`
