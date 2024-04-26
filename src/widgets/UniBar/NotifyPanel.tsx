import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { Wrapper } from './styles/notify_panel'

const MorePanel: FC = () => {
  return (
    <Wrapper>
      <>当前没有消息。</>
    </Wrapper>
  )
}

export default observer(MorePanel)
