/*
 *
 * Footer
 *
 */

import { FC } from 'react'

import { FOOTER_LAYOUT } from '@/constant/layout'

import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import SimpleLayout from './SimpleLayout'
import GroupLayout from './GroupLayout'
import PowerbyInfo from './PowerbyInfo'

import type { TProps } from '..'
import { Wrapper, InnerWrapper } from '../styles'

/* eslint-disable-next-line */
const log = buildLog('C:Footer')

const FooterContainer: FC<TProps> = ({ metric, testid = 'footer', config }) => {
  const { layout, links } = config

  return (
    <Wrapper testid={testid} metric={metric}>
      <InnerWrapper metric={metric}>
        {layout === FOOTER_LAYOUT.GROUP ? (
          <GroupLayout links={links} metric={metric} />
        ) : (
          <SimpleLayout links={links} />
        )}
        <PowerbyInfo config={config} metric={metric} />
      </InnerWrapper>
    </Wrapper>
  )
}

export default bond(FooterContainer, 'footer') as FC<TProps>
