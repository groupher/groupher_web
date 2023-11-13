import { FC, memo, useState, useRef } from 'react'

import type { TArticleCatMode, TArticleCat, TSpace, TTooltipPlacement } from '@/spec'
import { ARTICLE_CAT, ARTICLE_CAT_MODE } from '@/constant/gtd'
import { POST_CAT_MENU_ITEMS } from '@/constant/menu'

import DropdownButton from '@/widgets/Buttons/DropdownButton'
import Menu from '@/widgets/Menu'

import { FilterWrapper, FullWrapper } from './styles'
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
  const [offset, setOffset] = useState([30, 5])
  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef(null)

  const Wrapper = mode === ARTICLE_CAT_MODE.FILTER ? FilterWrapper : FullWrapper

  const handleSelect = (cat: TArticleCat) => {
    onSelect(cat)
  }

  const popWidth = 120

  return (
    <Wrapper $selected={selected} $menuOpen={menuOpen} {...restProps} ref={ref}>
      {!selected ? (
        <Menu
          offset={offset as [number, number]}
          items={POST_CAT_MENU_ITEMS}
          onSelect={(item) => handleSelect(item.key as TArticleCat)}
          onShow={() => {
            if (selected) {
              setOffset([10, 5])
            }
            setMenuOpen(true)
          }}
          onHide={() => {
            setOffset([30, 5])
            setMenuOpen(false)
          }}
          activeKey={activeCat}
          placement={placement}
          popWidth={popWidth}
        >
          <DropdownButton $active={menuOpen} selected={selected}>
            分类
          </DropdownButton>
        </Menu>
      ) : (
        <DropdownButton
          $active={menuOpen}
          selected={selected}
          closable
          onClear={() => {
            // simulate click to avoid menu pop again
            ref.current.click()
            onSelect(ARTICLE_CAT.ALL)
          }}
        >
          <Menu
            offset={offset as [number, number]}
            items={POST_CAT_MENU_ITEMS}
            onSelect={(item) => handleSelect(item.key as TArticleCat)}
            onShow={() => {
              setOffset([10, -10])
              setMenuOpen(true)
            }}
            onHide={() => {
              setOffset([30, 5])
              setMenuOpen(false)
            }}
            activeKey={activeCat}
            placement={placement}
            popWidth={popWidth}
          >
            <ActiveLabel cat={activeCat} />
          </Menu>
        </DropdownButton>
      )}
    </Wrapper>
  )
}

export default memo(CatSelector)
