import { type FC, memo } from 'react'

import SVG from '~/const/svg'
import MenuButton from '~/widgets/Buttons/MenuButton'

import { Wrapper, Menu, MoreIcon, UploadIcon, Title } from '../styles/upload_pic/upload_box'

const menuOptions = [
  {
    key: 'url',
    icon: SVG.COPY,
    title: '图片地址',
  },
]

const UploadBox: FC = () => {
  return (
    <Wrapper>
      <Menu>
        <MenuButton placement="bottom-end" options={menuOptions}>
          <MoreIcon />
        </MenuButton>
      </Menu>
      <UploadIcon />
      <Title>上传 / 引入图片</Title>
    </Wrapper>
  )
}

export default memo(UploadBox)
