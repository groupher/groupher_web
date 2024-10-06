import Link from 'next/link'

import styled, { css, theme } from '~/css'

import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, linkable, fg, bg, fill, hoverLink, hoverLinkIcon, VDivider } = useTwBelt()

  return {
    wrapper: cn('row-center-between w-full p-0 h-16 mb-12'),
    brand: cn(linkable()),
    links: cn('row-center gap-x-6 ml-12 mt-px'),
    linkItem: hoverLink(),
    linkItemActive: fg('text.title'),
    stackLink: cn(hoverLink(), 'hover:no-underline'),
    linkActive: cn(fg('text.title'), bg('hoverBg')),
    //
    requestDemoLink: cn(hoverLink('text-sm')),
    demoIcon: cn(hoverLinkIcon(), 'mt-px'),
    arrowIcon: cn(hoverLinkIcon(), '-rotate-90 mt-px mr-0 ml-1'),
    //
    extraInfo: 'row-center w-40 justify-end',
    githubIcon: cn('size-4', fill('text.digest')),
    divider: cn(VDivider(), 'ml-3'),
  }
}

export const Panel = styled.div<{ width?: string }>`
  ${css.column()};
  margin-top: 3px;
  gap: 3px 0;
  padding: 6px 4px;
  padding-left: 8px;
  width: ${({ width }) => width};
`

export const MenuItem = styled(Link)<{ noDesc?: boolean }>`
  ${css.column('align-start')};
  font-size: 14px;

  padding: ${({ noDesc }) => (noDesc ? '6px 12px;' : '10px 12px')};

  text-decoration: none;
  border-radius: 8px;

  &:hover {
    color: ${theme('article.title')};
    background: ${theme('menuHoverBg')};
    cursor: pointer;
    text-decoration: none;
  }

  will-change: background;
`
export const MenuTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;

  ${MenuItem}:hover & {
    opacity: 1;
    cursor: pointer;
  }
`
export const MenuDesc = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-top: 3px;

  ${MenuItem}:hover & {
    color: ${theme('article.title')};
    cursor: pointer;
  }
`
