import { FC } from 'react'

import type { TDashboardPath } from '@/spec'
import ArrowLinker from '@/widgets/ArrowLinker'

import { TABS_ITEMS } from './constant'

import {
  Wrapper,
  InnerWrapper,
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
        <Tabs>
          {TABS_ITEMS.map((item) => {
            const $active = tab === item.key
            return (
              <TabItem
                key={item.key}
                $active={$active}
                onClick={() => onChange(item.key)}
                $color={item.color}
              >
                <ItemTitle $active={$active}>{item.title}</ItemTitle>
                {$active && <ItemDesc>{item.desc}</ItemDesc>}
                {$active && (
                  <ArrowLinker href="/" top={12} color={item.color}>
                    了解更多
                  </ArrowLinker>
                )}
              </TabItem>
            )
          })}
        </Tabs>
      </InnerWrapper>
    </Wrapper>
  )
}

export default SideMenus
