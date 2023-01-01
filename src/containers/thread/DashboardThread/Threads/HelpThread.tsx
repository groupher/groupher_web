import { FC, memo } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'

import { Wrapper, Section, Header, Title, Desc } from '../styles/threads/help_thread'

const HelpThread: FC = () => {
  return (
    <Wrapper>
      <Section>
        <Header>
          <Title>最后更新时间</Title>
          <SpaceGrow />
          <ToggleSwitch />
        </Header>
        <Desc>是否在文档底部显示当前文档的最后更新时间</Desc>
      </Section>

      <Section>
        <Header>
          <Title>反馈调查</Title>
          <SpaceGrow />
          <ToggleSwitch checked />
        </Header>
        <Desc>是否在文档底部显示 “本文是否有帮助?” 的反馈组件</Desc>
      </Section>
    </Wrapper>
  )
}

export default memo(HelpThread)
