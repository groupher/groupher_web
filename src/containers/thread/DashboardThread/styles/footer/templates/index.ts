import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

import ArrowSVG from '@/icons/ArrowSimple'
import GithubSVG from '@/icons/social/Github'
import EmailSVG from '@/icons/social/Email'
import TwitterSVG from '@/icons/social/Twitter'

import Button from '@/widgets/Buttons/Button'

export const Wrapper = styled.div`
  ${css.flexColumn('align-both')};
  gap: 15px;
  padding-bottom: 30px;

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.25turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
export const TemplateBlock = styled.div<TActive>`
  width: 100%;
  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('article.digest') : theme('divider'))};
  box-shadow: ${({ $active }) => ($active ? css.cardShadow : '')};

  border-radius: 5px;

  &:hover {
    border-color: ${theme('article.digest')};
    box-shadow: ${css.cardShadow};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const ArrowIcon = styled(ArrowSVG)<{ rotate?: boolean }>`
  ${css.size(14)};
  fill: ${theme('article.title')};
  margin-left: 5px;
  transform: ${({ rotate }) => (rotate ? 'rotate(90deg);' : 'rotate(180deg);')};
`

export const ToggleButton = styled(Button)``

export const ToggleText = styled.div`
  ${css.flex('align-center')};
  opacity: 0.8;

  ${ToggleButton}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`

const baseIconStyles = `
  ${css.size(13)};
  fill: ${theme('article.digest')};
  opacity: 0.6;

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
    opacity: 1;
  }

`
const GithubIcon = styled(GithubSVG)`
  ${baseIconStyles};
`
const EmailIcon = styled(EmailSVG)`
  ${baseIconStyles};
  ${css.size(12)};
  margin-right: 4px;
  margin-top: 1px;
`

const TwitterIcon = styled(TwitterSVG)`
  ${baseIconStyles};
`

export const SocialIcon = {
  Github: GithubIcon,
  Email: EmailIcon,
  Twitter: TwitterIcon,
}
