/*
 *
 * FeedbackFooter
 *
 */

import { FC, memo, useState } from 'react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/utils/logger'

import type { THelpFeedback } from './spec'
import { HELP_FEEDBACK } from './constant'
import { Wrapper, Title, FaceWraper, IconWrapper, GoodIcon, SoSoIcon, BadIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:FeedbackFooter:index')

type TProps = {
  testid?: string
  offsetRight?: number
} & TSpace

const FeedbackFooter: FC<TProps> = ({
  testid = 'feedback-footer',
  offsetRight = 30,
  ...restProps
}) => {
  const { GOOD, BAD, SOSO } = HELP_FEEDBACK
  const [feedback, setFeedback] = useState<THelpFeedback | ''>('')

  return (
    <Wrapper testid={testid} offsetRight={offsetRight} {...restProps}>
      <Title>本文是否有帮助?</Title>
      <FaceWraper>
        <IconWrapper $active={feedback === BAD} onClick={() => setFeedback(BAD)}>
          <BadIcon $active={feedback === BAD} />
        </IconWrapper>
        <IconWrapper $active={feedback === SOSO} onClick={() => setFeedback(SOSO)}>
          <SoSoIcon $active={feedback === SOSO} />
        </IconWrapper>
        <IconWrapper $active={feedback === GOOD} onClick={() => setFeedback(GOOD)}>
          <GoodIcon $active={feedback === GOOD} />
        </IconWrapper>
      </FaceWraper>
    </Wrapper>
  )
}

export default memo(FeedbackFooter)
