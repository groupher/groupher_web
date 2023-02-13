import { FC, memo } from 'react'
import Router from 'next/router'

import { DASHBOARD_ALIAS_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import Tabs from '@/widgets/Switcher/Tabs'

import type { TAliasSettings } from '../spec'
import { ALIAS_TABS } from '../constant'

import Portal from '../Portal'
import Item from './Item'

import { Wrapper, Banner, TabsWrapper } from '../styles/alias'
import { edit } from '../logic'

type TProps = {
  settings: TAliasSettings
}

const Alias: FC<TProps> = ({ settings }) => {
  const { alias, editingAlias, aliasTab } = settings

  return (
    <Wrapper>
      <Portal
        title="别名设置"
        desc="覆盖系统默认的板块，组件，提示信息等名称。"
        withDivider={false}
      />

      <Banner>
        <TabsWrapper>
          <Tabs
            items={ALIAS_TABS}
            activeKey={aliasTab}
            bottomSpace={4}
            onChange={(tab) => {
              edit(tab, 'aliasTab')
              const targetPath =
                tab === DASHBOARD_ALIAS_ROUTE.GENERAL
                  ? '/home/dashboard/alias'
                  : `/home/dashboard/alias/${tab}`

              Router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>

      {alias.map((item) => (
        <Item key={item.raw} alias={item} editingAlias={editingAlias} />
      ))}
    </Wrapper>
  )
}

export default memo(Alias)
