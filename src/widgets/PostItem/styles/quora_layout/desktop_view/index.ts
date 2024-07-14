import styled, { css, theme } from '~/css'

import useMainSalon, { DesktopHoverable, DesktopDigest } from '../..'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn } = useTwBelt()
  const main = useMainSalon()

  return {
    wrapper: cn(main.hoverable, 'column grow'),
  }
}

export const Wrapper = styled(DesktopHoverable)`
  padding: 8px 0;
  margin-bottom: 6px;
`
export const Digest = styled(DesktopDigest)`
  ${css.cutRest('530px')};
  margin-top: 6px;
  margin-bottom: 12px;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`
