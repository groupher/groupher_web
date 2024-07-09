import { SpaceGrow } from '~/widgets/Common'
import { Wrapper, Title, ViewWrapper } from '../styles/doc/Header'

const Header = () => {
  return (
    <Wrapper>
      <Title>目录</Title>
      <SpaceGrow />
      <ViewWrapper>块视图</ViewWrapper>
    </Wrapper>
  )
}

export default Header
