import type { TMetric } from '~/spec'
import styled, { css, theme } from '~/css'
import Img from '~/Img'
import { Wrapper as CommunityWrapper } from './community_layout'

import { getStickerJustify } from './metric'

export const Wrapper = styled(CommunityWrapper)`
  box-shadow: none;
  justify-content: flex-start !important;
`
export const InnerWrapper = styled.div`
  ${css.row('justify-start', 'align-center')};
  width: 100%;
  height: 50px;
  /* border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')}; */
`
export const RouterWrapper = styled.div<{ metric: TMetric }>`
  ${css.row('align-center')};
  width: 100%;
  height: 100%;
  ${({ metric }) => css.fitContentWidth(metric)};
`
export const Operations = styled.div<{ metric: TMetric }>`
  ${css.row('align-center')};
  justify-content: ${({ metric }) => getStickerJustify(metric)};
  ${({ metric }) => css.fitStickerWidth(metric)};

  padding-right: 0;
`
export const LoginHint = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
  margin-top: 1px;

  &:hover {
    color: ${theme('button.primary')};
    cursor: pointer;
  }
`
export const MoreIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(24)};
  cursor: pointer;
`
