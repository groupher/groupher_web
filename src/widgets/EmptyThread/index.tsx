/*
 *
 * EmptyThread
 *
 */

import { FC, memo } from 'react'
import { includes } from 'ramda'

import type { TThread } from '@/spec'
import { THREAD } from '@/constant/thread'

import { buildLog } from '@/logger'
import { Trans } from '@/i18n'

import { Icon404, Wrapper, Icon, Text, Title, DescWrapper, Desc, IssueLink } from './styles'

const _log = buildLog('w:EmptyThread:index')

type TProps = {
  thread: TThread
}

const EmptyThread: FC<TProps> = ({ thread }) => (
  <Wrapper noShiftRight={includes(thread, [THREAD.POST])}>
    <Icon>
      <Icon404 />
    </Icon>
    <Text>
      <Title>
        未找到相关
        {`${Trans(thread)}`}
        信息
      </Title>
      <DescWrapper>
        <Desc>如果你有相关的内容，欢迎一起和大家一起分享交流</Desc>
        <Desc>
          建议或遇到问题请
          <IssueLink href="/feedback">在这里反馈</IssueLink>
        </Desc>
      </DescWrapper>
    </Text>
  </Wrapper>
)

export default memo(EmptyThread)
