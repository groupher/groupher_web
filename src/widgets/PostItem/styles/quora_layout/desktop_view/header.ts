import styled, { theme } from '~/css'

import useTwBelt from '~/hooks/useTwBelt'

import DotDivider from '~/widgets/DotDivider'

type TProps = {
  isPinned?: boolean
}

export default ({ isPinned }: TProps) => {
  const { cn, fg, primary } = useTwBelt()

  return {
    wrapper: 'column',
    topping: 'row-center mb-1',
    main: 'row-center grow',
    title: cn(
      'row-center relative font no-underline opacity-85',
      isPinned ? primary('fg') : fg('text.title'),
      isPinned ? 'bold' : 'bold-sm',
      'hover:opacity-100 pointer group-hover/post:underline',
      'transition-colors',
    ),
    author: cn('text-xs', fg('text.hint')),
    publish: cn('text-xs', fg('text.hint')),
  }
}

export const TitlePopInfo = styled.div`
  padding: 4px 8px;
`
export const TitleLink = styled.div`
  position: relative;
  font-size: 15px;
  margin-top: -1px;
  color: ${theme('article.link')};
  margin-left: 10px;
  opacity: 0.8;
  text-decoration: underline;
`

export const Dot = styled(DotDivider)`
  background-color: ${theme('article.digest')};
  margin-right: 8px;
`
