import { FC } from 'react'
import { useParallax } from 'react-scroll-parallax'

import useWallpaper from '@/hooks/useWallpaper'

import TechItem from './TechItem'

import {
  Wrapper,
  Banner,
  Title,
  Desc,
  BgWrapper,
  TechsWrapper,
  CADBackground,
  Topping,
  HighlightText,
  ThunderIcon,
} from '../styles/tech_stacks/stack_card'

const StackCard: FC = () => {
  const { ref } = useParallax<HTMLDivElement>({ speed: 5 })
  const { wallpaper } = useWallpaper()

  return (
    <Wrapper>
      <Banner>
        <Topping>
          <ThunderIcon wallpaper={wallpaper} />
          <HighlightText wallpaper={wallpaper}>Powered by</HighlightText>
        </Topping>

        <Title>我们的主要技术栈</Title>
        <Desc>现代化的产品体验得益于现代化的技术栈及工具，列出部分主要工具，特此鸣谢。</Desc>
      </Banner>
      <TechsWrapper>
        <TechItem path="pl/elixir.png" name="Elixir" size={34} />
        <TechItem path="framework/phoenix.svg" name="Phoenix" />
        <TechItem path="database/postgresql.png" name="PG" size={30} />
        <TechItem path="framework/absinthe.png" name="Absinthe" size={33} />
        <TechItem path="framework/ecto.png" name="Ecto" size={38} />
        <TechItem path="framework/graphql.png" name="GraphQL" size={33} />
        <TechItem path="framework/nextjs.png" name="Next.js" size={55} />
        <TechItem path="framework/react.svg" name="React" />
        <TechItem path="pl/typescript.png" name="TS" size={30} />
        <TechItem path="framework/mobx.png" name="Mobx" size={32} />
        <TechItem path="framework/mst.png" name="MST" size={32} />
        <TechItem path="framework/ramda.webp" name="Ramda" size={30} />
        <TechItem path="framework/rxjs2.png" name="Rx.js" size={35} />
        <TechItem path="framework/styled-components.png" name="Styled" size={33} />
        <TechItem path="framework/editor.js.png" name="Editor.js" size={48} />

        <TechItem path="devops/kubernetes.png" name="K8S" size={32} />
        <TechItem path="design/phosphor.png" name="Phosphor" size={32} />
      </TechsWrapper>
      <BgWrapper ref={ref}>
        <CADBackground src="/cad-bg.png" />
      </BgWrapper>
    </Wrapper>
  )
}

export default StackCard
