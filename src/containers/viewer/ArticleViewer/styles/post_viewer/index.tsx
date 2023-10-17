import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div``
export const BodyWrapper = styled.div`
  min-height: 200px;
  margin-top: 22px;
  margin-bottom: 14px;
`
export const Title = styled.div`
  margin-left: 2px;
  position: relative;
`
export const TitleText = styled.h3`
  font-size: 25px;
  font-weight: 400;
  width: calc(100% - 30px);
  color: ${theme('article.title')};
`
export const SubTitle = styled.span`
  position: absolute;
  top: 5px;
  right: 0;
  color: ${theme('lightText')};
  opacity: 0.8;
  font-size: 20px;

  &:before {
    content: '#';
    margin-top: 1px;
    margin-right: 3px;
    font-size: 18px;
    font-family: system-ui;
  }
`

export const GoTopWrapper = styled.div<{ show: boolean }>`
  ${css.row('align-end', 'justify-center')};
  position: fixed;
  bottom: 40px;
  left: 102px;
  width: 60px;
  height: 40px;
  opacity: 0.8;

  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};

  &:hover {
    opacity: 1;
  }
  transition: opacity 0.2s;
`
