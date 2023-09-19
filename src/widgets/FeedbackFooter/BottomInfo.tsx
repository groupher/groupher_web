/*
 *
 * FeedbackFooter
 *
 */

import { FC, memo, useState } from 'react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'

import type { TDocFeedback } from './spec'
import { HELP_FEEDBACK } from './constant'
import {
  Wrapper,
  LastUpdateWrapper,
  FeedbackWrapper,
  Title,
  FaceWraper,
  IconWrapper,
  GoodIcon,
  SoSoIcon,
  BadIcon,
} from './styles/bottom_info'

/* eslint-disable-next-line */
const log = buildLog('c:FeedbackFooter:index')

type TProps = {
  offsetRight?: number
  withLastUpdated?: boolean
} & TSpace

const FeedbackFooter: FC<TProps> = ({ offsetRight = 30, withLastUpdated = true }) => {
  const { GOOD, BAD, SOSO } = HELP_FEEDBACK
  const [feedback, setFeedback] = useState<TDocFeedback | ''>('')

  return (
    <Wrapper offsetRight={offsetRight} withLastUpdated={withLastUpdated}>
      {withLastUpdated && <LastUpdateWrapper>最后更新: 3 天前</LastUpdateWrapper>}
      <FeedbackWrapper withLastUpdated={withLastUpdated}>
        <Title small={withLastUpdated}>本文是否有帮助?</Title>
        <FaceWraper small={withLastUpdated}>
          <IconWrapper $active={feedback === BAD} onClick={() => setFeedback(BAD)}>
            <BadIcon $active={feedback === BAD} small={withLastUpdated} />
          </IconWrapper>
          <IconWrapper $active={feedback === SOSO} onClick={() => setFeedback(SOSO)}>
            <SoSoIcon $active={feedback === SOSO} small={withLastUpdated} />
          </IconWrapper>
          <IconWrapper $active={feedback === GOOD} onClick={() => setFeedback(GOOD)}>
            <GoodIcon $active={feedback === GOOD} small={withLastUpdated} />
          </IconWrapper>
        </FaceWraper>
      </FeedbackWrapper>
    </Wrapper>
  )
}

export default memo(FeedbackFooter)
