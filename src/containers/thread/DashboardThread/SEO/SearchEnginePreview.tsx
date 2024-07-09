import useSEO from '../logic/useSEO'
import { Wrapper, URL, Title, Desc, Hint } from '../styles/seo/search_engine_preview'

export default () => {
  const { ogSiteName, ogDescription, ogUrl } = useSEO()

  return (
    <Wrapper>
      <Hint>预览</Hint>
      <URL>{ogUrl || '--'}</URL>
      <Title>{ogSiteName || '--'} </Title>
      <Desc>{ogDescription || '--'} </Desc>
    </Wrapper>
  )
}
