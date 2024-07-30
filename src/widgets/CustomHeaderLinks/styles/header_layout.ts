import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

import useBase from '.'

export default () => {
  const { cn, bg } = useTwBelt()
  const { link, linkActive, arrowIcon } = useBase()

  return {
    wrapper: cn('row-center gap-x-3.5 ml-1.5'),
    menuPanel: cn('w-36', bg('popover.bg')),
    link,
    linkActive,
    arrowIcon,
    groupItem: cn('relative pr-4'),
  }
}
