import { FC } from 'react'

import { ASSETS_ENDPOINT } from '@/config'

import { SpaceGrow } from '@/widgets/Common'
import AccountUnit from '@/widgets/AccountUnit'

import StepMap from './StepMap'

import type { THeaderStatus } from '../spec'
import { Wrapper, Logo, Title, Divider, SubTitle } from '../styles/header'

type TProps = {
  status: THeaderStatus
}

const Header: FC<TProps> = ({ status }) => {
  const { step, showStep, communityType } = status

  return (
    <Wrapper>
      <Logo src={`${ASSETS_ENDPOINT}/communities/groupher-alpha.png`} />
      <Title>Groupher</Title>
      <Divider />
      <SubTitle>创建社区</SubTitle>
      <SpaceGrow />
      {showStep && <StepMap step={step} communityType={communityType} />}
      <SpaceGrow />

      <AccountUnit top={-3} />
    </Wrapper>
  )
}

export default Header
