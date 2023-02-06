import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import {
  Wrapper,
  Header,
  KanbenIcon,
  Bar,
  Item,
  Title,
  Icon1,
  Icon2,
  Icon3,
} from '../../styles/feature_wall/kanban_feat/banner'

const Banner: FC = () => {
  return (
    <Wrapper>
      <Header>
        <KanbenIcon />
        <Bar top={0} height={8} width={40} left={6} />
        <Bar top={0} height={6} width={15} left={6} opacity={0.4} />
        <SpaceGrow />
        <Bar top={0} height={8} width={40} opacity={0.5} />
      </Header>
      <Item left={34}>
        <Icon1 />
        <Title>已排期</Title>
      </Item>

      <Item left={220}>
        <Icon2 />
        <Title>进行中</Title>
      </Item>

      <Item left={410}>
        <Icon3 />
        <Title>已完成</Title>
      </Item>
    </Wrapper>
  )
}

export default Banner
