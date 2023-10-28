import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TMenu } from '@/spec'
import usePrimaryColor from '@/hooks/usePrimaryColor'

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
  const primaryColor = usePrimaryColor()

  if (withDesc) {
    return (
      <Wrapper $popWidth={popWidth}>
        {items.map((item) => (
          <FullItem
            key={item.key}
            $color={primaryColor}
            $active={activeKey === item.key}
            onClick={() => onSelect(item)}
          >
            <FullIcon>
              <Icon type={item.icon as TMenu} $active={activeKey === item.key} />
            </FullIcon>
            <Main>
              <FullTitle>{item.title}</FullTitle>
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
        const $active = activeKey === item.key

        return (
          <Item
            key={item.key}
            $color={primaryColor}
            $active={$active}
            onClick={() => onSelect(item)}
          >
            <Icon type={item.icon as TMenu} $active={$active} />
            <Main>
              <Title>{item.title}</Title>
            </Main>
          </Item>
        )
      })}
    </Wrapper>
  )
}

export default observer(List)
