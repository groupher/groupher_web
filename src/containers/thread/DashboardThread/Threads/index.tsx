import ToggleSwitch from '~/widgets/Buttons/ToggleSwitch'
import { Divider, Br } from '~/widgets/Common'

import DocThread from './DocThread'
import AboutThread from './AboutThread'

import Portal from '../Portal'
import SectionLabel from '../SectionLabel'
import { Wrapper, Desc } from '../styles/threads'
import useEnable from '../logic/useEnable'

export default () => {
  const { enable: settings, enableThread } = useEnable()

  return (
    <Wrapper>
      <Portal title="社区板块" desc="按需开启社区对外公开板块，关闭后不会导致内容删除。" />
      <Br bottom={40} />
      <SectionLabel
        title="讨论区"
        desc={<Desc>用户可在此发帖，参与社区讨论，帖子可由团队管理员同步到看板墙。</Desc>}
        addon={<ToggleSwitch checked={settings.post} onChange={(c) => enableThread('post', c)} />}
      />
      <Divider top={25} bottom={30} />
      <SectionLabel
        title="看板墙"
        desc={
          <Desc>团队设置为 ToDo, Doing, Done 等状态的帖子会出现在这里，方便向用户同步进度。</Desc>
        }
        addon={
          <ToggleSwitch checked={settings.kanban} onChange={(c) => enableThread('kanban', c)} />
        }
      />
      <Divider top={25} bottom={30} />
      <SectionLabel
        title="更新日志"
        desc={
          <Desc>
            新版本发布的新功能，Bug 修复以或性能，UI 优化等，用户同时可以查询历史版本信息。
          </Desc>
        }
        addon={
          <ToggleSwitch
            checked={settings.changelog}
            onChange={(c) => enableThread('changelog', c)}
          />
        }
      />
      <Divider top={25} bottom={30} />
      <SectionLabel
        title="帮助台"
        desc={<Desc>和社区内容相关的开发文档，指南，知识库等等信息。</Desc>}
        addon={<ToggleSwitch checked={settings.doc} onChange={(c) => enableThread('help', c)} />}
      />
      {settings.doc && <DocThread settings={settings} />}
      <Divider top={settings.doc ? 45 : 20} bottom={30} />
      <SectionLabel
        title="关于"
        desc={<Desc>社区基本信息。若更新请到基本信息设置区。</Desc>}
        addon={<ToggleSwitch checked={settings.about} onChange={(c) => enableThread('about', c)} />}
      />
      {settings.about && <AboutThread settings={settings} />}
    </Wrapper>
  )
}
