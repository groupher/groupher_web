import { FC } from 'react'

import useKanbanBgColors from '@/hooks/useKanbanBgColors'

import Footer from './Footer'
import { Icon } from '../styles/icon'
import { Wrapper, Item, Title, CheckIcon } from '../styles/sub_menu/state_setting'

type TProps = {
  onBack: () => void
}

const StateSetting: FC<TProps> = ({ onBack }) => {
  const [todoColor, wipColor, doneColor] = useKanbanBgColors()

  return (
    <Wrapper>
      <Item $active $color={todoColor}>
        <Icon.Todo />
        <Title $active>待办</Title>
        <CheckIcon $color={todoColor} />
      </Item>

      <Item $color={wipColor}>
        <Icon.Wip />
        <Title>进行中</Title>
      </Item>

      <Item $color={doneColor}>
        <Icon.Done />
        <Title>已完成</Title>
      </Item>

      <Footer
        onBack={onBack}
        onConfirm={() => console.log('## title confirm')}
        top={20}
        bottom={5}
      />
    </Wrapper>
  )
}

export default StateSetting
