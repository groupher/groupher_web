/*
 *
 * Footer
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { FOOTER_LAYOUT } from '@/constant/layout'
import useFooterLinks from '@/hooks/useFooterLinks'
import useMetric from '@/hooks/useMetric'

import { buildLog } from '@/logger'

import SimpleLayout from './SimpleLayout'
import GroupLayout from './GroupLayout'
import PowerbyInfo from './PowerbyInfo'

import { Wrapper, InnerWrapper } from '../styles'

/* eslint-disable-next-line */
const log = buildLog('C:Footer')

const Footer: FC = () => {
  const { layout } = useFooterLinks()
  const metric = useMetric()

  return (
    <Wrapper $testid="footer" metric={metric}>
      <InnerWrapper metric={metric}>
        {layout === FOOTER_LAYOUT.GROUP ? <GroupLayout /> : <SimpleLayout />}
        <PowerbyInfo />
      </InnerWrapper>
    </Wrapper>
  )
}

export default observer(Footer)
