import useWallpaper from '~/hooks/useWallpaper'

import { getPathGradient } from '../metric'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg, global } = useTwBelt()
  const { wallpaper } = useWallpaper()

  return {
    wrapper: cn('column-align-both w-full h-72'),
    logo: 'size-12 mb-5',
    title: cn('text-2xl bold-sm opacity-90', fg('text.title'), global('text-shadow')),
    desc: cn('row-center text-lg mt-4 mb-10', fg('text.digest')),
    hightLight: cn('bold-sm ml-px mr-px', fg('text.title')),
    //
    buttons: 'row-center gap-x-4',

    createButton: cn('group rounded-xl border-4 border-transparent px-3 h-10 trans-all-200'),
    createButtonStyle: {
      background: `linear-gradient(#323132, #323132) padding-box, linear-gradient(to left, ${getPathGradient(
        wallpaper,
      )}) border-box;`,
    },
  }
}
