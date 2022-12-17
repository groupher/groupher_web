import { FC } from 'react'

import { Wrapper, DeleteButton } from './styles/footer'

const Footer: FC = () => {
  return (
    <Wrapper>
      <DeleteButton type="red" ghost>
        删除标签
      </DeleteButton>
    </Wrapper>
  )
}

export default Footer
