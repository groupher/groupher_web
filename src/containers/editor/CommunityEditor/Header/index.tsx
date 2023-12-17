import { FC } from 'react'

import { ASSETS_ENDPOINT } from '@/config'

import { SpaceGrow } from '@/widgets/Common'
import AccountUnit from '@/widgets/AccountUnit'

import StepMap from './StepMap'

import type { TStep } from '../spec'
import { Wrapper, Logo, Title, Divider, SubTitle } from '../styles/header'

type TProps = {
  step: TStep
  showStep: boolean
}

const Header: FC<TProps> = ({ step, showStep }) => {
  return (
    <Wrapper>
      <Logo src={`${ASSETS_ENDPOINT}/communities/groupher-alpha.png`} />
      <Title>Groupher</Title>
      <Divider />
      <SubTitle>创建社区</SubTitle>
      <SpaceGrow />
      {showStep && <StepMap step={step} />}
      <SpaceGrow />

      <AccountUnit top={-3} />
    </Wrapper>
  )
}

export default Header
