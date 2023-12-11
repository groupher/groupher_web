import { FC } from 'react'

import { useParallax } from 'react-scroll-parallax'

import { GITHUB } from '@/config'
import ArrowButton from '@/widgets/Buttons/ArrowButton'

import TechItem from './TechItem'

import {
  Wrapper,
  Slogan,
  Title,
  Desc,
  Wall,
  BgWrapper,
  TechsWrapper,
  CADBackground,
  GithubLink,
  GithubIcon,
  BottonNote,
} from '../styles/tech_stacks'

const TeckStacks: FC = () => {
  const { ref } = useParallax<HTMLDivElement>({ speed: 5 })

  return (
    <Wrapper>
      <Slogan>
        <Title>由开源技术栈驱动，欢迎共建</Title>
        <Desc>
          现代化的产品体验得益于现代化的技术栈及工具，
          <ArrowButton>了解更多</ArrowButton>
        </Desc>
      </Slogan>
      <Wall>
        <TechsWrapper>
          <TechItem path="pl/elixir.png" name="Elixir" size={44} />
          <TechItem path="framework/phoenix.svg" name="Phoenix" />
          <TechItem path="database/postgresql.png" name="PostgreSQL" size={40} />
          <TechItem path="framework/absinthe.png" name="Absinthe" size={43} />
          <TechItem path="framework/ecto.png" name="Ecto" size={48} />

          <TechItem path="framework/graphql.png" name="GraphQL" size={43} />

          <TechItem path="framework/nextjs.png" name="Next.js" size={65} />
          <TechItem path="framework/react.svg" name="React" />
          <TechItem path="pl/typescript.png" name="TS" size={40} />
          <TechItem path="framework/mobx.png" name="Mobx" size={42} />
          <TechItem path="framework/mst.png" name="MST" size={42} />
          <TechItem path="framework/ramda.webp" name="Ramda" size={40} />
          <TechItem path="framework/nodejs.png" name="Node" size={42} />
          <TechItem path="framework/rxjs2.png" name="Rx.js" size={45} />
          <TechItem path="framework/styled-components.png" name="Styled" size={43} />
          <TechItem path="framework/editor.js.png" name="Editor.js" size={58} />

          <TechItem path="editor/emacs.png" name="Emacs" size={42} />

          <TechItem path="devops/kubernetes.png" name="K8S" size={42} />
          <TechItem path="devops/docker.png" name="Docker" size={50} />
          <TechItem path="devops/git.png" name="Git" size={46} />
          <TechItem path="design/gimp.png" name="GIMP" size={55} />
          <TechItem path="design/phosphor.png" name="Phosphor" size={42} />
        </TechsWrapper>
        <BgWrapper ref={ref}>
          <CADBackground src="/cad-bg.png" />
        </BgWrapper>
      </Wall>

      <GithubLink href={GITHUB}>
        <GithubIcon />
        Github
      </GithubLink>
      <BottonNote>Groupher 完全开源，欢迎任何形式的参与</BottonNote>
    </Wrapper>
  )
}

export default TeckStacks
