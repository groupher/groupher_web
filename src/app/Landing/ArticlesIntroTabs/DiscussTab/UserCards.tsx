import type { FC } from 'react'

import { mockUsers } from '~/mock'

import {
  Wrapper,
  CardWrapper,
  Avatar,
  Say,
} from '../../styles/articles_intro_tabs/discuss_tab/user_cards'

const UserCards: FC = () => {
  const users = mockUsers(8)

  return (
    <Wrapper>
      <CardWrapper top={10} left={0}>
        <Avatar src={users[0].avatar} />
        <Say>蹲一个暗黑模式?</Say>
      </CardWrapper>

      <CardWrapper top={70} left={20}>
        <Avatar src={users[1].avatar} />
        <Say>管理员可以删除评论吗</Say>
      </CardWrapper>

      <CardWrapper top={132} left={46}>
        <Avatar src={users[2].avatar} />
        <Say>可以私有部署吗</Say>
      </CardWrapper>

      <CardWrapper top={181}>
        <Avatar src={users[3].avatar} />
        <Say>手机上标题过小</Say>
      </CardWrapper>

      <CardWrapper top={242} left={20}>
        <Avatar src={users[4].avatar} />
        <Say>更新日志支持预发布</Say>
      </CardWrapper>

      <CardWrapper top={302} left={20}>
        <Avatar src={users[5].avatar} />
        <Say>安卓版本在哪里下载？</Say>
      </CardWrapper>
    </Wrapper>
  )
}

export default UserCards
