import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import GithubSVG from '@/icons/social/Github'
import EmailSVG from '@/icons/social/Email'
import TwitterSVG from '@/icons/social/Twitter'

export const Wrapper = styled.div`
  ${css.flex('align-center', 'justify-between')};
  width: 100%;
  height: 60px;
  border: 1px solid;
  /* border-color: ${theme('divider')}; */
  border-color: ${theme('article.digest')};
  padding: 0 20px;
  border-radius: 5px;
  box-shadow: ${css.cardShadow};
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

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

`

const GithubIcon = styled(GithubSVG)`
  ${baseIconStyles};
`

const EmailIcon = styled(EmailSVG)`
  ${baseIconStyles};
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
