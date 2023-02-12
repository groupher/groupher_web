import { FC } from 'react'

import { Item } from '../../styles/simple_layout/filter_bar'

const VersionBar: FC = () => {
  return (
    <>
      <Item>v4.0</Item>
      <Item>v3.0</Item>
      <Item>v2.0</Item>
      <Item>v1.0</Item>
    </>
  )
}

export default VersionBar
