/*
 *
 * CoverImage
 *
 */

import { type FC, memo } from 'react'

import { Wrapper, ImageWrapper, Image } from './styles'

type TProps = {
  testid?: string
}

const CoverImage: FC<TProps> = ({ testid = 'cover-image' }) => {
  return (
    <Wrapper $testid={testid}>
      <ImageWrapper>
        <Image src="/help-cover-demo.png" noLazy />
      </ImageWrapper>
    </Wrapper>
  )
}

export default memo(CoverImage)
