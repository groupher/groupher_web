import type { TActive } from '~/spec'
import styled, { css, theme } from '~/css'

import ArrowSVG from '~/icons/ArrowSimple'

import Button from '~/widgets/Buttons/Button'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, br, bg } = useTwBelt()

  return {
    wrapper: cn('column-align-both gap-4 pb-8'),
    template: cn(
      'w-full h-16 border rounded-md pointer',
      `hover:${br('text.digest')}`,
      br('text.hint'),
      bg('alphaBg'),
      'trans-all-100',
    ),
    templateActive: cn(br('text.digest')),
  }
}

export const TemplateBlock = styled.div<TActive>`
  width: 100%;
  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('article.digest') : theme('divider'))};
  box-shadow: ${({ $active }) => ($active ? css.cardShadow : '')};

  border-radius: 5px;

  &:hover {
    border-color: ${theme('article.digest')};
    box-shadow: ${css.cardShadow};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const ArrowIcon = styled(ArrowSVG)<{ rotate?: boolean }>`
  ${css.size(14)};
  fill: ${theme('article.title')};
  margin-left: 5px;
  transform: ${({ rotate }) => (rotate ? 'rotate(90deg);' : 'rotate(180deg);')};
`

export const ToggleButton = styled(Button)``

export const ToggleText = styled.div`
  ${css.row('align-center')};
  opacity: 0.8;

  ${ToggleButton}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
