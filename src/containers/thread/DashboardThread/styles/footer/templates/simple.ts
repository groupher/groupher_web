import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import GithubSVG from '@/icons/social/Github'
import EmailSVG from '@/icons/social/Email'
import TwitterSVG from '@/icons/social/Twitter'

import { TemplateBlock } from '.'

export const Wrapper = styled(TemplateBlock)`
  ${css.flex('align-center', 'justify-between')};
  height: 60px;
  padding: 0 20px;
`
export const LeftWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 10px;
`
export const BrandLogo = styled.div`
  ${css.circle(18)};
  background: ${theme('divider')};
`
export const BrandText = styled.div`
  color: ${theme('article.title')};
`

export const CenterWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 14px;
`

export const LinkItem = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }
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

export const RightWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 10px;
`
