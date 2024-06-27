import type { FC } from 'react'

import { SpaceGrow } from '~/widgets/Common'
import AccountUnit from '~/widgets/AccountUnit'
import HomeLogo from '~/widgets/HomeLogo'

import StepMap from './StepMap'

import type { THeaderStatus } from '../spec'
import { Wrapper, Title, Divider, SubTitle } from '../styles/header'

type TProps = {
  status: THeaderStatus
}

const Header: FC<TProps> = ({ status }) => {
  const { step, showStep, communityType } = status

  return (
    <Wrapper>
      <HomeLogo size={22} right={8} />
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
