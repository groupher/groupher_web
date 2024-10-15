// import { GITHUB } from '~/config'
import GithubSVG from '~/icons/social/Github'

import RepoPreview from './RepoPreview'

import useSalon from '../styles/tech_stacks/github_card'

export default () => {
  const s = useSalon()

  return (
    <div className={s.wrapper} style={s.backgroundStyle}>
      <GithubSVG className={s.githubIcon} />

      <div className={s.topping}>
        <div className={s.githubTitle} style={s.gradientTextStyle}>
          Github
        </div>
      </div>
      {/* <Title>源代码开放</Title>
        <Desc>Groupher 建立在开源技术栈之上，自身也完全开源，欢迎任何形式的参与。</Desc> */}
      <RepoPreview
        type="frontend"
        name="groupher_web"
        desc="groupher.com 前端代码，基于 next.js/styled-components 构建"
      />
    </div>
  )
}
