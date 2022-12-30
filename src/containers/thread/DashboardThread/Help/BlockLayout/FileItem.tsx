import { FC } from 'react'

import { Wrapper } from '../../styles/help/block_layout/file_item'

type TProps = {
  name: string
}

const FileItem: FC<TProps> = ({ name }) => {
  return <Wrapper>{name}</Wrapper>
}

export default FileItem
