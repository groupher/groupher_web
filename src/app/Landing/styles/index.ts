import styled, { css, theme } from '~/css'

import useWallpaper from '~/hooks/useWallpaper'

import Button from '~/widgets/Buttons/Button'

import ArrowSVG from '~/icons/ArrowSimple'

// import { getGlowOpacity, getGlowBackground, getPathGradient } from './metric'
import { getPathGradient } from './metric'

import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export const GradientText = styled.div<{ wallpaper: string }>`
  color: ${theme('article.digest')};
  background: ${({ wallpaper }) => `linear-gradient(to left, ${getPathGradient(wallpaper)})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`

export default () => {
  const { cn, fg, fill, container, linkable, menu, global, sexyHBorder } = useTwBelt()
  const { wallpaper } = useWallpaper()

  return {
    wrapper: cn('column-align-both relative h-full w-full overflow-hidden', container()),
    inner: 'column-align-both relative w-full h-full',
    banner: 'column-center relative w-full h-[640px]',
    betaText: 'clip-text text-base bold mb-3',
    betaGradientStyle: `linear-gradient(to top, ${getPathGradient(wallpaper)})`,
    textGradientStyle: { background: `linear-gradient(to left, ${getPathGradient(wallpaper)})` },
    title: cn('text-4xl bold-sm opacity-70', fg('text.title'), global('text-shadow')),
    desc: cn('text-lg mt-4', fg('text.digest')),
    //
    buttonGroup: 'row-center mt-6 gap-x-6 w-auto',
    linkable: linkable(),
    //
    demoPanel: cn('column gap-x-0.5 py-0.5 w-32', menu('bg')),
    demoItem: cn(menu('bar'), 'py-1'),
    demoItemTitle: cn(menu('title')),
    outLink: cn(menu('link')),
    arrow: cn('size-3.5 rotate-180 ml-0.5', fill('text.digest')),
    //
    divider: cn('mb-20 mt-14', sexyHBorder(35)),
    faqWrapper: 'w-full mb-5',
  }
}

export const StartButton = styled(Button)<{ wallpaper: string }>`
  text-decoration: none;

  background: ${({ wallpaper }) =>
    `linear-gradient(#323132, #323132) padding-box, linear-gradient(to left, ${getPathGradient(
      wallpaper,
    )}) border-box;`};

  border-radius: 10px;
  border: 4px solid transparent;
  padding-left: 20px;
  padding-right: 24px;
  height: 40px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    padding-right: 20px;
  }

  &:active {
    box-shadow: none;
  }

  transition: all 0.2s;
`

export const ArrowLeftIcon = styled(ArrowSVG)`
  ${css.size(16)};
  margin-left: 4px;
  fill: ${theme('button.fg')};
  transform: rotate(180deg);
  margin-right: -8px;
  max-width: 0;

  ${StartButton}:hover & {
    max-width: 16px;
  }

  transition: all 0.2s;
`
