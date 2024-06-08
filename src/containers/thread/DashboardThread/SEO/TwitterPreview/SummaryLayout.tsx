import type { FC } from 'react'

import useSEOInfo from '../../hooks/useSEOInfo'
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

// example: https://elixirweekly.net/issues/339
// twitter:card = summary

const SummaryPreview: FC = () => {
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

export default SummaryPreview
