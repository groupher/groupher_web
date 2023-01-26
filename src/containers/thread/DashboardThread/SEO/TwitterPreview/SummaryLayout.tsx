import { FC } from 'react'

import type { TSEOSettings } from '../../spec'
import {
  Wrapper,
  CoverWrapper,
  Content,
  URL,
  Title,
  Desc,
} from '../../styles/seo/twitter_preview/summary_layout'

type TProps = {
  settings: TSEOSettings
}

const SummaryPreview: FC<TProps> = ({ settings }) => {
  // example: https://elixirweekly.net/issues/339
  // twitter:card = summary

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

export default SummaryPreview
