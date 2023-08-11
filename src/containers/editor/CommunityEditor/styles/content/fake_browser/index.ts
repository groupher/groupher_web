import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import Img from '@/Img'

const taberBg = '#F1F3F4'

export const Wrapper = styled.div`
  ${css.flexColumn('align-center')};
  width: 100%;
  min-height: 500px;
  border-radius: 12px;
  background: ${theme('alplaBg')};
  border: 1px solid;
  border-color: #e5e5e5;
  /* border-color: ${theme('hoverBg')}; */
  border-bottom: none;

  position: relative;
`
export const Header = styled.div`
  ${css.flex()};
  width: 100%;
  display: flex;
  padding: 8px 20px 0 12px;
  padding-left: 16px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 36px;
  background: ${theme('alplaBg')};
`
export const Tab = styled.div`
  ${css.flex('align-center')};
  flex-basis: 218px;
  background: ${taberBg};
  border-bottom: 1px solid;
  border-bottom-color: ${taberBg};
  height: 29px;
  min-width: 0;
  position: relative;
  margin: 0 5px;
  font-size: 0;

  &:before {
    content: '';
    position: absolute;
    z-index: 10;
    align-self: flex-start;
    height: 28px;
    width: 16px;
    background: ${taberBg};
    border-bottom: 1px solid;
    border-bottom-color: ${taberBg};
    left: 0;
    transform: skewx(-25deg);
    transform-origin: left top;
  }

  &:after {
    content: '';
    position: absolute;
    width: 16px;
    z-index: 10;
    align-self: flex-start;
    height: 28px;
    background: ${taberBg};
    border-bottom: 1px solid;
    border-bottom-color: ${taberBg};

    right: 0;
    transform: skewx(25deg);
    transform-origin: right top;
  }
`

export const TabContent = styled.div`
  z-index: 100;
  flex-grow: 1;
  padding-left: 8px;
  font-size: 12.6px;
  line-height: 28px;
  cursor: default;
  max-width: 200px;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
`
export const AddressBar = styled.div`
  width: 100%;
  ${css.flex('align-center')};
  background: ${taberBg};
  border-bottom: 1px solid;
  border-bottom-color: ${taberBg};
  padding-left: 4px;
  padding-right: 4px;
  height: 38px;
`
export const ToolbarWrapper = styled.div`
  border-radius: 2px;
  margin-left: 2px;
  margin-right: 2px;
  padding: 4px;
  height: 24px;
`
export const ToolIcon = styled(Img)<{ reverse?: boolean }>`
  fill: ${theme('article.digest')};
  opacity: 0.6;
  ${css.size(16)};
  transform: ${({ reverse }) => (reverse ? 'rotate(180deg)' : '')};
`
export const LockIcon = styled(ToolIcon)`
  ${css.size(11)};
  margin-top: 3px;
`
export const Form = styled.form`
  ${css.flex('align-center')};
  flex-grow: 1;
  background: ${theme('alphaBg2')};
  height: 28px;
  border-radius: 15px;
  margin-left: 4px;
  margin-right: 2px;
  padding-left: 5px;
`
export const Input = styled.div`
  border: none;
  width: 100%;
  padding-left: 4px;
  font-size: 14px;
`
export const DomainText = styled.span`
  /* color: ${theme('link')}; */
  background: linear-gradient(to right, rgb(196, 121, 222), rgb(248, 190, 109));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 1px;
`
