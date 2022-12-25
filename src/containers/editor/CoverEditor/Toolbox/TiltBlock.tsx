import { Wrapper, Block, Pice, Desc } from '../styles/toolbox/tilt_block'

const TiltBlock = () => {
  return (
    <Wrapper>
      <Block>
        <Pice />
        <Pice $active />
        <Pice />
        <Pice />
        <Pice />
        <Pice />
        <Pice />
        <Pice />
        <Pice />
      </Block>
      <Desc>倾斜</Desc>
    </Wrapper>
  )
}

export default TiltBlock
