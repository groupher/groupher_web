import { FC, memo } from 'react'
import Router from 'next/router'

import { DASHBOARD_ALIAS_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import { groupByKey } from '@/utils/helper'
import useCurCommunity from '@/hooks/useCurCommunity'

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
  const curCommunity = useCurCommunity()

  // console.log('## ALIAS_GROUP: ', ALIAS_GROUP)

  const { nameAlias, editingAlias, aliasTab } = settings
  const groupedAlias = groupByKey(nameAlias, 'group')

  const generalAlias = groupedAlias[ALIAS_GROUP.GENERAL] || []
  const kanbanAlias = groupedAlias[ALIAS_GROUP.KANBAN] || []

  console.log('## groupedAlias: ', groupedAlias)
  console.log('## generalAlias: ', generalAlias)

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
            onChange={(tab) => {
              edit(tab, 'aliasTab')
              const targetPath =
                tab === DASHBOARD_ALIAS_ROUTE.GENERAL
                  ? `/${curCommunity.slug}/dashboard/alias`
                  : `/${curCommunity.slug}/dashboard/alias/${tab}`

              Router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>

      {aliasTab === ALIAS_GROUP.GENERAL &&
        generalAlias.map((item) => (
          <Item key={item.slug} alias={item} editingAlias={editingAlias} />
        ))}

      {aliasTab === ALIAS_GROUP.KANBAN &&
        kanbanAlias.map((item) => (
          <Item key={item.slug} alias={item} editingAlias={editingAlias} />
        ))}
    </Wrapper>
  )
}

export default memo(Alias)
