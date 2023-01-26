import { FC } from 'react'

import { Wrapper, URL, Title, Desc, Hint } from '../styles/basic_info/seo_preview'

const SEOPreview: FC = () => {
  return (
    <Wrapper>
      <Hint>预览</Hint>
      <URL>https://your-product.groupher.com</URL>
      <Title>Your Product</Title>
      <Desc>产品描述</Desc>
    </Wrapper>
  )
}

export default SEOPreview
