import { FC } from 'react'

import { Brick } from '@/widgets/Common'
import {
  Wrapper,
  Repo,
  RepoName,
  RepoDesc,
  Footer,
  Info,
  Icon,
  LangBar,
} from '../styles/tech_stacks/repo_preview'

type TProps = {
  name: string
  desc: string
  type: 'frontend' | 'backend'
}

const RepoPreview: FC<TProps> = ({ name, desc, type }) => {
  return (
    <Wrapper>
      <Repo>
        <div>
          groupher/<RepoName>{name}</RepoName>
        </div>
        <RepoDesc>{desc}</RepoDesc>

        <Footer>
          <Info>
            <Icon.Star />3
          </Info>
          <Info>
            <Icon.Fork />1
          </Info>
          <Info>
            <Icon.Contribute />3
          </Info>
        </Footer>
      </Repo>

      <LangBar>
        {type === 'frontend' ? (
          <>
            <Brick left={0} bottom={0} $color="BLUE" $width={330} />
            <Brick right={0} bottom={0} $color="YELLOW" $width={30} />
          </>
        ) : (
          <Brick left={0} bottom={0} $color="PURPLE" $width={350} />
        )}
      </LangBar>
    </Wrapper>
  )
}

export default RepoPreview
