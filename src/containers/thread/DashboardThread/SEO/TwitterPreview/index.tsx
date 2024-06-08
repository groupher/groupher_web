import type { FC } from 'react'

import { TW_CARD } from '../../constant'

import useSEOInfo from '../../hooks/useSEOInfo'

import SummaryLargeLayout from './SummaryLargeLayout'
import SummaryLayout from './SummaryLayout'

const TwitterPreview: FC = () => {
  const { twCard } = useSEOInfo()

  return twCard === TW_CARD.SUMMARY_LARGE_IMAGE ? <SummaryLargeLayout /> : <SummaryLayout />
}

export default TwitterPreview
