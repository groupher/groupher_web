import { FC } from 'react'

import type { TMediaReport } from '@/spec'
import { sortByIndex } from '@/helper'

import {
  Wrapper,
  PreviewWrapper,
  Brand,
  Favicon,
  SiteName,
  Title,
  ArrowBox,
  ArrowIcon,
} from './styles/media_reports'

type TProps = {
  items: TMediaReport[]
}

const MediaReports: FC<TProps> = ({ items }) => {
  return (
    <Wrapper>
      {/* @ts-ignore */}
      {sortByIndex(items).map((item: TMediaReport) => {
        const { index, favicon, title, url, siteName } = item
        if (!title) return null

        return (
          <PreviewWrapper key={index}>
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
          </PreviewWrapper>
        )
      })}
    </Wrapper>
  )
}

export default MediaReports
