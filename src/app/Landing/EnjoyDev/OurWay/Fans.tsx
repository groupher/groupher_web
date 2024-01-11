import { FC } from 'react'

import { useParallax } from 'react-scroll-parallax'

import Facepile from '@/widgets/Facepile/LandingPage'
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

  const { ref } = useParallax<HTMLDivElement>({ speed: 5 })

  return (
    <Wrapper ref={ref}>
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
        <Facepile users={users.slice(0, 2)} left={6} />
      </CommentUsers>

      <CommentUsers left={40} bottom={100} $rotate={-5} $width={116}>
        <Emoji src="icons/emotion/biceps.png" />
        <Facepile users={users.slice(0, 3)} left={6} />
      </CommentUsers>

      <CommentUsers left={420} bottom={80} $rotate={3} $width={116}>
        <Emoji src="icons/emotion/heart.png" />
        <Facepile users={users.slice(2, 5)} left={6} />
      </CommentUsers>

      <CommentUsers right={140} top={110} $rotate={-3} $width={136}>
        <Emoji src="icons/emotion/beer.png" />
        <Facepile users={users.slice(3, 7)} left={6} />
      </CommentUsers>
    </Wrapper>
  )
}

export default Fans
