import { type FC, memo } from 'react'

import type { TEnableConfig } from '~/spec'

import ToggleSwitch from '~/widgets/Buttons/ToggleSwitch'

import useEnable from '../logic/useEnable'
import { Wrapper, Section, Header, Title, Desc } from '../styles/threads/doc_thread'

type TProps = {
  settings: TEnableConfig
}

const AboutThread: FC<TProps> = ({ settings }) => {
  const { enableThread } = useEnable()

  return (
    <Wrapper>
      <Section>
        <Header>
          <Title>技术栈</Title>
          <div className="grow" />
          <ToggleSwitch
            checked={settings.aboutTechstack}
            onChange={(c) => enableThread('aboutTechstack', c)}
          />
        </Header>
        <Desc>团队所使用的主要工具/服务等</Desc>
      </Section>

      <Section>
        <Header>
          <Title>所在地</Title>
          <div className="grow" />
          <ToggleSwitch
            checked={settings.aboutLocation}
            onChange={(c) => enableThread('aboutLocation', c)}
          />
        </Header>
        <Desc>团队或团队成员国家/城市信息（手动填写，非 IP 探测）</Desc>
      </Section>

      <Section>
        <Header>
          <Title>链接</Title>
          <div className="grow" />
          <ToggleSwitch
            checked={settings.aboutLinks}
            onChange={(c) => enableThread('aboutLinks', c)}
          />
        </Header>
        <Desc>其他模块或相关链接。</Desc>
      </Section>

      <Section>
        <Header>
          <Title>媒体报道</Title>
          <div className="grow" />
          <ToggleSwitch
            checked={settings.aboutMediaReport}
            onChange={(c) => enableThread('aboutMediaReport', c)}
          />
        </Header>
        <Desc>其他媒体报道的文章/播客/视频等链接。</Desc>
      </Section>
    </Wrapper>
  )
}

export default memo(AboutThread)
