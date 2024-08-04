import HeadAction from './HeadAction'

import useLogic from '../useLogic'
import { Wrapper, Home, Slash, Cur } from '../styles/article_layout/navi_head'

export default () => {
  const { back2Layout } = useLogic()

  return (
    <Wrapper>
      <Home leftLayout onClick={() => back2Layout()}>
        全部
      </Home>
      <Slash>/</Slash>
      <Cur>产品</Cur>
      <div className="grow" />
      <HeadAction />
    </Wrapper>
  )
}
