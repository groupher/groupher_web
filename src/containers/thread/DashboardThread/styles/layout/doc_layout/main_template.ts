import styled, { css, theme } from '~/css'
import useTwBelt from '~/hooks/useTwBelt'

import { COLOR_NAME } from '~/const/colors'

import useBase from '..'

export { cn } from '~/css'

export { Bar, Circle } from '..'

export default () => {
  const { cn, rainbow } = useTwBelt()
  const base = useBase()

  return {
    block: 'relative w-full h-full',
    bar: cn(base.bar, 'h-1.5 w-20 opacity-40'),
    circle: cn(base.circle, 'size-3.5 opacity-40'),
    iconBox: cn('absolute align-both size-4 rounded mt-2 mr-5'),
    icon: 'size-2',
    red: rainbow(COLOR_NAME.RED, 'fill'),
    redBg: rainbow(COLOR_NAME.RED, 'bgSoft'),
    blue: rainbow(COLOR_NAME.BLUE, 'fill'),
    blueBg: rainbow(COLOR_NAME.BLUE, 'bgSoft'),
    green: rainbow(COLOR_NAME.GREEN, 'fill'),
    greenBg: rainbow(COLOR_NAME.GREEN, 'bgSoft'),
    purple: rainbow(COLOR_NAME.PURPLE, 'fill'),
    purpleBg: rainbow(COLOR_NAME.PURPLE, 'bgSoft'),
  }
}

export const CardssLayoutWrapper = styled.div`
  ${css.rowWrap()};
  gap: 10px;
  width: 100%;
`
export const FooterMore = styled.div`
  position: absolute;
  bottom: 5px;
  left: 10%;
  ${css.row('align-both')};
  background: ${theme('hoverBg')};
  border-radius: 3px;
  height: 10px;
  width: 80%;
`
export const BlocksLayoutWrapper = styled.div<{ withDivider?: boolean }>`
  ${css.rowWrap()};
  gap: 22px 0;
  border-right: ${({ withDivider }) => (withDivider ? '1px solid' : 'none')};
  border-right-color: ${theme('divider')};
  width: 100%;
`
export const Box3 = styled.div`
  width: 33.3%;
`
export const BorderBox3 = styled.div`
  position: relative;
  width: 30%;
  border: 1px solid;
  border-color: ${theme('divider')};
  padding: 10px;
`
