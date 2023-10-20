/*
 * Share
 */

import { FC, Fragment, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import type { TSpace } from '@/spec'
import SVG from '@/constant/svg'

import { buildLog } from '@/logger'
import { bond } from '@/mobx'

import MenuButton from '@/widgets/Buttons/MenuButton'
import IconButton from '@/widgets/Buttons/IconButton'

import Panel from './Panel'

import type { TStore } from './store'
import { useInit, handleMenu } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:Share')

type TProps = {
  share?: TStore
  size?: number
  offsetLeft?: string
} & TSpace

const ShareContainer: FC<TProps> = ({ share: store, offsetLeft = 'none', ...restProps }) => {
  useInit(store)

  const { show, menuOptions, siteShareType, linksData, viewingArticle } = store
  // const [panelLoad, setPanelLoad] = useState(false)

  return (
    <Fragment>
      <MenuButton placement="bottom" options={menuOptions} onClick={handleMenu}>
        <IconButton icon={SVG.SHARE} dimWhenIdle {...restProps} />
      </MenuButton>

      <Panel
        show={show}
        offsetLeft={offsetLeft}
        siteShareType={siteShareType as string}
        linksData={linksData}
        article={viewingArticle}
      />
    </Fragment>
  )
}

export default bond(ShareContainer, 'share') as FC<TProps>
