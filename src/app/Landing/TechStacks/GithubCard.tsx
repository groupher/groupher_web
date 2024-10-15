import GithubSVG from '~/icons/social/Github'

import RepoPreview from './RepoPreview'
import Teams from './Teams'

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
      <RepoPreview
        name="groupher_web"
        desc="groupher.com 前端代码，基于 next.js/styled-components 构建"
      />

      <Teams />
    </div>
  )
}
