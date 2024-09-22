import styled, { css, theme } from '~/css'

import UpvoteSVG from '~/icons/Upvote'
import CommentSVG from '~/icons/Comment'

import useTwBelt from '~/hooks/useTwBelt'

import useBase from '.'

export { cn } from '~/css'
export { Bar, Circle } from '.'

export default () => {
  const { cn } = useTwBelt()
  const base = useBase()

  return {
    wrapper: cn(base.baseSection),
    select: cn('row-center wrap gap-x-5 gap-y-5 w-full'),
    inline: 'inline-block',
    layout: 'column-center justify-between h-32',
    block: cn(base.blockBase, 'w-72 h-24'),
    blockActive: base.blockBaseActive,
  }
}

export const Box = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background: ${theme('article.digest')};
  opacity: 0.5;
  margin-bottom: 8px;
`
export const Cover = styled.div`
  width: 90px;
  height: 62px;
  border-radius: 5px;
  background: ${theme('article.digest')};
  opacity: 0.5;
`

type TColumn = { center?: boolean; grow?: boolean }
export const Column = styled.div<TColumn>`
  ${css.column()};
  ${({ center }) => (center ? 'align-items: center;' : '')};
  ${({ grow }) => (grow ? 'flex-grow: 1;' : '')};
`
export const Border = styled.div`
  ${css.column('align-both')};
  border: 1px solid;
  border-color: ${theme('divider')};

  border-radius: 6px;
  padding: 6px 8px;
`

export const UpvoteIcon = styled(UpvoteSVG)<{ size: number }>`
  ${({ size }) => css.size(size)};
  fill: ${theme('article.title')};
  transform: scaleY(0.8);
`
export const CommentIcon = styled(CommentSVG)`
  ${css.size(10)};
  fill: ${theme('article.title')};
`
