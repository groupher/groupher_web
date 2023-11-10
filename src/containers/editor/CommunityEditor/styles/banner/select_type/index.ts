import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div<{ marginTop: boolean }>`
  position: relative;
  ${css.column('align-center')};
  color: ${theme('article.digest')};
  width: 100%;
  min-height: ${({ marginTop }) => (!marginTop ? '480px' : '680px;')};
  margin-top: ${({ marginTop }) => (marginTop ? '68px' : '0')};
  transition: all 0.4s;
`
export const InnerWrapper = styled.div`
  ${css.column('align-center')};
  height: 380px;
  margin-top: 50px;
`
export const IntroTitle = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 18px;
  margin-bottom: 20px;
  margin-left: -10px;
`
export const SloganTextWrapper = styled.div<{ $highlight: boolean }>`
  margin-left: 3px;
  margin-right: 3px;

  font-weight: ${({ $highlight }) => ($highlight ? 'bold' : '')};
  color: ${({ $highlight }) => ($highlight ? theme('article.title') : theme('article.digest'))};
`
export const AddNewIcon = styled(Img)`
  fill: ${theme('article.title')};
  ${css.size(18)};
  margin-right: 10px;
  transform: rotate(-90deg);
  margin-top: -1px;
`
export const Title = styled.div`
  color: ${theme('banner.title')};
  font-size: 1.1rem;
`
export const NextBtn = styled.div`
  ${css.row('justify-center')};
  width: 280px;
  margin-top: 24px;
`
export const Note = styled.div`
  ${css.row('align-center')};
  margin-top: 50px;
  font-size: 13px;
  margin-left: 5px;
`
