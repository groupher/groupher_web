import type { FC } from 'react'

import { mockUsers } from '@/mock'

import { SpaceGrow } from '@/widgets/Common'
import Facepile from '@/widgets/Facepile/LandingPage'

import {
  Wrapper,
  UpvoteWrapper,
  UpvoteIcon,
  UpvoteCount,
  UsersWrapper,
  PublishDate,
} from '../../../../styles/articles_intro_tabs/changelog_tab/changelog_demo/main_list/footer'

type TProps = {
  upvotesCount?: number
  date?: string
}

const Footer: FC<TProps> = ({ upvotesCount = 24, date = '2013-12-01' }) => {
  const users = mockUsers(3)

  return (
    <Wrapper>
      <UpvoteWrapper>
        <UpvoteIcon />
        <UpvoteCount>{upvotesCount}</UpvoteCount>
      </UpvoteWrapper>
      <UsersWrapper>
        <Facepile users={users} />
      </UsersWrapper>
      <SpaceGrow />

      <PublishDate>{date}</PublishDate>
    </Wrapper>
  )
}

export default Footer
