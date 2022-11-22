import { FC } from 'react'

import type { TBy } from './spec'
import { BY } from './constant'

import { Wrapper } from './styles/subscribe_info'

type TProps = {
  by: TBy
}

const SubscribeInfo: FC<TProps> = ({ by }) => {
  if (by === BY.EMAIL) {
    return (
      <Wrapper testid="subscribe-info">
        <div>社区内容更新后将内容发送至该邮箱。</div>
      </Wrapper>
    )
  }
  return (
    <Wrapper testid="subscribe-info">
      <div>可通过 rss 地址订阅新内容。</div>
    </Wrapper>
  )
}

export default SubscribeInfo
