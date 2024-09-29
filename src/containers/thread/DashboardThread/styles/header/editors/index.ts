import styled, { css, theme } from '~/css'

import PlusSVG from '~/icons/Plus'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg, sexyHBorder } = useTwBelt()

  return {
    topWrapper: cn('row justify-between mb-5'),
    divider: cn('mb-10', sexyHBorder(35)),
    groupInputer: 'w-60',
    leftPart: 'column w-64 gap-y-6',
    rightPart: 'w-56 mr-4',
    noteTitle: cn('text-xs mb-2.5 bold-sm', fg('text.digest')),
    noteP: cn('text-xs mb-3 opacity-80', fg('text.digest')),
  }
}

export const Adder = styled.div`
  ${css.row('align-center')}
  width: 180px;
  margin-left: -5px;
  transform: scale(0.96);
`
export const Slash = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  margin-left: 10px;
  margin-right: 10px;
  opacity: 0.8;
`
export const PlusIcon = styled(PlusSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 6px;
`

export const LinkGroup = styled.div`
  ${css.rowWrap('justify-start')};
  margin-top: 30px;
  width: calc(100% + 50px);
  gap: 30px;
`
export const ColumnWrapper = styled.div`
  width: 30%;
  height: 100%;
`
export const ItemsWrapper = styled.div`
  ${css.column()};
  gap: 20px 0;
  margin-bottom: 32px;
`
