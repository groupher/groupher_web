/*
 *
 * ArticleSettingMenu
 *
 */

import { FC, memo, useState, useEffect } from 'react'

import { buildLog } from '@/logger'

import type { TSpace } from '@/spec'

import Tooltip from '@/widgets/Tooltip'

import Menu from './Menu'
import { Wrapper, SettingIcon, DisableTippyJump } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:ArticleSettingMenu:index')

type TProps = {
  testid?: string
} & TSpace

const ArticleSettingMenu: FC<TProps> = ({ testid = 'article-setting-menu', ...restProps }) => {
  const [visible, setVisible] = useState(null)
  const [subMenuOpen, setSubMenuOpen] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [disablePopAnimate, setDisablePopAnimate] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      setTimeout(() => {
        setDisablePopAnimate(true)
      }, 100)
    } else {
      setDisablePopAnimate(false)
    }
    return () => setDisablePopAnimate(false)
  }, [menuOpen])

  const doClose = () => {
    setSubMenuOpen(null)
    setVisible(false)
    setMenuOpen(false)

    setTimeout(() => {
      setVisible(null)
    })
  }

  return (
    <Wrapper testid={testid} {...restProps}>
      <Tooltip
        visible={visible}
        content={<Menu onSubMenuToggle={(t) => setSubMenuOpen(t)} onClose={doClose} />}
        placement="bottom-end"
        hideOnClick={false}
        offset={[0, 10]}
        onShow={() => {
          setMenuOpen(true)
          setVisible(true)
        }}
        onHide={() => {
          if (subMenuOpen) return
          doClose()
        }}
        trigger="click"
        noPadding
      >
        <SettingIcon $active={menuOpen} />
      </Tooltip>
      {disablePopAnimate && <DisableTippyJump />}
    </Wrapper>
  )
}

export default memo(ArticleSettingMenu)
