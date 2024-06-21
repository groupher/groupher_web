import useWallpaperValtio from '@/hooks/useWallpaperValtio'

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
  HammerIcon,
} from '../styles/tech_stacks/stack_card'

export default () => {
  const { wallpaper } = useWallpaperValtio()

  return (
    <Wrapper>
      <Banner>
        <Topping>
          <HammerIcon wallpaper={wallpaper} />
          <HighlightText wallpaper={wallpaper}>Techstack</HighlightText>
        </Topping>

        <Title>主要技术栈</Title>
        <Desc>现代化的产品体验得益于现代化的技术栈及生产工具，这里列出主要部分，略表敬意。</Desc>
      </Banner>
      <TechsWrapper>
        <TechItem path="elixir.png" name="Elixir" size={34} />
        <TechItem path="phoenix.png" name="Phoenix" size={32} />
        <TechItem path="pg.png" name="PG" size={34} />
        <TechItem path="absinthe.png" name="Absinthe" size={33} />
        <TechItem path="ecto.png" name="Ecto" size={38} />
        <TechItem path="graphql.png" name="GraphQL" size={33} />
        <TechItem path="nextjs.png" name="Next.js" size={55} />
        <TechItem path="react.png" name="React" size={44} />
        <TechItem path="typescript.png" name="TypeScript" size={30} />
        <TechItem path="mobx.png" name="Mobx" size={30} />
        <TechItem path="mst.png" name="MST" size={32} />
        <TechItem path="ramda.png" name="Ramda" size={28} />
        <TechItem path="rxjs.png" name="Rx.js" size={32} />
        <TechItem path="styled.png" name="Styled" size={33} />
        <TechItem path="slate.png" name="Slate" size={30} />
        <TechItem path="phosphor.png" name="Phosphor" size={32} />
        <TechItem path="emacs.png" name="Emacs" size={33} />
        <TechItem path="notes.png" name="Notes" size={32} />
      </TechsWrapper>
      <BgWrapper>
        <CADBackground src="/cad-bg.png" />
      </BgWrapper>
    </Wrapper>
  )
}
