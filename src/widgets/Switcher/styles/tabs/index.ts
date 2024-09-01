import useTwBelt from '~/hooks/useTwBelt'

type TProps = {
  noAnimation: boolean
  slipHeight: 'px' | 0.5
}

export default ({ noAnimation, slipHeight }: TProps) => {
  const { cn, bg, primary, enhanceDark, isDarkBlack } = useTwBelt()

  return {
    wrapper: cn('relative text-sm w-auto overflow-hidden'),
    nav: cn('row-center relative flex-nowrap p-o my-auto'),
    slipbar: cn(
      'row justify-center absolute bottom-px left-0 opacity-65',
      noAnimation && 'trans-all-200',
      `h-${slipHeight}`,
    ),
    realBar: cn('h-0.5', primary('bg'), isDarkBlack && bg('text.digest'), enhanceDark()),
  }
}
