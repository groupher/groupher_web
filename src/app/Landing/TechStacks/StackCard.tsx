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
        <Desc>现代化的产品体验得益于现代化的技术栈及工具，这里列出部分主要工具，略表敬意。</Desc>
      </Banner>
      <TechsWrapper>
        <TechItem path="elixir.png" name="Elixir" size={34} />
        <TechItem path="phoenix.png" name="Phoenix" size={32} />
        <TechItem path="pg.png" name="PG" size={30} />
        <TechItem path="absinthe.png" name="Absinthe" size={33} />
        <TechItem path="ecto.png" name="Ecto" size={38} />
        <TechItem path="graphql.png" name="GraphQL" size={33} />
        <TechItem path="nextjs.png" name="Next.js" size={55} />
        <TechItem path="react.png" name="React" size={45} />
        <TechItem path="typescript.png" name="TypeScript" size={30} />
        <TechItem path="mobx.png" name="Mobx" size={30} />
        <TechItem path="mst.png" name="MST" size={32} />
        <TechItem path="ramda.png" name="Ramda" size={28} />
        <TechItem path="rxjs.png" name="Rx.js" size={32} />
        <TechItem path="styled.png" name="Styled" size={33} />
        <TechItem path="slate.png" name="Slate" size={30} />
        <TechItem path="biome.png" name="Biome" size={35} />
        <TechItem path="phosphor.png" name="Phosphor" size={32} />
        <TechItem path="a4.png" name="Paper" size={32} />
      </TechsWrapper>
      <BgWrapper ref={ref}>
        <CADBackground src="/cad-bg.png" />
      </BgWrapper>
    </Wrapper>
  )
}

export default StackCard
