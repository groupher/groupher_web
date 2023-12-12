import { FC } from 'react'

import type { TColorName } from '@/spec'

import {
  Wrapper,
  Title,
  Layouts,
  Card,
  Block,
  UpvoteBox,
  UpvoteIcon,
  UpvoteCount,
} from '../../styles/dashboard_intros/layout_tab/post_layouts'

type TProps = {
  primaryColor: TColorName
}

const PostLayouts: FC<TProps> = ({ primaryColor }) => {
  return (
    <Wrapper>
      <Layouts>
        <Card>
          <Block $width={74} left={10} top={16} $opacity={0.5} $color={primaryColor} />
          <Block $width={18} bottom={28} right={18} $opacity={0.2} $color={primaryColor} />

          <Block $width={20} left={10} top={30} $opacity={0.2} $color={primaryColor} />
          <Block $width={18} left={38} top={30} $opacity={0.2} $color={primaryColor} />
        </Card>
        <Card>
          <UpvoteBox>
            <UpvoteIcon $color={primaryColor} />
            <UpvoteCount $color={primaryColor}>12</UpvoteCount>
          </UpvoteBox>
          <Block $width={58} left={50} top={16} $opacity={0.5} $color={primaryColor} />
          <Block $width={40} left={50} top={30} $opacity={0.2} $color={primaryColor} />
        </Card>
        <Card>
          <Block $width={45} $height={45} left={8} top={8} $opacity={0.1} $color={primaryColor} />
          <Block $width={50} $height={30} left={60} top={-8} $opacity={0.1} $color={primaryColor} />
          <Block $width={50} $height={45} left={60} top={30} $opacity={0.2} $color={primaryColor} />
          <Block
            $width={35}
            $height={30}
            bottom={10}
            right={6}
            $opacity={0.1}
            $color={primaryColor}
          />
        </Card>
        <Card>
          <Block $width={55} $height={37} left={8} top={8} $opacity={0.12} $color={primaryColor} />
          <Block $width={52} left={74} top={16} $opacity={0.5} $color={primaryColor} />
          <Block $width={40} left={74} top={30} $opacity={0.2} $color={primaryColor} />
        </Card>
      </Layouts>
      <Title>帖子布局</Title>
    </Wrapper>
  )
}

export default PostLayouts
