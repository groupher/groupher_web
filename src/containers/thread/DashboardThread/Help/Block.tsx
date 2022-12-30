import { FC, memo } from 'react'

// import { config, library } from '@fortawesome/fontawesome-svg-core'
// config.autoAddCss = false

import type { TColorName } from '@/spec'
import FaIconSelector from '@/widgets/FaIcons/Selector'
import Tooltip from '@/widgets/Tooltip'

import BlockMenu from './BlockMenu'

import {
  Wrapper,
  GlobalSettingIcon,
  Header,
  Title,
  Item,
  MoreLink,
  AdderButton,
  PlusIcon,
} from '../styles/help/block'

type TProps = {
  color: TColorName
  title: string
  desc: string
  column?: number
}

const Block: FC<TProps> = ({ color, title, desc, column = 2 }) => {
  return (
    <Wrapper color={color} column={column}>
      <Tooltip
        content={<BlockMenu />}
        placement="bottom-end"
        trigger="mouseenter focus"
        offset={[0, 20]}
        hideOnClick
        noPadding
      >
        <GlobalSettingIcon />
      </Tooltip>
      <Header>
        <FaIconSelector size={15} color={color} left={0} bottom={5} />
        <Title>{title}</Title>
      </Header>

      <Item color={color}>{desc}</Item>
      {/* <Item color={color}>{desc}</Item>
      <Item color={color}>{desc}</Item> */}

      <AdderButton ghost size="small">
        <PlusIcon /> 添加文章
      </AdderButton>
      {/* <MoreLink>查看全部</MoreLink> */}
    </Wrapper>
  )
}

export default memo(Block)
