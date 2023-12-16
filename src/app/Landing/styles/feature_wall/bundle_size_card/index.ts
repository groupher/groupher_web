import styled, { css, theme } from '@/css'

import { BaseCard } from '..'

export const Wrapper = styled(BaseCard)`
  height: 582px;
`
export const Banner = styled.div`
  ${css.column()};
  padding-left: 20px;
  margin-bottom: 14px;
  width: 100%;
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 2px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  opacity: 0.8;
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
    height: 300px;
    opacity: 0.8;
  }

  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.2);
`
