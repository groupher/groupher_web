import { FC } from 'react'

import { Wrapper, Repo, RepoName, RepoDesc } from '../styles/tech_stacks/repo_preview'

type TProps = {
  name: string
  desc: string
}

const RepoPreview: FC<TProps> = ({ name, desc }) => {
  return (
    <Wrapper>
      <Repo>
        <div>
          groupher/<RepoName>{name}</RepoName>
        </div>
        <RepoDesc>{desc}</RepoDesc>
      </Repo>
    </Wrapper>
  )
}

export default RepoPreview
