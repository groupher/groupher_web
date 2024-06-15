import ArrowButton from '@/widgets/Buttons/ArrowButton'
import { Inline } from '@/widgets/Common'

import Portal from '../Portal'
import Adder from './Adder'
import List from './List'

import { Wrapper } from '../styles/admin'

export default () => {
  return (
    <Wrapper>
      <Portal
        title="管理员"
        desc={
          <>
            添加可参与社区内容管理的账号。
            <Inline>
              <ArrowButton>设置参考</ArrowButton>
            </Inline>
          </>
        }
      />
      <Adder />
      <List />
    </Wrapper>
  )
}
