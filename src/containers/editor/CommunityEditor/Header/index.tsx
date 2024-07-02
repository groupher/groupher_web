import { SpaceGrow } from '~/widgets/Common'
import AccountUnit from '~/widgets/AccountUnit'
import HomeLogo from '~/widgets/HomeLogo'

import StepMap from './StepMap'

import useLogic from '../useLogic'
import { Wrapper, Title, Divider, SubTitle } from '../styles/header'

export default () => {
  const { headerStatus } = useLogic()
  const { step, showStep, communityType } = headerStatus

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
