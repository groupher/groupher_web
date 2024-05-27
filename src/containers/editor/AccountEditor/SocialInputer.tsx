/*
 *
 * AccountEditor
 *
 */

import { type FC, memo, Fragment } from 'react'

import type { TEditData } from './spec'
import { Input, Section, Icon } from './styles/social_inputer'
import { inputOnChange } from './logic'

type TProps = {
  editData?: TEditData
}

const SocialInputer: FC<TProps> = ({ editData }) => {
  const { profile, social } = editData
  return (
    <Fragment>
      <Section>
        <Icon.CityIcon />
        <Input
          value={profile.location}
          placeholder="// 城市"
          onChange={(e) => inputOnChange(e, 'location')}
        />
      </Section>
      <Section>
        <Icon.CompanyIcon />
        <Input
          value={social.company}
          placeholder="// 公司 / 团队名称"
          onChange={(e) => inputOnChange(e, 'company')}
        />
      </Section>
      <Section>
        <Icon.BlogIcon />
        <Input
          value={social.blog}
          placeholder="// 博客 / 主页地址"
          onChange={(e) => inputOnChange(e, 'blog')}
        />
      </Section>

      <Section>
        <Icon.GithubIcon />
        <Input
          value={social.github}
          placeholder="// Github 用户名"
          onChange={(e) => inputOnChange(e, 'github')}
        />
      </Section>
      <Section>
        <Icon.TwitterIcon />
        <Input
          value={social.twitter}
          placeholder="// Twitter 用户名"
          onChange={(e) => inputOnChange(e, 'twitter')}
        />
      </Section>
      <Section>
        <Icon.MailIcon />
        <Input
          value={profile.email}
          placeholder="// 邮箱地址"
          onChange={(e) => inputOnChange(e, 'email')}
        />
      </Section>
    </Fragment>
  )
}

export default memo(SocialInputer)
