import { FC, memo } from 'react'

// import { config, library } from '@fortawesome/fontawesome-svg-core'
// config.autoAddCss = false

import type { TColorName } from '@/spec'
import FaIconSelector from '@/widgets/FaIcons/Selector'
import Tooltip from '@/widgets/Tooltip'

import BlockMenu from './BlockMenu'
import FileItem from './FileItem'

import {
  Wrapper,
  GlobalSettingIcon,
  Header,
  Title,
  // MoreLink,
  AdderButton,
  PlusIcon,
} from '../../styles/help/block_layout/block'

type TProps = {
  color: TColorName
  title: string
}

const Block: FC<TProps> = ({ color, title }) => {
  return (
    <Wrapper>
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

      {/* <FileItem name={desc} />
      <FileItem name={desc} /> */}

      <AdderButton ghost size="small">
        <PlusIcon /> 添加文章
      </AdderButton>
      {/* <MoreLink>查看全部</MoreLink> */}
    </Wrapper>
  )
}

export default memo(Block)
