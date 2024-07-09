import { type FC, useState, useEffect } from 'react'
import { includes, keys, filter } from 'ramda'

import type { TColorName } from '~/spec'
import { COLOR_NAME } from '~/const/colors'
import CustomScroller from '~/widgets/CustomScroller'

import type { TIcon } from './spec'
import FaIcon from '.'
import ICONS from './icons'

import {
  Wrapper,
  ColorWrapper,
  ColorBlock,
  ColorCenter,
  Item,
  IconWrapper,
  Title,
  Input,
} from './styles/panel'

type TProps = {
  selectColor: TColorName
  selectIcon: TIcon
  onColorSelect: (color: TColorName) => void
  onIconSelect: (icon: TIcon) => void
  panelOpen: boolean
}

const Panel: FC<TProps> = ({ selectColor, selectIcon, onColorSelect, onIconSelect, panelOpen }) => {
  const iconKeys = keys(ICONS)
  const colorNames = keys(COLOR_NAME)

  const [searchKey, setSearchKey] = useState('')
  const filteredIconKeys = filter((k) => includes(searchKey, k), iconKeys)

  useEffect(() => {
    if (!panelOpen) {
      setSearchKey('')
    }
  }, [panelOpen])

  return (
    <Wrapper>
      <ColorWrapper>
        {colorNames.map((color) => (
          <ColorBlock
            key={color}
            color={color}
            onClick={() => onColorSelect(color)}
            $active={selectColor === color}
          >
            <ColorCenter color={color} />
          </ColorBlock>
        ))}
      </ColorWrapper>

      <Input
        value={searchKey}
        placeholder="// 搜索图标（英文）"
        onChange={(e) => setSearchKey(e.target.value)}
      />

      <CustomScroller
        direction="vertical"
        height="150px"
        barSize="small"
        showShadow={false}
        autoHide
      >
        {filteredIconKeys.map((name) => (
          <Item key={name} onClick={() => onIconSelect(name)} $active={selectIcon === name}>
            <IconWrapper>
              <FaIcon icon={name} size={13} color={COLOR_NAME.BLACK} />
            </IconWrapper>
            <Title>{name}</Title>
          </Item>
        ))}
      </CustomScroller>
    </Wrapper>
  )
}

export default Panel
