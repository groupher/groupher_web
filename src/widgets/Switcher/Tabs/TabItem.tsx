/*
 *
 * Tabs
 *
 */

import { FC, useEffect, useCallback, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import type { TSizeSM, TTabItem } from '@/spec'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import { Trans } from '@/i18n'
import { isString } from '@/validator'
import { buildLog } from '@/logger'
import { isElementInViewport } from '@/dom'

import TabIcon from './TabIcon'
import { Wrapper, Label, ActiveLineWrapper, ActiveLine } from '../styles/tabs/tab_item'

const _log = buildLog('w:Tabs:index')

type TProps = {
  mobileView?: boolean
  modelineView?: boolean
  wrapMode?: boolean
  item: TTabItem
  index: number
  size: TSizeSM
  activeKey: string
  bottomSpace?: number
  setItemWidth?: (index: number, width: number) => void
  onClick?: (index: number, e) => void
}

const TabItem: FC<TProps> = ({
  mobileView = false,
  modelineView = false,
  wrapMode = false,
  bottomSpace = 0,
  activeKey,
  item,
  index,
  size,
  onClick,
  setItemWidth,
}) => {
  const primaryColor = usePrimaryColor()

  const ref = useRef(null)
  const clickableRef = useRef(null)
  const activeRef = useRef(null)

  // set each tab item width for calc
  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : 0
    setItemWidth?.(index, width)
  }, [setItemWidth, index])

  const handleWrapperClick = useCallback(() => clickableRef.current.click(), [clickableRef])

  const handleLabelClick = useCallback(
    (e) => {
      e.stopPropagation()
      onClick(index, e)
    },
    [onClick, index],
  )

  useEffect(() => {
    if (item.slug === activeKey && !(mobileView || modelineView) && !wrapMode) {
      const curEl = activeRef?.current
      const inViewport = isElementInViewport(curEl)

      // 这里的 width 是一个 hack, 每一个 TabItem 会触发设置宽度的
      // 父元素钩子，导致两次渲染，但是第一次没有调用之前每个 Item 的宽度是 auto
      // 利用这个特性可以判断真正需要 scroll 到 view 的元素
      if (curEl && inViewport && getComputedStyle(curEl).width !== 'auto') {
        curEl.scrollIntoView({
          block: 'center',
          // inline: 'center',
        })
      }
    }
  }, [activeRef, item, activeKey, mobileView, modelineView, wrapMode])

  return (
    <Wrapper
      ref={ref}
      $mobileView={mobileView}
      $modelineView={modelineView}
      $wrapMode={wrapMode}
      size={size}
      onClick={handleWrapperClick}
      $active={item.slug === activeKey}
    >
      <Label
        ref={clickableRef}
        onClick={handleLabelClick}
        $active={item.slug === activeKey}
        size={size}
        $bottomSpace={bottomSpace}
        $color={primaryColor}
      >
        {!isString(item) && item.icon && (
          <TabIcon item={item} clickableRef={clickableRef} active={item.slug === activeKey} />
        )}
        <div ref={item.slug === activeKey ? activeRef : null}>
          {isString(item) ? item : item.alias || Trans(item.title)}
        </div>
      </Label>

      {wrapMode && item.slug === activeKey && (
        <ActiveLineWrapper>
          <ActiveLine />
        </ActiveLineWrapper>
      )}
    </Wrapper>
  )
}

export default observer(TabItem)
