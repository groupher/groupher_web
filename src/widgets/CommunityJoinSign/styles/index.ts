import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div<{ hasFollowed: boolean }>`
  ${css.row('align-center')};
  margin-left: ${({ hasFollowed }) => (hasFollowed ? '-8px' : '5px')};
  margin-top: 1px;
`
export const PopContentWrapper = styled.div`
  text-align: left;
  width: 200px;
  font-size: 13px !important;
  line-height: 1.6;
`
export const PopHeader = styled.div`
  ${css.row('align-center')}
  margin-bottom: 10px;
`
export const PopHeaderIcon = styled(Img)`
  fill: ${theme('rainbow.green')};
  padding: 0;
  margin-right: 4px;
  ${css.size(14)};
`
export const PopHeaderText = styled.div`
  color: ${theme('rainbow.green')};
  font-size: 13px;
  font-weight: bold;
`
export const PopHighlight = styled.span`
  font-size: 14px;
  font-weight: bold;
`
