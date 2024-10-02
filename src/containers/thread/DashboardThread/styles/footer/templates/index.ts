import type { TActive } from '~/spec'
import styled, { css, theme } from '~/css'

import ArrowSVG from '~/icons/ArrowSimple'

import Button from '~/widgets/Buttons/Button'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, primary, br, bg, shadow } = useTwBelt()

  return {
    wrapper: cn('column gap-4 pb-8'),
    template: cn(
      'w-11/12 h-16 border rounded-md pointer',
      `hover:${primary('border')}`,
      br('divider'),
      bg('alphaBg'),
      'trans-all-100',
    ),
    templateActive: cn(primary('borderSoft'), shadow('md')),
    arrowIcon: cn('size-3.5 rotate-180', primary('fill')),
  }
}

export const Wrapper = styled.div`
  ${css.column('align-both')};
  gap: 15px;
  padding-bottom: 30px;

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.25turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
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
