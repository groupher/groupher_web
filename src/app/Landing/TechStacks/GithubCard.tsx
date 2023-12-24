import { FC } from 'react'

// import { GITHUB } from '@/config'
import useWallpaper from '@/hooks/useWallpaper'

import RepoPreview from './RepoPreview'

import {
  Wrapper,
  Banner,
  Title,
  Desc,
  Topping,
  GithubLink,
  GithubIcon,
} from '../styles/tech_stacks/github_card'

const GithubCard: FC = () => {
  const { wallpaper } = useWallpaper()

  return (
    <Wrapper wallpaper={wallpaper}>
      <Banner>
        <Topping>
          <GithubIcon wallpaper={wallpaper} />
          <GithubLink wallpaper={wallpaper}>Github</GithubLink>
        </Topping>
        <Title>源代码开放</Title>
        <Desc>Groupher 建立于开源技术之上，自身也完全开源，欢迎任何形式的参与。</Desc>
      </Banner>
      <RepoPreview
        type="frontend"
        name="groupher_web"
        desc="groupher.com 前端代码，基于 next.js/styled-components 构建"
      />
      <RepoPreview
        type="backend"
        name="groupher_server"
        desc="groupher.com 后端代码，基于 Elixir 的 Phoenix 构建"
      />
    </Wrapper>
  )
}

export default GithubCard
