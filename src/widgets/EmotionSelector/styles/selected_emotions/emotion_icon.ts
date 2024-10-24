import Img from '~/Img'
import styled, { css } from '~/css'

export const EIcon = styled(Img)<{ name: string }>`
  margin-top: ${({ name }) => (name === 'downvote' ? '2px' : 0)};
  ${({ name }) => (name === 'confused' || name === 'popcorn' ? css.size(15) : css.size(14))};
  margin-right: 6px;

  filter: saturate(0.9);
`
export const holder = 1
