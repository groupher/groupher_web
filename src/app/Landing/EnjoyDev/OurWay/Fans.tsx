import type { FC } from 'react'

import Facepile from '~/widgets/Facepile/LandingPage'
import { mockUsers } from '~/mock'

import {
  Wrapper,
  SingleWrapper,
  SingleUser,
  CommentUsers,
  CommentAnimate,
  Emoji,
  DiscussIcon,
} from '../../styles/enjoy_dev/fans'

const Fans: FC = () => {
  const users = mockUsers(10)

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

      <CommentAnimate left={480} top={80}>
        <CommentUsers $rotate={3} $width={90}>
          <Emoji src="icons/emotion/confused.png" />
          <Facepile users={users.slice(8, 10)} left={8} />
        </CommentUsers>
      </CommentAnimate>

      <CommentAnimate left={200} top={180}>
        <CommentUsers $rotate={1} $width={88}>
          <DiscussIcon />
          <Facepile users={users.slice(7, 9)} left={6} />
        </CommentUsers>
      </CommentAnimate>

      <CommentAnimate left={40} bottom={100}>
        <CommentUsers $rotate={-5} $width={116}>
          <Emoji src="icons/emotion/biceps.png" />
          <Facepile users={users.slice(0, 3)} left={6} />
        </CommentUsers>
      </CommentAnimate>

      <CommentAnimate left={420} bottom={80}>
        <CommentUsers $rotate={3} $width={116}>
          <Emoji src="icons/emotion/heart.png" />
          <Facepile users={users.slice(2, 5)} left={6} />
        </CommentUsers>
      </CommentAnimate>

      <CommentAnimate right={140} top={110}>
        <CommentUsers $rotate={-3} $width={136}>
          <Emoji src="icons/emotion/beer.png" />
          <Facepile users={users.slice(3, 7)} left={6} />
        </CommentUsers>
      </CommentAnimate>
    </Wrapper>
  )
}

export default Fans
