import { type FC, memo } from 'react'

import { GITHUB } from '@/config'

// import DiscussLinker from '@/widgets/DiscussLinker'

import { Wrapper, Entry, Icon, Main, Title, Desc } from '../styles/more_panel/footer'

const MoreContent: FC = () => {
  return (
    <Wrapper>
      <Entry>
        <Main href={`${GITHUB}`} prefetch={false}>
          <Icon.Github />
          <Title>源代码</Title>
        </Main>
        <Desc>本站全部代码开源在 Github 上，欢迎参与。</Desc>
      </Entry>

      <Entry>
        <Main href="/feedback" prefetch={false}>
          <Icon.Feedback />
          <Title>建议与反馈</Title>
        </Main>
        <Desc>关于本站的任何建议，反馈，批评。</Desc>
      </Entry>
    </Wrapper>
  )
}

export default memo(MoreContent)
