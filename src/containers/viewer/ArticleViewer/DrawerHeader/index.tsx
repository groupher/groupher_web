import { FC } from 'react'

import { closeDrawer } from '@/signal'

import Share from '@/widgets/Share'
import { SpaceGrow } from '@/widgets/Common'

import {
  Wrapper,
  BackButton,
  ArrowIcon,
  BackText,
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
      <Share />
      <FlagIcon />
      <SettingIcon />
    </Wrapper>
  )
}

export default DrawerHeader
