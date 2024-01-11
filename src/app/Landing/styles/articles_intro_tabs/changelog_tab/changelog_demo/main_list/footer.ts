import UpvoteSVG from '@/icons/Upvote'

import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-top: 14px;
  width: 200px;
`
export const UpvoteWrapper = styled.div`
  ${css.row('align-both')};
  margin-left: -2px;
  height: 22px;
  width: 42px;
  opacity: 0.8;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 4px;
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(11)};
  fill: ${theme('article.digest')};
`
export const UpvoteCount = styled.div`
  color: ${theme('article.digest')};
  font-weight: 500;
  font-size: 12px;
  margin-left: 4px;
`
export const UsersWrapper = styled.div`
  transform: scale(0.85);
  margin-left: 3px;
  opacity: 0.8;
`
export const PublishDate = styled.div`
  color: ${theme('hint')};
  font-size: 10px;
  opacity: 0.8;
`
