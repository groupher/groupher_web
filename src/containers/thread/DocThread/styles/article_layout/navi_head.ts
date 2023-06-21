import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import ArrowButton from '@/widgets/Buttons/ArrowButton'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  font-size: 13px;
  margin-bottom: 3px;
`
export const Home = styled(ArrowButton)`
  transform: scale(0.8);
  margin-left: -2px;
`
export const Slash = styled.div`
  font-size: 10px;
  margin-top: -1px;
  color: ${theme('article.info')};
  margin-left: 3px;
  margin-right: 7px;
`
export const Cur = styled.div`
  color: ${theme('article.digest')};
`
