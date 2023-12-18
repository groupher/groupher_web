/*
 *
 * CoverImage
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import { Wrapper, ImageWrapper, Image } from './styles'

const _log = buildLog('w:CoverImage:index')

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
