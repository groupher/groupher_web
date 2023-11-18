/*
 *
 * CoverImage
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import { Wrapper, ImageWrapper, Image } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:CoverImage:index')

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
