/*
 * Tooltip

 * use custom animation Globally at GlobalStyle.ts
 */

import { FC, useState, useRef, useEffect } from 'react'
import { hideAll } from 'tippy.js'

import { zIndex } from '@/css'
import { buildLog } from '@/logger'
import { isString } from '@/validator'
import { isDescendant, isWechatBrower } from '@/dom'

import useOutsideClick from '@/hooks/useOutsideClick'

import type { TProps } from '.'
import { FOOTER_BEHAVIOR } from './constant'
import ConfirmFooter from './ConfirmFooter'

import { StyledTippy, NoPaddingStyledTippy, ChildrenWrapper, ContentWrapper } from './styles'

const _log = buildLog('w:Tooltip:index')

const Tooltip: FC<TProps> = ({
  children,
  noPadding = false,
  interactive = true,
  onHide,
  onShow,
  placement = 'top',
  delay = 0,
  offset = [5, 5],
  duration = 0,
  content,
  hideOnClick = true,
  forceZIndex = false,
  behavior = 'default',
  trigger = 'mouseenter focus',
  visible = null,
  onConfirm,
  contentHeight,
}) => {
  const [instance, setInstance] = useState(null)
  const [active, setActive] = useState(false)
  const [wechatEnv, setWechatEnv] = useState(false)

  const contentRef = useRef()

  useEffect(() => {
    // the wechat's env support backdrop-filter like a shit
    setWechatEnv(isWechatBrower())
  }, [])

  const PopoverContent = (
    <ContentWrapper
      ref={contentRef}
      $hasMaxWidth={isString(content)}
      onClick={() => {
        if (hideOnClick) instance?.hide()
      }}
    >
      {content}
      {active && behavior !== FOOTER_BEHAVIOR.DEFAULT && (
        <ConfirmFooter
          onConfirm={() => {
            onConfirm?.()
            instance?.hide()
          }}
          onCancel={() => instance?.hide()}
          behavior={behavior}
        />
      )}
    </ContentWrapper>
  )

  const ref = useRef()

  useOutsideClick(ref, (e) => {
    if (!instance) return false

    const isClickInsidePopover = isDescendant(contentRef?.current, e.target)
    if (!isClickInsidePopover) {
      // if ((hideOnClick && !isClickInsidePopover) || !isClickInsidePopover) {
      // if (hideOnClick || (!hideOnClick && !isClickInsidePopover)) {
      // if (instance) {
      // NOTE:  this is a hack, svg will swallow events like click
      // and the pointer-events solution not work
      const { nodeName } = e.target
      if (nodeName === 'svg' || nodeName === 'path') return false

      instance.hide()
    }
  })

  let props = {
    ref,
    content: PopoverContent,
    placement,
    hideOnClick,
    zIndex: zIndex.popover,
    active: true,
    delay: [delay, 0] as [number, number],
    offset,
    // offset: [0, -8] as [number, number],
    duration,
    trigger,
    // see https://github.com/atomiks/tippyjs/issues/751#issuecomment-611979594 for detail
    interactive,

    onHide: () => {
      setInstance(null)
      setActive(false)
      onHide?.()
    },
    onShow: (instance) => {
      // see https://github.com/atomiks/tippyjs/issues/260#issuecomment-462031748
      hideAll({ exclude: instance })

      setInstance(instance)
      setActive(true)
      onShow?.()
    },
  }

  // @ts-ignore
  props = visible === null ? props : { ...props, visible }

  return !noPadding ? (
    <StyledTippy {...props} wechatEnv={wechatEnv}>
      <ChildrenWrapper $contentHeight={contentHeight} $forceZIndex={forceZIndex}>
        {children}
      </ChildrenWrapper>
    </StyledTippy>
  ) : (
    <NoPaddingStyledTippy {...props} wechatEnv={wechatEnv}>
      <ChildrenWrapper $contentHeight={contentHeight} $forceZIndex={forceZIndex}>
        {children}
      </ChildrenWrapper>
    </NoPaddingStyledTippy>
  )
}

export default Tooltip
