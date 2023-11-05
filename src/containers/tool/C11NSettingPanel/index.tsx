/*
 *
 * C11NSettingPanel
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { ICON_CMD } from '@/config'
import VIEW from '@/constant/view'
import { buildLog } from '@/logger'

import Tabs from '@/widgets/Switcher/Tabs'
import { useStore } from './store'

import GeneralSettings from './GeneralSettings'
import ThemeSettings from './ThemeSettings'

import { Wrapper, Title, TabBarWrapper, ContentWrapper } from './styles'
import { useInit, tabOnChange } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:C11NSettingPanel')

const TAB_OPTIONS = [
  {
    title: '常规设置',
    slug: 'general',
    localIcon: 'settings',
  },
  {
    title: '主题设置',
    slug: 'theme',
    icon: `${ICON_CMD}/theme_cloth.svg`,
  },
]

const Content = ({ activeTab, curTheme, curThread, customization }) => {
  switch (activeTab) {
    case 'general': {
      return <GeneralSettings curThread={curThread} customization={customization} />
    }
    case 'theme': {
      return <ThemeSettings curTheme={curTheme} />
    }
    default: {
      return <div>WoW</div>
    }
  }
}

const C11NSettingPanel: FC = () => {
  const store = useStore()
  useInit(store)

  const { activeTab, accountInfo, curThread, curTheme } = store
  const { customization } = accountInfo

  return (
    <Wrapper testid="c11NSettingPanel">
      <br />
      <Title>个性化设置</Title>
      <TabBarWrapper>
        <Tabs items={TAB_OPTIONS} activeKey={activeTab} onChange={tabOnChange} view={VIEW.DRAWER} />
      </TabBarWrapper>
      <ContentWrapper>
        <Content
          activeTab={activeTab}
          curThread={curThread}
          customization={customization}
          curTheme={curTheme}
        />
      </ContentWrapper>
    </Wrapper>
  )
}

export default observer(C11NSettingPanel)
