import { FC } from 'react'

// import { GITHUB } from '@/config'
import useWallpaper from '@/hooks/useWallpaper'
import { SpaceGrow } from '@/widgets/Common'

import RepoPreview from './RepoPreview'

import {
  Wrapper,
  Banner,
  Title,
  Desc,
  Bottom,
  Topping,
  GithubLink,
  GithubIcon,
} from '../styles/tech_stacks/github_card'

const GithubCard: FC = () => {
  const { wallpaper } = useWallpaper()
  return (
    <Wrapper>
      <Banner>
        <Topping>
          <GithubIcon wallpaper={wallpaper} />
          <GithubLink wallpaper={wallpaper}>Github</GithubLink>
        </Topping>
        <Title>源代码开放</Title>
        <Desc>Groupher 的开发得益于开源技术，自身也完全开源，欢迎任何形式的参与。</Desc>
      </Banner>
      <RepoPreview
        name="groupher_web"
        desc="groupher.com 前端代码，基于 next.js/styled-components 构建"
      />
      <RepoPreview
        name="groupher_server"
        desc="groupher.com 后端代码，基于 Elixir 的 Phoenix 构建"
      />
      <SpaceGrow />

      <Bottom>
        <Desc>开源许可证: GPL</Desc>
      </Bottom>
    </Wrapper>
  )
}

export default GithubCard
