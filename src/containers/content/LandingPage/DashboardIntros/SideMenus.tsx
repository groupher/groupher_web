import { FC } from 'react'

import type { TDashboardPath } from '@/spec'

import { TABS_ITEMS } from './constant'

import {
  Wrapper,
  InnerWrapper,
  Header,
  Title,
  Highlight,
  Desc,
  Tabs,
  TabItem,
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
          <Title>
            全面的<Highlight>后台管理</Highlight>
          </Title>
          <Desc>强大的自定义设置，所见即所得，满足你的品牌个性化及内容管理需要。</Desc>
        </Header>

        <Tabs>
          {TABS_ITEMS.map((item) => (
            <TabItem key={item.key} $active={tab === item.key} onClick={() => onChange(item.key)}>
              {item.title}
            </TabItem>
          ))}
        </Tabs>
      </InnerWrapper>
    </Wrapper>
  )
}

export default SideMenus
