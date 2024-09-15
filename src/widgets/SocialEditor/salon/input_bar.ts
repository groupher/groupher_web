import styled, { css, theme } from '~/css'

export { Icon } from '.'

import useTwBelt from '~/hooks/useTwBelt'

export const IconWrapper = styled.div`
  border: 1px solid;
  border-color: ${theme('editor.border')};
  ${css.row('align-both')};
  width: 38px;
  height: 34px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: none;
`

export default () => {
  const { cn, fill, bg, br } = useTwBelt()

  return {
    wrapper: cn('row-center relative'),
    icon: cn('size-4 saturate-100', fill('text.digest')),
    iconWrapper: cn(
      'align-both h-9 w-10 border border-r-none rounded-md',
      bg('hoverBg'),
      br('divider'),
    ),
    deleteIcon: cn(
      'size-5 pointer absolute top-2 -right-2 z-20',
      `hover:${fill('rainbow.red')}`,
      fill('text.digest'),
    ),
  }
}
