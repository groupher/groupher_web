import type { FC } from 'react'

import Tooltip from '~/widgets/Tooltip'

import FileMenu from './FileMenu'

import { Wrapper, Name, SettingIcon } from '../../styles/doc/block_layout/file_item'

type TProps = {
  name: string
}

const FileItem: FC<TProps> = ({ name }) => {
  return (
    <Wrapper>
      <Name>{name}</Name>

      <Tooltip
        content={<FileMenu />}
        placement="bottom-end"
        trigger="mouseenter focus"
        offset={[8, 5]}
        hideOnClick
        noPadding
      >
        <SettingIcon />
      </Tooltip>
    </Wrapper>
  )
}

export default FileItem
