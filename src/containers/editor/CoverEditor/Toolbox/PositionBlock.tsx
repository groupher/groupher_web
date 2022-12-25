import { Wrapper, Block, Pice, Desc } from '../styles/toolbox/position_block'

const PositionBlock = () => {
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
      <Desc>位置</Desc>
    </Wrapper>
  )
}

export default PositionBlock
