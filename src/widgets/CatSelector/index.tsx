import { FC, memo, useState } from 'react'

import type { TArticleCatMode, TArticleCat, TSpace, TTooltipPlacement } from '@/spec'
import { ARTICLE_CAT, ARTICLE_CAT_MODE } from '@/constant/gtd'
import { POST_CAT_MENU_ITEMS } from '@/constant/menu'

import DropdownButton from '@/widgets/Buttons/DropdownButton'
import Menu from '@/widgets/Menu'

import { FilterWrapper, FullWrapper, Label } from './styles'
import ActiveLabel from './ActiveLabel'

type TProps = {
  mode?: TArticleCatMode
  activeCat: TArticleCat
  placement?: TTooltipPlacement
  onSelect: (cat: TArticleCat) => void
  selected?: boolean
} & TSpace

const CatSelector: FC<TProps> = ({
  mode = ARTICLE_CAT_MODE.FILTER,
  activeCat,
  onSelect,
  selected = false,
  placement = 'bottom',
  ...restProps
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const Wrapper = mode === ARTICLE_CAT_MODE.FILTER ? FilterWrapper : FullWrapper

  const handleSelect = (cat: TArticleCat) => {
    onSelect(cat)
  }

  const offset = [30, 5]
  const popWidth = 120

  return (
    <Wrapper menuOpen={menuOpen} {...restProps}>
      {mode === ARTICLE_CAT_MODE.FULL && <Label>类别</Label>}

      <Menu
        offset={offset as [number, number]}
        items={POST_CAT_MENU_ITEMS}
        onSelect={(item) => handleSelect(item.key as TArticleCat)}
        onShow={() => setMenuOpen(true)}
        onHide={() => setMenuOpen(false)}
        activeKey={activeCat}
        placement={placement}
        popWidth={popWidth}
      >
        <DropdownButton $active={menuOpen} selected={selected}>
          {activeCat === ARTICLE_CAT.ALL ? '类别' : <ActiveLabel cat={activeCat} />}
        </DropdownButton>
      </Menu>
    </Wrapper>
  )
}

export default memo(CatSelector)
