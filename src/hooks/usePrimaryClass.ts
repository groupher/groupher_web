import clsx from 'clsx'

import usePrimaryColor from '~/hooks/usePrimaryColor'

type TRet = {
  textColor: string
  bgColor: string
}

export default (): TRet => {
  const primaryColor = usePrimaryColor()
  const color = primaryColor.toLowerCase()

  const textColor = clsx(`text-rainbow-${color}`)
  const bgColor = clsx(`bg-${color}`)

  return {
    textColor,
    bgColor,
  }
}
