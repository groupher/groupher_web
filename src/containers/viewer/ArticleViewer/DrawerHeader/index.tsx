import { FC } from 'react'

import { closeDrawer } from '@/signal'

import Share from '@/containers/tool/Share'
import { SpaceGrow } from '@/widgets/Common'

import {
  Wrapper,
  BackButton,
  ArrowIcon,
  BackText,
  LinkIcon,
  QRCodeIcon,
  MoreIcon,
  FlagIcon,
  SettingIcon,
} from '../styles/drawer_header'

const DrawerHeader: FC = () => {
  return (
    <Wrapper>
      <BackButton onClick={() => closeDrawer()}>
        <ArrowIcon />
        <BackText>返回列表</BackText>
      </BackButton>
      <SpaceGrow />
      <Share size={14} offsetLeft="54%" />
      <LinkIcon />
      <QRCodeIcon />
      <MoreIcon />
      <FlagIcon />
      <SettingIcon />
    </Wrapper>
  )
}

export default DrawerHeader
