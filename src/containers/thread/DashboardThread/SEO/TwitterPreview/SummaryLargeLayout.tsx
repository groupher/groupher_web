import { FC } from 'react'

import type { TSEOSettings } from '../../spec'
import {
  Wrapper,
  CoverWrapper,
  Content,
  URL,
  Title,
  Desc,
} from '../../styles/seo/twitter_preview/summary_large_layout'

type TProps = {
  settings: TSEOSettings
}

const SummaryLargePreview: FC<TProps> = ({ settings }) => {
  // example: https://www.sketch.com/blog/design-portfolio-mindsets/?utm_source=stephaniewalter.design&utm_medium=weeklylinks
  // twitter:card = summary_large_image
  return (
    <Wrapper>
      <CoverWrapper />
      <Content>
        <URL>{settings.twUrl || '--'}</URL>
        <Title>{settings.twTitle || '--'}</Title>
        <Desc>{settings.twDescription || '--'}</Desc>
      </Content>
    </Wrapper>
  )
}

export default SummaryLargePreview
