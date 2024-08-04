import AccountUnit from '~/widgets/AccountUnit'
import HomeLogo from '~/widgets/HomeLogo'

import StepMap from './StepMap'

import useLogic from '../useLogic'
import { Wrapper, Title, Divider, SubTitle } from '../styles/header'

export default () => {
  const { headerStatus } = useLogic()
  const { showStep } = headerStatus

  return (
    <Wrapper>
      <HomeLogo size={5} right={2} />
      <Title>Groupher</Title>
      <Divider />
      <SubTitle>创建社区</SubTitle>
      <div className="grow" />
      {showStep && <StepMap />}
      <div className="grow" />

      <AccountUnit top={-3} />
    </Wrapper>
  )
}
