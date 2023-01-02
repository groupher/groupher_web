import { FC } from 'react'

import Templates from './Templates'
import { Wrapper } from '../styles/footer'

const Footer: FC = () => {
  return (
    <Wrapper>
      <Templates />
      <h3>footer template</h3>
      <h3>footer editor</h3>
    </Wrapper>
  )
}

export default Footer
