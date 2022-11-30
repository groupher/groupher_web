import { FC, memo, useState, Fragment } from 'react'
import dynamic from 'next/dynamic'

import type { TArticleCatMode, TArticleCat } from '@/spec'
import { ARTICLE_CAT } from '@/constant'

import Tooltip from '@/widgets/Tooltip'
import DropdownButton from '@/widgets/Buttons/DropdownButton'

import { FilterWrapper, FullWrapper, Label } from './styles'

import ActiveLabel from './ActiveLabel'

const FilterPanel = dynamic(() => import('./FilterPanel'))
const FullPanel = dynamic(() => import('./FullPanel'))

type TProps = {
  mode?: TArticleCatMode
}

const CatSelector: FC<TProps> = ({ mode = 'filter' }) => {
  const [show, setShow] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const [activeCat, setActiveCat] = useState<TArticleCat>(ARTICLE_CAT.FEATURE)

  const Wrapper = mode === 'filter' ? FilterWrapper : FullWrapper

  const handleSelect = (cat: TArticleCat) => {
    setActiveCat(cat)
  }

  const offset = mode === 'filter' ? [-30, 5] : [-44, 5]

  return (
    <Wrapper menuOpen={menuOpen}>
      <Label>类别</Label>
      <Tooltip
        placement="bottom-start"
        trigger="click"
        onShow={() => {
          setShow(true)
          setMenuOpen(true)
        }}
        onHide={() => {
          setMenuOpen(false)
        }}
        offset={offset as [number, number]}
        content={
          <Fragment>
            {show && mode === 'full' && (
              <FullPanel onSelect={handleSelect} activeCat={activeCat} />
            )}
            {show && mode === 'filter' && (
              <FilterPanel onSelect={handleSelect} activeCat={activeCat} />
            )}
          </Fragment>
        }
      >
        <DropdownButton>
          {activeCat === ARTICLE_CAT.ALL ? (
            '全部'
          ) : (
            <ActiveLabel cat={activeCat} />
          )}
        </DropdownButton>
      </Tooltip>
    </Wrapper>
  )
}

export default memo(CatSelector)
