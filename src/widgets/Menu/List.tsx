import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TMenu } from '@/spec'
import { Trans } from '@/i18n'

import type { TMenuItem } from './spec'
import Icon from './Icon'
import { Wrapper, Item, FullIcon, FullItem, Main, Title, FullTitle, Desc } from './styles/list'

type TProps = {
  items: TMenuItem[]
  activeKey: string
  onSelect: (item: TMenuItem) => void
  popWidth: number
  withDesc: boolean
}

const List: FC<TProps> = ({ items, activeKey, onSelect, popWidth, withDesc }) => {
  if (withDesc) {
    return (
      <Wrapper $popWidth={popWidth}>
        {items.map((item) => (
          <FullItem key={item.key} $active={activeKey === item.key} onClick={() => onSelect(item)}>
            <FullIcon>
              <Icon type={item.icon as TMenu} $active={activeKey === item.key} />
            </FullIcon>
            <Main>
              <FullTitle>{Trans(item.key)}</FullTitle>
              <Desc>{item.desc || '--'}</Desc>
            </Main>
          </FullItem>
        ))}
      </Wrapper>
    )
  }

  return (
    <Wrapper $popWidth={popWidth}>
      {items.map((item) => {
        const active = activeKey === item.key

        return (
          <Item key={item.key} $active={active} onClick={() => onSelect(item)}>
            <Icon type={item.icon as TMenu} $active={active} />
            <Title>{Trans(item.key)}</Title>
          </Item>
        )
      })}
    </Wrapper>
  )
}

export default observer(List)
