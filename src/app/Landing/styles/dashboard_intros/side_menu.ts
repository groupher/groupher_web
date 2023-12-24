import type { TActive } from '@/spec'
import styled, { css, theme } from '@/css'

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
`
export const TabItem = styled.div<TActive>`
  position: relative;
  cursor: pointer;

  padding: ${({ $active }) => ($active ? '14px 10px' : '11px 10px')};
  padding-left: 24px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 280px;

  background: ${({ $active }) => ($active ? theme('htmlBg') : 'transparent')};
  box-shadow: ${({ $active }) => ($active ? theme('button.boxShadow') : '')};
  border-left: 2px solid;
  border-left-color: ${theme('divider')};
  margin-top: ${({ $active }) => ($active ? '2px' : 0)};
  margin-bottom: ${({ $active }) => ($active ? '2px' : 0)};

  &:hover {
    border-left-color: ${theme('hint')};
    background: ${theme('htmlBg')};
    box-shadow: ${theme('button.boxShadow')};
  }

  &:before {
    content: "";
    position: absolute;
    opacity: ${({ $active }) => ($active ? 0.5 : 0)};
    top: 0;
    left: -2px;
    height: 134px;
    width: 2px;
    border-radius: 5px;
    background: ${theme('rainbow.purple')};
    filter: saturate(1.2);
  }

  transition: all 0.2s;
`
export const ItemTitle = styled.div<TActive>`
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? 500 : 400)};

  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};

  ${TabItem}:hover & {
    color: ${theme('article.title')};
  }
`
export const ItemDesc = styled.div`
  font-size: 15px;
  margin-top: 3px;
  width: 230px;
  font-weight: 400;
  color: ${theme('hint')};
`
