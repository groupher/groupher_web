import { includes, reject, clone } from 'ramda'

import type { TThread } from '@/spec'
import { THREAD } from '@/const/thread'

import ColorSelector from '@/widgets/ColorSelector'
import { SpaceGrow, Br } from '@/widgets/Common'
import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'

import { SETTING_FIELD } from '../constant'

import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import useWidgets from '../logic/useWidgets'
import {
  Wrapper,
  Label,
  TheColor,
  ThreadsWrapper,
  Section,
  Header,
  ThreadTitle,
  Desc,
} from '../styles/widgets/base_setting'

import { edit } from '../logic'

export default () => {
  const {
    widgetsPrimaryColor,
    widgetsThreads,
    saving,
    getIsThreadTouched,
    getIsPrimaryColorTouched,
  } = useWidgets()

  const isThreadTouched = getIsThreadTouched()
  const isPrimaryColorTouched = getIsPrimaryColorTouched()

  const threadOnChange = (checked: boolean, thread: TThread): void => {
    const newThreads = checked
      ? [...widgetsThreads, thread]
      : reject((t) => t === thread, clone(widgetsThreads))

    edit(newThreads, 'widgetsThreads')
  }

  return (
    <Wrapper>
      <SectionLabel title="组件主题色" desc="默认与当前社区设置的主题色相一致。" />
      <SavingBar
        isTouched={isPrimaryColorTouched}
        field={SETTING_FIELD.WIDGETS_PRIMARY_COLOR}
        loading={saving}
      >
        <Label color={widgetsPrimaryColor}>
          <ColorSelector
            activeColor={widgetsPrimaryColor}
            onChange={(color) => edit(color, 'widgetsPrimaryColor')}
            placement="right"
            offset={[-1, 15]}
          >
            <TheColor color={widgetsPrimaryColor} />
          </ColorSelector>
        </Label>
      </SavingBar>

      <Br top={35} />
      <SectionLabel
        title="展示板块"
        desc="被勾选的板块会在组件中以 Tab 形式展示相关内容，展示样式与‘社区板块’中的设置保持一致"
      />

      <ThreadsWrapper>
        <Section>
          <Header>
            <ThreadTitle>讨论</ThreadTitle>
            <SpaceGrow />
            <ToggleSwitch
              checked={includes(THREAD.POST, widgetsThreads)}
              onChange={(checked) => threadOnChange(checked, THREAD.POST)}
            />
          </Header>
          <Desc>社区内全部帖子列表</Desc>
        </Section>
        <Section>
          <Header>
            <ThreadTitle>看板</ThreadTitle>
            <SpaceGrow />
            <ToggleSwitch
              checked={includes(THREAD.KANBAN, widgetsThreads)}
              onChange={(checked) => threadOnChange(checked, THREAD.KANBAN)}
            />
          </Header>
          <Desc>社区内看板内容，包含GTD标签</Desc>
        </Section>
        <Section>
          <Header>
            <ThreadTitle>更新日志</ThreadTitle>
            <SpaceGrow />
            <ToggleSwitch
              checked={includes(THREAD.CHANGELOG, widgetsThreads)}
              onChange={(checked) => threadOnChange(checked, THREAD.CHANGELOG)}
            />
          </Header>
          <Desc>最新版本以及历史发布版本</Desc>
        </Section>
        <Section>
          <Header>
            <ThreadTitle>帮助台</ThreadTitle>
            <SpaceGrow />
            <ToggleSwitch
              checked={includes(THREAD.DOC, widgetsThreads)}
              onChange={(checked) => threadOnChange(checked, THREAD.DOC)}
            />
          </Header>
          <Desc>常见问题与帮助中心文档</Desc>
        </Section>
      </ThreadsWrapper>

      <Br top={isThreadTouched ? 20 : 70} />

      <SavingBar
        isTouched={isThreadTouched}
        field={SETTING_FIELD.WIDGETS_THREADS}
        loading={saving}
        bottom={40}
      />
    </Wrapper>
  )
}
