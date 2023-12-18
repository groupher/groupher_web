import { FC, memo } from 'react'

import { mockUsers } from '@/mock'

import Facepile from '@/widgets/Facepile'
import { Br } from '@/widgets/Common'

import {
  Wrapper,
  Title,
  Count,
  TopPart,
  BottomPart,
  KanbanIcon,
  JoinTitle,
} from '../styles/waterfall_layout/sidebar'

const Sidebar: FC = () => {
  return (
    <Wrapper>
      <TopPart>
        <KanbanIcon />
        <Title>
          看板墙
          <Count>23</Count>
        </Title>
      </TopPart>
      <Br top={30} />
      <BottomPart>
        <JoinTitle>参与者</JoinTitle>
        <Facepile size="medium" users={mockUsers(6)} total={20} />
        {/* <Space right={25} /> */}
        {/* <NewButton size="medium">
          <BtnText>新增</BtnText>
        </NewButton> */}
      </BottomPart>
    </Wrapper>
  )
}

export default memo(Sidebar)
