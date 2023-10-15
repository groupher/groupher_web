import { FC } from 'react'

import { assetSrc } from '@/helper'

import type { TUploadPreview } from '@/spec'
import { Wrapper, PreviewImg } from './styles/preview_block'

type TProps = {
  url: string
} & TUploadPreview

const PreviewBlock: FC<TProps> = ({ url, height, width, radius }) => {
  return (
    <Wrapper>
      <PreviewImg src={assetSrc(url)} height={height} width={width} radius={radius} />
    </Wrapper>
  )
}

export default PreviewBlock
