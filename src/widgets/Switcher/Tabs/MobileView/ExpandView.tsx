/*
 *
 * Tabs
 *
 */

import { FC, useEffect, useRef, useState, useCallback, memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TSizeSM, TTabItem } from '@/spec'
import { ICON } from '@/config'
import SIZE from '@/constant/size'
import { isString } from '@/validator'
import { buildLog } from '@/logger'

import TabItem from '../TabItem'
import { Wrapper, Nav, MoreWrapper, ArrowIcon } from '../../styles/tabs/mobile_view/expand_view'

const log = buildLog('w:Tabs:index')

type TProps = {
  items: TTabItem[]
  activeKey: string
  size: TSizeSM
  toggleExpand: () => void
  onChange: () => void
}

const MobileView: FC<TProps> = ({
  size = SIZE.MEDIUM,
  onChange = log,
  items,
  activeKey = '',
  toggleExpand,
}) => {
  const { isMobile } = useMobileDetect()

  const [tabWidthList, setTabWidthList] = useState([])
  const [showMore, setShowMore] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const tabWidthSum = tabWidthList.reduce((a, b) => a + b, 0)
    const navWidth = navRef?.current?.clientWidth
    if (navWidth && navWidth < tabWidthSum) {
      setShowMore(true)
    } else {
      setShowMore(false)
    }
  }, [tabWidthList])

  // set slipbar with for current nav item
  // 为下面的滑动条设置当前 TabItem 的宽度
  const handleNaviItemWith = useCallback(
    (index, width) => {
      tabWidthList[index] = width
      setTabWidthList(tabWidthList)
    },
    [tabWidthList],
  )

  const handleItemClick = useCallback(
    (index) => {
      const item = items[index]

      onChange(isString(item) ? item : item.slug || item.title)
    },
    [onChange, items],
  )

  return (
    <Wrapper $testid="tabs">
      {showMore && (
        <MoreWrapper onClick={toggleExpand}>
          <ArrowIcon src={`${ICON}/shape/arrow-simple.svg`} />
        </MoreWrapper>
      )}
      <Nav ref={navRef}>
        {items.map((item, index) => (
          <TabItem
            key={item.slug || item.title}
            mobileView={isMobile}
            activeKey={activeKey}
            index={index}
            item={item}
            size={size}
            setItemWidth={handleNaviItemWith}
            onClick={handleItemClick}
            wrapMode
          />
        ))}
      </Nav>
    </Wrapper>
  )
}

export default memo(MobileView)
