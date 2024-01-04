import { FC } from 'react'

import useSEOInfo from '../../hooks/useSEOInfo'
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
const SummaryLargePreview: FC = () => {
  const { twUrl, twTitle, twDescription } = useSEOInfo()

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

export default SummaryLargePreview
