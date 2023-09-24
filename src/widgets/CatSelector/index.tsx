import { FC, memo, useState, Fragment } from 'react'
import dynamic from 'next/dynamic'

import type { TArticleCatMode, TArticleCat, TTooltipPlacement, TSpace } from '@/spec'
import { ARTICLE_CAT, ARTICLE_CAT_MODE } from '@/constant/gtd'

import Tooltip from '@/widgets/Tooltip'
import DropdownButton from '@/widgets/Buttons/DropdownButton'

import { FilterWrapper, FullWrapper, Label } from './styles'

import ActiveLabel from './ActiveLabel'

const FilterPanel = dynamic(() => import('./FilterPanel'))
const FullPanel = dynamic(() => import('./FullPanel'))

type TProps = {
  mode?: TArticleCatMode
  activeCat: TArticleCat
  onSelect: (cat: TArticleCat) => void
  tooltipPlacement?: TTooltipPlacement
  selected?: boolean
} & TSpace

const CatSelector: FC<TProps> = ({
  mode = ARTICLE_CAT_MODE.FILTER,
  activeCat,
  onSelect,
  tooltipPlacement = 'bottom-end',
  selected = false,
  ...restProps
}) => {
  const [show, setShow] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const Wrapper = mode === ARTICLE_CAT_MODE.FILTER ? FilterWrapper : FullWrapper

  const handleSelect = (cat: TArticleCat) => {
    onSelect(cat)
  }

  const offset = mode === ARTICLE_CAT_MODE.FILTER ? [30, 5] : [-44, 5]

  return (
    <Wrapper menuOpen={menuOpen} {...restProps}>
      {mode === ARTICLE_CAT_MODE.FULL && <Label>类别</Label>}
      <Tooltip
        placement={tooltipPlacement}
        trigger="click"
        onShow={() => {
          setShow(true)
          setMenuOpen(true)
        }}
        onHide={() => setMenuOpen(false)}
        offset={offset as [number, number]}
        content={
          <Fragment>
            {show && mode === ARTICLE_CAT_MODE.FULL && (
              <FullPanel onSelect={handleSelect} activeCat={activeCat} />
            )}
            {show && mode === ARTICLE_CAT_MODE.FILTER && (
              <FilterPanel onSelect={handleSelect} activeCat={activeCat} />
            )}
          </Fragment>
        }
      >
        <DropdownButton $active={menuOpen} selected={selected}>
          {activeCat === ARTICLE_CAT.ALL ? '类别' : <ActiveLabel cat={activeCat} />}
        </DropdownButton>
      </Tooltip>
    </Wrapper>
  )
}

export default memo(CatSelector)
