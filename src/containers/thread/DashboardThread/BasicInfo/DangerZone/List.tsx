import type { FC } from 'react'

import type { TSpace } from '~/spec'

import { Wrapper, Item } from '../../styles/basic_info/danger_zone/list'

type TProps = {
  items: string[]
} & TSpace

const List: FC<TProps> = ({ items, ...restprops }) => {
  return (
    <Wrapper {...restprops}>
      {items.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Item key={index}>{item}</Item>
      ))}
    </Wrapper>
  )
}

export default List
