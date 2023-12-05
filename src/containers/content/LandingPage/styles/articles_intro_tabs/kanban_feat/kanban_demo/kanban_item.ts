import styled from 'styled-components'

import UpvoteSVG from '@/icons/Upvote'
import css, { theme } from '@/css'

type TWrapper = { opacity: number; $draging: boolean }

export const Wrapper = styled.div<TWrapper>`
  ${css.column('justify-between')};
  background: ${theme('htmlBg')};
  border-radius: 6px;
  min-height: 62px;
  padding: 8px 6px;
  opacity: ${({ opacity }) => opacity};

  ${({ $draging }) =>
    $draging
      ? `transform: rotate(-3deg) scale(0.95);
      box-shadow: rgba(17, 12, 46, 0.15) 6px -1px 17px 1px;
      margin-left: 5px; margin-right: -7px;z-index: 100; margin-top: -5px;
      border: 1px solid; `
      : ''}
  border-color: ${({ $draging }) => ($draging ? theme('rainbow.blue') : '')};
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  font-weight: 500;
`
export const Footer = styled.div`
  ${css.row('align-center')};
  width: calc(100% + 20px);
  margin-left: -9px;
  transform: scale(0.9);
  opacity: 0.8;
  margin-top: 8px;
`

export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(11)};
  fill: ${theme('article.digest')};
  margin-top: 1px;
`

export const Count = styled.div`
  font-size: 13px;
  color: ${theme('article.title')};
  margin-left: 4px;
  flex-grow: 1;
`
