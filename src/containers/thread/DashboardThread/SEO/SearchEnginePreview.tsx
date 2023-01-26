import { FC } from 'react'

import type { TSEOSettings } from '../spec'
import { Wrapper, URL, Title, Desc, Hint } from '../styles/seo/search_engine_preview'

type TProps = {
  settings: TSEOSettings
}

const SearchEnginePreview: FC<TProps> = ({ settings }) => {
  return (
    <Wrapper>
      <Hint>预览</Hint>
      <URL>{settings.ogUrl || '--'}</URL>
      <Title>{settings.ogSiteName || '--'} </Title>
      <Desc>{settings.ogDescription || '--'} </Desc>
    </Wrapper>
  )
}

export default SearchEnginePreview
