import { FC } from 'react'

import Facepile from '@/widgets/Facepile'
import { mockUsers } from '@/mock'

import {
  Wrapper,
  SingleWrapper,
  SingleUser,
  CommentUsers,
  Emoji,
  DiscussIcon,
} from '../../styles/enjoy_dev/fans'

const Fans: FC = () => {
  const users = mockUsers(8)

  return (
    <Wrapper>
      <SingleWrapper $color="PURPLE" left={40} top={50} $width={36}>
        <SingleUser src={users[4].avatar} $width={30} />
      </SingleWrapper>

      <SingleWrapper $color="GREEN" left={350} top={120} $width={34}>
        <SingleUser src={users[6].avatar} $width={28} />
      </SingleWrapper>

      <SingleWrapper $color="ORANGE" right={200} bottom={120} $width={34}>
        <SingleUser src={users[6].avatar} $width={28} />
      </SingleWrapper>

      <SingleWrapper $color="BLUE" right={172} bottom={92} $width={28} $opacity={0.6}>
        <SingleUser src={users[0].avatar} $width={22} />
      </SingleWrapper>

      <CommentUsers left={200} top={180} $rotate={1} $width={88}>
        <DiscussIcon />
        <Facepile users={users.slice(0, 2)} showMore={false} size="medium" left={6} />
      </CommentUsers>

      <CommentUsers left={40} bottom={100} $rotate={-5}>
        <Emoji src="icons/emotion/biceps.png" />
        <Facepile users={users.slice(0, 3)} showMore={false} size="medium" left={6} />
      </CommentUsers>

      <CommentUsers left={420} bottom={80} $rotate={3}>
        <Emoji src="icons/emotion/heart.png" />
        <Facepile users={users.slice(0, 3)} showMore={false} size="medium" left={6} />
      </CommentUsers>

      <CommentUsers right={120} top={100} $rotate={-3} $width={128}>
        <Emoji src="icons/emotion/beer.png" />
        <Facepile users={users} showMore={false} size="medium" left={6} />
      </CommentUsers>
    </Wrapper>
  )
}

export default Fans
