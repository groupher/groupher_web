import { FC } from 'react'

import type { TSEOSettings } from '../../spec'
import { TW_CARD } from '../../constant'

import SummaryLargeLayout from './SummaryLargeLayout'
import SummaryLayout from './SummaryLayout'

type TProps = {
  settings: TSEOSettings
}

const TwitterPreview: FC<TProps> = ({ settings }) => {
  return settings.twCard === TW_CARD.SUMMARY_LARGE_IMAGE ? (
    <SummaryLargeLayout settings={settings} />
  ) : (
    <SummaryLayout settings={settings} />
  )
}

export default TwitterPreview
