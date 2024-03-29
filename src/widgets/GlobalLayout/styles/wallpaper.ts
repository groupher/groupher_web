import type { TThemeName } from '@/spec'
import THEME from '@/constant/theme'
import styled, { animate } from '@/css'

type TWrapper = { $effect: string; $themeName: TThemeName }
export const Wrapper = styled.div<TWrapper>`
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;

  ${({ $effect }) => $effect || ''};

  filter: ${({ $themeName }) => ($themeName === THEME.NIGHT ? 'brightness(0.85)' : '')};
  /* adjust s value for speed */
  /* position: fixed; */
  /* see https://www.zhangxinxu.com/wordpress/2015/11/css3-will-change-improve-paint/ */
  will-change: transform;
  /**
   * 可以横向滚动，有点意思。。
   * @link https://stackoverflow.com/questions/37903824/how-can-i-make-infinite-flowing-background-with-only-css
  */

  /* animation: ${animate.animatedBg} 3000s linear; */
  transition: all 0.3s;
`
export const InnerWrapper = styled.div`
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
`
