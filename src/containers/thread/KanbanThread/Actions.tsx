import { FC, memo } from 'react'

import { mockUsers } from '@/mock'

import Facepile from '@/widgets/Facepile'

import { Wrapper, Title, Count, LeftPart, RightPart, KanbanIcon, JoinTitle } from './styles/actions'

type TProps = {
  testid?: string
}

const Actions: FC<TProps> = ({ testid = 'actions' }) => {
  return (
    <Wrapper>
      <LeftPart>
        <KanbanIcon />
        <Title>
          看板墙
          <Count>23</Count>
        </Title>
      </LeftPart>
      <RightPart>
        <JoinTitle>参与者</JoinTitle>
        <Facepile size="medium" users={mockUsers(6)} total={20} showTotalNumber />
        {/* <Space right={25} /> */}
        {/* <NewButton size="medium">
          <BtnText>新增</BtnText>
        </NewButton> */}
      </RightPart>
    </Wrapper>
  )
}

export default memo(Actions)
