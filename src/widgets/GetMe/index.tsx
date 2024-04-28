/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-no-comment-textnodes */
/*
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { buildLog } from '@/logger'
import Tooltip from '@/widgets/Tooltip'

import Panel from './Panel'
import { Wrapper, DownloadIcon } from './styles'

const _log = buildLog('c:GetMe:index')

const GetMe: FC = () => {
  return (
    <Wrapper>
      <Tooltip content={<Panel />} placement="bottom-end" noPadding>
        <DownloadIcon />
      </Tooltip>
    </Wrapper>
  )
}

export default observer(GetMe)
