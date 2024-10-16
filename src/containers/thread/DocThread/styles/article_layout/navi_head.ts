import styled, { css, theme } from '~/css'

import ArrowButton from '~/widgets/Buttons/ArrowButton'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  line-height: 22px;
  margin-bottom: 3px;
  margin-top: 18px;
`
export const Home = styled(ArrowButton)`
  opacity: 0.7;
  min-width: 42px;
`
export const Slash = styled.div`
  font-size: 10px;
  color: ${theme('article.info')};
  margin-left: 6px;
  margin-right: 7px;
`
export const Cur = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  margin-top: -1px;
`
