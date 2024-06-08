import type { FC } from 'react'

import { COLOR_NAME } from '@/const/colors'
import { mockUsers } from '@/mock'
import { Brick } from '@/widgets/Common'

import {
  Wrapper,
  Avatar,
  Action,
  CommonIcon,
  UpvoteIcon,
} from '../../styles/feature_wall/integration/sidebar'

type TProps = {
  hovering: boolean
}

const Sidebar: FC<TProps> = ({ hovering }) => {
  const users = mockUsers(3)

  return (
    <Wrapper right={hovering ? 5 : -90} top={4}>
      {hovering && (
        <Action top={60} left={5}>
          <UpvoteIcon />
        </Action>
      )}

      {hovering && (
        <Action top={98} left={-20}>
          <CommonIcon />
        </Action>
      )}

      <Avatar
        src={users[0].avatar}
        size={20}
        $color={COLOR_NAME.ORANGE}
        top={30}
        left={-20}
        hovering={hovering}
      />
      <Avatar
        src={users[1].avatar}
        size={20}
        $color={COLOR_NAME.BLUE}
        top={60}
        left={-30}
        hovering={hovering}
      />
      <Avatar
        src={users[2].avatar}
        size={20}
        $color={COLOR_NAME.GREEN}
        top={80}
        left={10}
        hovering={hovering}
      />

      <Brick $width={50} $height={6} $opacity={0.2} left={10} top={12} />
      <Brick $width={30} $height={4} $opacity={0.1} left={10} top={23} />

      <Brick $width={50} $height={6} $opacity={0.2} left={10} top={34} />
      <Brick $width={30} $height={4} $opacity={0.1} left={10} top={46} />

      <Brick $width={30} $height={28} $opacity={0.1} left={10} top={60} />
      <Brick $width={30} $height={28} $opacity={0.07} left={45} top={60} />

      <Brick $width={50} $height={6} $opacity={0.2} left={10} top={98} />
      <Brick $width={30} $height={4} $opacity={0.1} left={10} top={110} />

      <Brick $width={38} $height={6} $opacity={0.2} left={10} top={120} />
      <Brick $width={48} $height={4} $opacity={0.1} left={10} top={132} />
    </Wrapper>
  )
}

export default Sidebar
