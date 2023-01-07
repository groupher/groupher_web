import { FC } from 'react'

import { COLOR_NAME } from '@/constant'
import { mockUsers } from '@/utils/mock'

import MasonryCards from '@/widgets/MasonryCards'

import Card from './Card'
import { Wrapper, Slogan, Title, Desc, Wall, Hightlight } from '../styles/users_wall'

const P1 = (
  <div>
    I love Chatwoot for creating an <Hightlight>open-source</Hightlight> customer engagement tool
    Open source is really helping businesses thrive for free. Respect.
  </div>
)

const P2 = (
  <div>
    I love Chatwoot for creating an open-source customer engagement tool Open source is really
    helping businesses thrive for free. Respect. I love{' '}
    <Hightlight>Chatwoot for creating</Hightlight> an open-source customer engagement tool Open
    source is really helping businesses thrive for free. Respect.
  </div>
)

const P3 = (
  <div>
    I love Chatwoot for creating an open-source customer engagement tool Open source is really
    helping businesses thrive <Hightlight>for free</Hightlight>. Respect. I love Chatwoot for
    creating an open-source customer engagement tool Open source is really{' '}
    <Hightlight>helping businesses</Hightlight> thrive for free. Respect. I love Chatwoot for
    creating an open-source customer engagement tool Open source is really helping businesses thrive
    for free. Respect.
  </div>
)

const UsersWall: FC = () => {
  const users = mockUsers(10)

  return (
    <Wrapper>
      <Slogan>
        <Title>被众多优秀开发者及团队青睐</Title>
        <Desc>从独立开发者到中小型创业团队，我们用产品力回报信任</Desc>
      </Slogan>
      <Wall>
        <MasonryCards column={3}>
          <Card content={P1} user={users[0]} color={COLOR_NAME.BLUE} />
          <Card content={P2} user={users[1]} color={COLOR_NAME.ORANGE} />
          <Card content={P1} user={users[2]} color={COLOR_NAME.RED} />
          <Card content={P1} user={users[3]} color={COLOR_NAME.GREEN} />
          <Card content={P3} user={users[4]} color={COLOR_NAME.CYAN} />
          <Card content={P1} user={users[5]} color={COLOR_NAME.PURPLE} />
          <Card content={P2} user={users[6]} color={COLOR_NAME.YELLOW} />
          <Card content={P1} user={users[7]} color={COLOR_NAME.GREEN_LIGHT} />
          <Card content={P1} user={users[8]} color={COLOR_NAME.PINK} />
        </MasonryCards>
      </Wall>
    </Wrapper>
  )
}

export default UsersWall
