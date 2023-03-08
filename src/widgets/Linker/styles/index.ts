import styled from 'styled-components'

import type { TTestable, TSpace } from '@/spec'

import css, { theme } from '@/utils/css'

import LinkSVG from '@/icons/Link'
import LinkOutSVG from '@/icons/LinkOut'

type TWrapper = { inline: boolean } & TSpace & TTestable
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  align-items: center;
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
`

export const Hint = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.8;
  margin-right: 5px;
  margin-top: 2px;
`
export const LinkIcon = styled(LinkSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  margin-right: 3px;
  opacity: 0.6;
`
export const LinkOutIcon = styled(LinkOutSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  margin-right: 6px;
  margin-left: 3px;
`
export const Source = styled.a<{ plainColor: boolean }>`
  color: ${({ plainColor }) => (plainColor ? theme('article.digest') : theme('link'))};
  font-size: 13px;
  text-decoration: none;
  word-break: break-all;
  ${css.lineClamp(1)};

  &:hover {
    color: ${theme('linkHover')};
    text-decoration: underline;
  }
`
export const PopHint = styled.div`
  font-size: 12px;
  padding: 4px 10px;
  color: ${theme('article.title')};
`
