/*
 *
 * BrandTitle
 *
 */

import { type FC, memo } from 'react'

import { SpaceGrow } from '@/widgets/Common'

import { Wrapper, Title, Desc, BrandText } from './styles'

type TProps = {
  testid?: string
  title?: string
  desc?: string
  mBottom?: number
  fontSize?: number
  onClick?: () => void
}

const BrandTitle: FC<TProps> = ({
  testid = 'brand-title',
  title = 'hello?',
  desc = 'what for?',
  mBottom = 10,
  fontSize = 18,
  onClick = console.log,
}) => {
  return (
    <Wrapper $testid={testid} mBottom={mBottom} onClick={() => onClick?.()}>
      <Title>
        <BrandText fontSize={fontSize}>{title}</BrandText>
        <SpaceGrow />
      </Title>
      <Desc>{desc}</Desc>
    </Wrapper>
  )
}

export default memo(BrandTitle)
