import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import GithubSVG from '@/icons/social/Github'
import EmailSVG from '@/icons/social/Email'
import TwitterSVG from '@/icons/social/Twitter'

import { TemplateBlock } from '.'

export const Wrapper = styled(TemplateBlock)`
  padding: 12px 20px;
  ${css.flex('align-start', 'justify-between')};
  height: 150px !important;
`
export const LeftWrapper = styled.div`
  ${css.flexColumn()};
`
export const BrandWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 10px;
`
export const BrandLogo = styled.div`
  ${css.circle(13)};
  background: ${theme('divider')};
`
export const BrandText = styled.div`
  color: ${theme('article.title')};
`
export const Desc = styled.div`
  ${css.lineClamp(2)};
  color: ${theme('article.digest')};
  font-size: 10px;
  width: 150px;
  opacity: 0.8;
  margin-top: 4px;
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

export const SocialWrapper = styled.div`
  ${css.flex('align-center')};
  margin-top: 15px;
  gap: 0 6px;
`

export const SocialIcon = {
  Github: GithubIcon,
  Email: EmailIcon,
  Twitter: TwitterIcon,
}
