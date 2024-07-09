import useDoc from '../../logic/useDoc'
import { Wrapper, AddIcon, Title } from '../../styles/doc/block_layout/adder_block'

export default () => {
  const { addDocCategory } = useDoc()

  return (
    <Wrapper onClick={() => addDocCategory()}>
      <AddIcon />
      <Title>添加新分类</Title>
    </Wrapper>
  )
}
