import useTwBelt from '~/hooks/useTwBelt'
import useTopbar from '~/hooks/useTopbar'
import useWallpaper from '~/hooks/useWallpaper'

export default () => {
  const { cn, bg, rainbow, container, enhanceDark } = useTwBelt()

  const { topbarBg, isDarkBlack } = useTopbar()
  const { hasShadow } = useWallpaper()

  return {
    wrapper: cn(
      container(),
      'column relative w-full h-full min-h-fit',
      'relative transition-transform transition-shadow backdrop-blur-2xl',
      hasShadow && 'shadow-lg',
    ),
    topBar: cn(
      'h-0.5 w-full absolute top-0 left-0',
      rainbow(topbarBg, 'bg'),
      isDarkBlack && bg('text.digest'),
      !isDarkBlack && enhanceDark(),
    ),
    scrollWrapper: 'absolute w-full',
    body: 'column-align-both w-full',
  }
}
