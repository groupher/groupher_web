/*
 *
 * Footer
 *
 */

import { FC } from 'react'

import { FOOTER_LAYOUT } from '@/constant/layout'
import useFooterLinks from '@/hooks/useFooterLinks'

import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import SimpleLayout from './SimpleLayout'
import GroupLayout from './GroupLayout'
import PowerbyInfo from './PowerbyInfo'

import type { TProps } from '..'
import { Wrapper, InnerWrapper } from '../styles'

/* eslint-disable-next-line */
const log = buildLog('C:Footer')

const FooterContainer: FC<TProps> = ({ metric, testid = 'footer' }) => {
  const { layout } = useFooterLinks()

  return (
    <Wrapper testid={testid} metric={metric}>
      <InnerWrapper metric={metric}>
        {layout === FOOTER_LAYOUT.GROUP ? <GroupLayout metric={metric} /> : <SimpleLayout />}
        <PowerbyInfo metric={metric} />
      </InnerWrapper>
    </Wrapper>
  )
}

export default bond(FooterContainer, 'footer') as FC<TProps>
