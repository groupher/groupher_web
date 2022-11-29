import { FC, memo, useState, Fragment } from 'react'
import dynamic from 'next/dynamic'

import type { TArticleFilter, TArticleCatMode } from '@/spec'
import Tooltip from '@/widgets/Tooltip'

import DropdownButton from '@/widgets/Buttons/DropdownButton'

import { FilterWrapper, FullWrapper, Label, ActiveLabel } from './styles'

const FilterPanel = dynamic(() => import('./FilterPanel'))
const FullPanel = dynamic(() => import('./FullPanel'))

type TProps = {
  activeFilter: TArticleFilter
  onSelect: (filter: TArticleFilter) => void
  mode?: TArticleCatMode
}

const CatSelector: FC<TProps> = ({
  onSelect,
  activeFilter,
  mode = 'filter',
}) => {
  const [show, setShow] = useState(false)

  const Wrapper = mode === 'filter' ? FilterWrapper : FullWrapper

  return (
    <Wrapper>
      <Label>类别</Label>
      <Tooltip
        placement="bottom-start"
        trigger="click"
        hideOnClick={false}
        onShow={() => setShow(true)}
        offset={[-30, 5]}
        content={
          <Fragment>
            {show && mode === 'full' && (
              <FullPanel onSelect={onSelect} activeFilter={activeFilter} />
            )}
            {show && mode === 'filter' && (
              <FilterPanel onSelect={onSelect} activeFilter={activeFilter} />
            )}
          </Fragment>
        }
      >
        <DropdownButton>
          {mode === 'filter' ? '全部' : <ActiveLabel>功能需求</ActiveLabel>}
        </DropdownButton>
      </Tooltip>
    </Wrapper>
  )
}

export default memo(CatSelector)
