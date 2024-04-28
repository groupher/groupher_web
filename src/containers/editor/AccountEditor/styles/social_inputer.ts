import styled, { css, theme } from '@/css'

import FormInput from '@/widgets/Input'

import MailSVG from '@/icons/Mail'
import TwitterSVG from '@/icons/Twitter'
import BlogSVG from '@/icons/Blog'
import GithubSVG from '@/icons/Github8'
import CitySVG from '@/icons/City'
import CompanySVG from '@/icons/Company'

export const Input = styled(FormInput)`
  text-align: left;
  padding: 5px 5px;
  padding-left: 12px;
  height: 36px;
  width: 245px;
  font-size: 15px;
`
export const Section = styled.div`
  ${css.row('align-center')};
  margin-bottom: 20px;
  width: 100%;
  margin-left: 12px;
`
const iconBase = `
  ${css.size(18)};
  margin-right: 10px;
`
export const CityIcon = styled(CitySVG)`
  ${iconBase};
  ${css.size(16)};
  fill: ${theme('article.digest')};
  margin-left: 1px;
  margin-right: 11px;
`
export const CompanyIcon = styled(CompanySVG)`
  ${iconBase};
  fill: ${theme('article.digest')};
`
export const MailIcon = styled(MailSVG)`
  ${iconBase};
  ${css.size(13)};
  margin-left: 1px;
  margin-right: 11px;
  margin-top: 1px;
  fill: ${theme('article.digest')};
`
export const GithubIcon = styled(GithubSVG)`
  ${iconBase};
  ${css.size(15)};
  margin-right: 11px;
  fill: ${theme('article.digest')};
`
export const TwitterIcon = styled(TwitterSVG)`
  ${iconBase};
  ${css.size(14)};
  margin-right: 11px;
  fill: ${theme('article.digest')};
`
export const BlogIcon = styled(BlogSVG)`
  ${iconBase};
  fill: ${theme('article.digest')};
  margin-right: 9px;
  margin-top: -1px;
`
export const Icon = {
  CityIcon,
  CompanyIcon,
  MailIcon,
  GithubIcon,
  TwitterIcon,
  BlogIcon,
}
