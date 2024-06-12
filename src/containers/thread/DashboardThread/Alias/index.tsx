import type { FC } from 'react'
import { useRouter } from 'next/navigation'

import { DASHBOARD_ALIAS_ROUTE } from '@/const/route'
import VIEW from '@/const/view'

import { groupByKey } from '@/helper'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import Tabs from '@/widgets/Switcher/Tabs'

import { ALIAS_TABS, ALIAS_GROUP } from '../constant'

import Portal from '../Portal'
import Item from './Item'

import useAlias from '../logic/useAlias'
import { Wrapper, Banner, TabsWrapper } from '../styles/alias'

const Alias: FC = () => {
  const router = useRouter()
  const curCommunity = useViewingCommunity()
  const { nameAlias, aliasTab, changeTab } = useAlias()

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
              changeTab(tab)
              const targetPath =
                tab === DASHBOARD_ALIAS_ROUTE.THREAD
                  ? `/${curCommunity.slug}/dashboard/alias`
                  : `/${curCommunity.slug}/dashboard/alias/${tab}`

              router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>
      {aliasTab === ALIAS_GROUP.THREAD &&
        generalAlias.map((item) => <Item key={item.slug} alias={item} />)}
      {aliasTab === ALIAS_GROUP.KANBAN &&
        kanbanAlias.map((item) => <Item key={item.slug} alias={item} />)}
      {aliasTab === ALIAS_GROUP.OTHERS &&
        othersAlias.map((item) => <Item key={item.slug} alias={item} />)}
    </Wrapper>
  )
}

export default Alias
