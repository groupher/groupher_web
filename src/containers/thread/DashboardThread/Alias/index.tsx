import { FC } from 'react'
import { observer } from 'mobx-react'
import Router from 'next/router'

import { DASHBOARD_ALIAS_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import { groupByKey } from '@/helper'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import Tabs from '@/widgets/Switcher/Tabs'

import type { TAliasSettings } from '../spec'
import { ALIAS_TABS, ALIAS_GROUP } from '../constant'

import Portal from '../Portal'
import Item from './Item'

import { Wrapper, Banner, TabsWrapper } from '../styles/alias'
import { edit } from '../logic'

type TProps = {
  settings: TAliasSettings
}

const Alias: FC<TProps> = ({ settings }) => {
  const curCommunity = useViewingCommunity()

  const { nameAlias, editingAlias, aliasTab } = settings
  const groupedAlias = groupByKey(nameAlias, 'group')

  const generalAlias = groupedAlias[ALIAS_GROUP.THREAD] || []
  const kanbanAlias = groupedAlias[ALIAS_GROUP.KANBAN] || []
  const othersAlias = groupedAlias[ALIAS_GROUP.OTHERS] || []

  return (
    <Wrapper>
      <Portal
        title="别名设置"
        desc="覆盖社区内默认的板块，组件，提示信息等名称，注意对应的路由不会改变。"
        withDivider={false}
      />
      <Banner>
        <TabsWrapper>
          <Tabs
            items={ALIAS_TABS}
            activeKey={aliasTab}
            onChange={(tab) => {
              edit(tab, 'aliasTab')
              const targetPath =
                tab === DASHBOARD_ALIAS_ROUTE.THREAD
                  ? `/${curCommunity.slug}/dashboard/alias`
                  : `/${curCommunity.slug}/dashboard/alias/${tab}`

              Router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>
      {aliasTab === ALIAS_GROUP.THREAD &&
        generalAlias.map((item) => (
          <Item key={item.slug} alias={item} editingAlias={editingAlias} />
        ))}
      {aliasTab === ALIAS_GROUP.KANBAN &&
        kanbanAlias.map((item) => (
          <Item key={item.slug} alias={item} editingAlias={editingAlias} />
        ))}
      {aliasTab === ALIAS_GROUP.OTHERS &&
        othersAlias.map((item) => (
          <Item key={item.slug} alias={item} editingAlias={editingAlias} />
        ))}
    </Wrapper>
  )
}

export default observer(Alias)
