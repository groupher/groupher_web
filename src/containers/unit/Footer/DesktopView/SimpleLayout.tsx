import { FC } from 'react'

import { Wrapper, Note, Addr } from '../styles/desktop_view/simple_layout'

const SimpleLayout: FC = () => {
  return (
    <Wrapper>
      <Note>
        由<Addr href="/">Groupher</Addr>
        提供服务
      </Note>
      <Note>
        <Addr href="http://beian.miit.gov.cn" target="_blank">
          蜀ICP备17043722号-4
        </Addr>
      </Note>
      <br />
    </Wrapper>
  )
}

export default SimpleLayout
