import { FC } from 'react'

import { ASSETS_ENDPOINT } from '@/config'
import useAccount from '@/hooks/useAccount'
import { callAuth } from '@/signal'
import { SpaceGrow } from '@/widgets/Common'

import type { TStep } from '../spec'

import StepMap from './StepMap'
import { Wrapper, Logo, Title, Divider, SubTitle, Avatar, AccountIcon } from '../styles/header'

type TProps = {
  step: TStep
  showStep: boolean
}

const Header: FC<TProps> = ({ step, showStep }) => {
  const accountInfo = useAccount()

  return (
    <Wrapper>
      <Logo src={`${ASSETS_ENDPOINT}/communities/groupher-alpha.png`} />
      <Title>Groupher</Title>
      <Divider />
      <SubTitle>创建社区</SubTitle>

      <SpaceGrow />
      {showStep && <StepMap step={step} />}
      <SpaceGrow />

      {accountInfo?.login ? (
        <Avatar src={accountInfo.avatar} />
      ) : (
        <AccountIcon onClick={callAuth} />
      )}
    </Wrapper>
  )
}

export default Header
