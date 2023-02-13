import { FC, memo } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'

import type { TEnableSettings } from '../spec'
import { Wrapper, Section, Header, Title, Desc } from '../styles/threads/help_thread'
import { enableThread } from '../logic'

type TProps = {
  settings: TEnableSettings
}

const HelpThread: FC<TProps> = ({ settings }) => {
  return (
    <Wrapper>
      <Section>
        <Header>
          <Title>最后更新时间</Title>
          <SpaceGrow />
          <ToggleSwitch
            checked={settings.helpLastUpdate}
            onChange={(c) => enableThread('helpLastUpdate', c)}
          />
        </Header>
        <Desc>是否在文档底部显示当前文档的最后更新时间</Desc>
      </Section>

      <Section>
        <Header>
          <Title>反馈调查</Title>
          <SpaceGrow />
          <ToggleSwitch
            checked={settings.helpReaction}
            onChange={(c) => enableThread('helpReaction', c)}
          />
        </Header>
        <Desc>是否在文档底部显示 “本文是否有帮助?” 的反馈组件（含 Emoji）</Desc>
      </Section>
    </Wrapper>
  )
}

export default memo(HelpThread)
