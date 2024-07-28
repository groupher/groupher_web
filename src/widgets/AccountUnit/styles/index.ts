import { includes } from 'ramda'

import type { TSpace } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'
import useLayout from '~/hooks/useLayout'
import { BANNER_LAYOUT } from '~/const/layout'

type TProps = TSpace

export default ({ ...spacing }: TProps) => {
  const { cn, margin, fg, bg, br, fill } = useTwBelt()
  const { bannerLayout } = useLayout()

  const normalWrapper = cn('row-center', margin(spacing))
  const withBgWrapper = cn(
    'row-center border h-8 rounded-lg px-2 py-1.5 pointer',
    br('divider'),
    bg('alphaBg'),
  )

  const wrapper = includes(bannerLayout, [BANNER_LAYOUT.TABBER, BANNER_LAYOUT.SIDEBAR])
    ? withBgWrapper
    : normalWrapper

  return {
    wrapper,
    hoverBox: cn(
      'align-both size-6 rounded border border-transparent pointer',
      `hover:${bg('hoverBg')}`,
      `hover:${br('divider')}`,
    ),
    nickname: cn('font-sm ml-2.5', fg('text.digest')),
    unLoginIcon: cn('size-3 pointer', fill('text.digest'), `hover:${fill('text.title')}`),
  }
}

// export const WithBgWrapper = styled(NormalWrapper)`
//   border: 1px solid;
//   border-color: ${theme('divider')};
//   height: 32px;
//   border-radius: 10px;
//   padding: 5px 8px;
//   width: auto;
//   background: ${theme('alphaBg')};
//   box-shadow: ${theme('popover.boxShadow')};

//   &:hover {
//     cursor: pointer;
//   }
// `
