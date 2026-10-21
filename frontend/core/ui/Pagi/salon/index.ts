import { cn } from '~/css'
import { cachedMargin } from '~/hooks/useTwBelt/constant'
import type { TSpace } from '~/spec'

type TProps = TSpace

export { cn } from '~/css'

export default function useSalon({ ...spacing }: TProps) {
  return {
    wrapper: cn('row justify-center w-full', cachedMargin(spacing)),
    action:
      'rounded-lg border border-digest px-4 py-2 text-title hover:bg-hoverBg disabled:cursor-not-allowed disabled:opacity-50',
    inner: 'row-between w-56',
    empty: 'align-both',
    //
    main: 'row-center ml-10 mr-8',
    slash: cn('text-xs mt-px mx-2', 'text-digest'),
    total: cn('pretty-num text-sm', 'text-digest'),
    //
    bottomMsg: cn(
      'text-base',
      'text-digest',
      'opacity-80',
      'before:content-["/\\\\*"] before:mr-2.5 before:font-mono',
      'after:content-["*/"] after:ml-2.5 after:font-mono',
    ),

    //
    arrowBlock: cn(
      'align-both w-14 h-7',
      'group align-both rounded trans-all-100 pointer hover:bg-hoverBg',
    ),
    arrowIcon: cn('size-5', 'trans-all-100 pointer fill-digest group-hover:fill-title'),
    arrowDisabled: 'cursor-not-allowed',
    // ref: https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
    numInputer: cn(
      'pretty-num h-7 px-0.5 py-0 outline-none border rounded-lg text-center',
      'trans-all-200',
      'border-digest',
      'text-title',
      'bg-form-inputBg',
      'hover:border-title',
      'focus:border-title',
      '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
    ),
  }
}
