/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-no-comment-textnodes */
/*
 */

import type { FC } from 'react'

import Tooltip from '@/widgets/Tooltip'

import Panel from './Panel'
import { Wrapper, DownloadIcon } from './styles'

const GetMe: FC = () => {
  return (
    <Wrapper>
      <Tooltip content={<Panel />} placement="bottom-end" noPadding>
        <DownloadIcon />
      </Tooltip>
    </Wrapper>
  )
}

export default GetMe
