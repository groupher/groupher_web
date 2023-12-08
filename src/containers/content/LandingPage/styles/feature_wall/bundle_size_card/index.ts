import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-center', 'justify-end')};
  width: 290px;
  height: 486px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 10px;
  background: ${theme('landing.greyBg')};
  position: relative;
  box-shadow: ${theme('button.boxShadow')};
  cursor: pointer;

  &:hover {
    border-color: ${theme('hint')};
  }
  transition: all 0.2s;
`
export const Banner = styled.div`
  ${css.column()};
  padding-left: 25px;
  margin-bottom: 10px;
  width: 100%;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 2px;
`
export const Desc = styled.div`
  color: ${theme('hint')};
  font-size: 13px;
`
export const WarningMask = styled.div`
  width: 100%;
  height: 12px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-top: 1px dashed;
  border-top-color: ${theme('rainbow.red')};
  background: ${theme('rainbow.redBg')};
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0.6;

  ${Wrapper}:hover & {
    height: 230px;
    opacity: 0.8;
  }

  transition: all 0.15s ease-in-out;
`
