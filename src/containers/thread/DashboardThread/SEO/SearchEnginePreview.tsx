import type { FC } from 'react'

import useSEOInfo from '../hooks/useSEOInfo'
import { Wrapper, URL, Title, Desc, Hint } from '../styles/seo/search_engine_preview'

const SearchEnginePreview: FC = () => {
  const { ogSiteName, ogDescription, ogUrl } = useSEOInfo()

  return (
    <Wrapper>
      <Hint>预览</Hint>
      <URL>{ogUrl || '--'}</URL>
      <Title>{ogSiteName || '--'} </Title>
      <Desc>{ogDescription || '--'} </Desc>
    </Wrapper>
  )
}

export default SearchEnginePreview
