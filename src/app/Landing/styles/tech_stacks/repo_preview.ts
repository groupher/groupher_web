import useTwBelt from '~/hooks/useTwBelt'
import { COLOR_NAME } from '~/const/colors'

export { cn } from '~/css'

export default () => {
  const { cn, rainbow } = useTwBelt()

  return {
    wrapper: cn('relative mt-5 w-full h-32 text-text-digest-dark'),
    header: 'row-center',
    repo: 'text-lg h-full',
    repoName: 'text-text-title-dark bold-sm',
    repoDesc: 'text-sm text-text-digest-dark w-full break-all mt-1',
    //
    footer: 'row-center mt-3',
    info: 'row-center text-sm mr-4 text-text-title-dark',
    icon: 'size-3.5 fill-text-digest-dark mr-1.5',
    //
    langBar: 'w-full row-center -mt-2',
    bar: 'h-1.5 brightness-90',
    bgPurple: rainbow(COLOR_NAME.PURPLE, 'bg'),
    bgBlue: rainbow(COLOR_NAME.BLUE, 'bg'),
    bgYellow: rainbow(COLOR_NAME.YELLOW, 'bg'),
  }
}
