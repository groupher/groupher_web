import useWallpaper from '~/hooks/useWallpaper'
import { COLOR_NAME } from '~/const/colors'

import { getGithubGradient } from '../metric'

import useTwBelt from '~/hooks/useTwBelt'

import useBase from '..'

export default () => {
  const { cn, fill, shadow, rainbow } = useTwBelt()
  const { wallpaper } = useWallpaper()
  const base = useBase()

  return {
    wrapper: cn(
      'column w-[340px] h-96 rounded-xl p-5 bg-htmlBg-dark z-30 rotate-2 border-2',
      shadow('xl'),
      rainbow(COLOR_NAME.PURPLE, 'border'),
    ),
    backgroundStyle: { background: getGithubGradient(wallpaper) },
    //
    topping: 'row-center mb-1.5',
    //
    githubIcon: cn('size-10 absolute top-4 right-6 opacity-20', fill('text.digest')),
    githubTitle: cn('text-lg clip-text mt-1.5 ml-1.5'),
    gradientTextStyle: base.textGradientStyle,
  }
}
