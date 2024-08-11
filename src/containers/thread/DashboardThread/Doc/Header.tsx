import { Wrapper, Title, ViewWrapper } from '../styles/doc/Header'

const Header = () => {
  return (
    <Wrapper>
      <Title>目录</Title>
      <div className="grow" />
      <ViewWrapper>块视图</ViewWrapper>
    </Wrapper>
  )
}

export default Header
