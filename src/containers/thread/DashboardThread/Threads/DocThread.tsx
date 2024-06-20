import { type FC, memo } from 'react'

import type { TEnableConfig } from '@/spec'

import { SpaceGrow } from '@/widgets/Common'
import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'

import useEnable from '../logic/useEnable'
import { Wrapper, Section, Header, Title, Desc } from '../styles/threads/doc_thread'

type TProps = {
  settings: TEnableConfig
}

const DocThread: FC<TProps> = ({ settings }) => {
  const { enableThread } = useEnable()

  return (
    <Wrapper>
      <Section>
        <Header>
          <Title>最后更新时间</Title>
          <SpaceGrow />
          <ToggleSwitch
            checked={settings.docLastUpdate}
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
            checked={settings.docReaction}
            onChange={(c) => enableThread('docReaction', c)}
          />
        </Header>
        <Desc>是否在文档底部显示 “本文是否有帮助?” 的反馈组件（含 Emoji）</Desc>
      </Section>
    </Wrapper>
  )
}

export default memo(DocThread)
