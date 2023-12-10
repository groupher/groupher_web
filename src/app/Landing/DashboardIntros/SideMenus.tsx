import { FC } from 'react'

import type { TDashboardPath } from '@/spec'

import { TABS_ITEMS } from './constant'

import {
  Wrapper,
  InnerWrapper,
  Header,
  Title,
  Desc,
  Tabs,
  TabItem,
  ItemTitle,
  ItemDesc,
} from '../styles/dashboard_intros/side_menu'

type TProps = {
  tab: TDashboardPath
  onChange: (tab: TDashboardPath) => void
}

const SideMenus: FC<TProps> = ({ tab, onChange }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Header>
          <Title>完善的后台管理</Title>
          <Desc>强大的自定义设置，所见即所得，满足你的品牌个性化及内容管理需要。</Desc>
        </Header>

        <Tabs>
          {TABS_ITEMS.map((item) => {
            const $active = tab === item.key
            return (
              <TabItem key={item.key} $active={$active} onClick={() => onChange(item.key)}>
                <ItemTitle $active={$active}>{item.title}</ItemTitle>
                {$active && <ItemDesc>{item.desc}</ItemDesc>}
              </TabItem>
            )
          })}
        </Tabs>
      </InnerWrapper>
    </Wrapper>
  )
}

export default SideMenus
