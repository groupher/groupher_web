import useSEO from '../../logic/useSEO'
import {
  Wrapper,
  CoverWrapper,
  ImageIcon,
  Hint,
  Content,
  URL,
  Title,
  Desc,
} from '../../styles/seo/twitter_preview/summary_large_layout'

// example: https://www.sketch.com/blog/design-portfolio-mindsets/?utm_source=stephaniewalter.design&utm_medium=weeklylinks
// twitter:card = summary_large_image
export default () => {
  const { twUrl, twTitle, twDescription } = useSEO()

  return (
    <Wrapper>
      <Hint>预览</Hint>
      <CoverWrapper>
        <ImageIcon />
      </CoverWrapper>
      <Content>
        <URL>{twUrl || '--'}</URL>
        <Title>{twTitle || '--'}</Title>
        <Desc>{twDescription || '--'}</Desc>
      </Content>
    </Wrapper>
  )
}
