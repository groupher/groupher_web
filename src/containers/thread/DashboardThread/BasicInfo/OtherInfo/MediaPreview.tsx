import { FC } from 'react'

import type { TMediaReport } from '../../spec'

import {
  Wrapper,
  Brand,
  Favicon,
  SiteName,
  Title,
  ArrowBox,
  ArrowIcon,
} from '../../styles/basic_info/other_info/media_preview'

type TProps = {
  item: TMediaReport
}

const MediaPreview: FC<TProps> = ({ item }) => {
  const { url, favicon, siteName, title } = item

  return (
    <Wrapper>
      <Brand>
        <Favicon src={favicon} />
        <SiteName>{siteName}</SiteName>
      </Brand>

      <Title href={url} target="_blank">
        {title}
      </Title>
      <ArrowBox>
        <ArrowIcon />
      </ArrowBox>
    </Wrapper>
  )
}

export default MediaPreview
