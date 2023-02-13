import { FC, memo } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'

import { Wrapper, Section, Header, Title, Desc } from '../styles/threads/help_thread'

const AboutThread: FC = () => {
  return (
    <Wrapper>
      <Section>
        <Header>
          <Title>技术栈</Title>
          <SpaceGrow />
          <ToggleSwitch />
        </Header>
        <Desc>团队所使用的主要工具/服务等</Desc>
      </Section>

      <Section>
        <Header>
          <Title>所在地</Title>
          <SpaceGrow />
          <ToggleSwitch checked />
        </Header>
        <Desc>团队或团队成员国家/城市信息（手动填写，非 IP 探测）</Desc>
      </Section>

      <Section>
        <Header>
          <Title>链接</Title>
          <SpaceGrow />
          <ToggleSwitch checked />
        </Header>
        <Desc>其他模块或相关链接。</Desc>
      </Section>

      <Section>
        <Header>
          <Title>媒体报道</Title>
          <SpaceGrow />
          <ToggleSwitch checked />
        </Header>
        <Desc>其他媒体报道的链接。</Desc>
      </Section>
    </Wrapper>
  )
}

export default memo(AboutThread)
