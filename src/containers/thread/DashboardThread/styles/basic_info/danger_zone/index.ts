import styled, { css, theme } from '@/css'

import InfoSVG from '@/icons/Info'

export const Wrapper = styled.div`
  ${css.column()};
  width: 100%;
`
export const DangerTitle = styled.div`
  color: ${theme('rainbow.red')};
  font-size: 18px;
  font-weight: 500;
  padding-top: 42px;
  margin-bottom: 22px;
  border-top: 1px solid;
  border-top-color: ${theme('divider')};
`
export const Item = styled.div`
  ${css.row('align-start')};
  padding-top: 15px;
  min-height: 80px;
  width: 100%;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  position: relative;
`
export const Intro = styled.div`
  flex-grow: 1;
`
export const Title = styled.div`
  ${css.row('align-center')};
  font-size: 15px;
  color: ${theme('article.title')};
  font-weight: 500;
  margin-bottom: 3px;
`
export const InfoIcon = styled(InfoSVG)`
  fill: ${theme('hint')};
  ${css.size(16)};
  margin-left: 4px;
  cursor: pointer;

  &:hover {
    fill: ${theme('article.title')};
  }
`
export const Desc = styled.div`
  font-size: 14px;
  color: ${theme('article.digest')};
`
export const TabsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: -14px;
`
