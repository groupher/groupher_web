/*
 *
 * Footer
 *
 */

import { FOOTER_LAYOUT } from '@/const/layout'
import useFooterLinks from '@/hooks/useFooterLinks'
import useMetric from '@/hooks/useMetric'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import SimpleLayout from './SimpleLayout'
import GroupLayout from './GroupLayout'
import PowerbyInfo from './PowerbyInfo'

import { Wrapper, InnerWrapper } from '../styles'

export default () => {
  const { slug } = useViewingCommunity()
  const { layout } = useFooterLinks()
  const metric = useMetric()

  if (!slug) return null // TODO: link to groupher home

  return (
    <Wrapper $testid="footer" metric={metric}>
      <InnerWrapper metric={metric}>
        {layout === FOOTER_LAYOUT.GROUP ? <GroupLayout /> : <SimpleLayout />}
        <PowerbyInfo />
      </InnerWrapper>
    </Wrapper>
  )
}
