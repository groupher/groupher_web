import { FC, memo } from 'react'
import Router from 'next/router'

import { DASHBOARD_ALIAS_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import { groupByKey } from '@/utils/helper'

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
  const { nameAlias, editingAlias, aliasTab } = settings
  const groupedAlias = groupByKey(nameAlias, 'group')

  const generalAlias = groupedAlias[ALIAS_GROUP.GENERAL]
  const kanbanAlias = groupedAlias[ALIAS_GROUP.KANBAN]

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

      {aliasTab === ALIAS_GROUP.GENERAL &&
        generalAlias.map((item) => (
          <Item key={item.raw} alias={item} editingAlias={editingAlias} />
        ))}

      {aliasTab === ALIAS_GROUP.KANBAN &&
        kanbanAlias.map((item) => <Item key={item.raw} alias={item} editingAlias={editingAlias} />)}
    </Wrapper>
  )
}

export default memo(Alias)
