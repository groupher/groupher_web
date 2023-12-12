import styled, { css, theme } from '@/css'

import BotSVG from '@/icons/Bot'

export const Wrapper = styled.div<{ isFold: boolean }>`
  ${css.row('align-center')};
  padding: ${({ isFold }) => (isFold ? '0 5px' : '5px 10px')};
  border-radius: 5px;
  background: ${({ isFold }) => (isFold ? 'transparent' : '#00313d')};
  width: ${({ isFold }) => (isFold ? 'auto' : '100%')};
  height: ${({ isFold }) => (isFold ? 'auto' : '35px')};
  margin-bottom: ${({ isFold }) => (isFold ? '2px' : '10px;')};
`

export const BotIcon = styled(BotSVG)`
  fill: ${theme('article.digest')};
  ${css.size(15)};
  margin-top: -1px;
  opacity: 0.6;
`
export const Content = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  margin-left: 10px;
  font-size: 13px;
`
export const Reason = styled.div`
  color: ${theme('article.title')};
`
