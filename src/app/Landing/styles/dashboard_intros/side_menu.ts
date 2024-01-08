import type { TActive, TColor } from '@/spec'
import styled, { css, rainbow, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 300px;
  height: 100%;
  padding-left: 60px;
`
export const InnerWrapper = styled.div`
  ${css.column('align-start')};
`
export const Highlight = styled.span`
  color: ${theme('rainbow.orange')};
  font-weight: 600;
  margin-left: 1px;
`
export const Tabs = styled.div`
  ${css.column('align-start')};
`
type TTabItem = TActive & TColor
export const TabItem = styled.div<TTabItem>`
  position: relative;
  cursor: pointer;

  padding: ${({ $active }) => ($active ? '14px 10px' : '12px 10px')};
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
    border-left-color: ${({ $color }) => rainbow($color)};
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
    background: ${({ $color }) => rainbow($color)};
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
