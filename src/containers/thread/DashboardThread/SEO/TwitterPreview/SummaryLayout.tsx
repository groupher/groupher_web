import { FC } from 'react'

import type { TSEOSettings } from '../../spec'
import {
  Wrapper,
  Hint,
  CoverWrapper,
  ImageIcon,
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
      <Hint>预览</Hint>
      <CoverWrapper>
        <ImageIcon />
      </CoverWrapper>
      <Content>
        <URL>{settings.twUrl || '--'}</URL>
        <Title>{settings.twTitle || '--'}</Title>
        <Desc>{settings.twDescription || '--'}</Desc>
      </Content>
    </Wrapper>
  )
}

export default SummaryPreview
