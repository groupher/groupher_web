import { FC } from 'react'

import type { TSEOSettings } from '../../spec'

import SummaryLargeLayout from './SummaryLargeLayout'
import SummaryLayout from './SummaryLayout'

type TProps = {
  settings: TSEOSettings
}

const TwitterPreview: FC<TProps> = ({ settings }) => {
  return settings.twCard === 'summary_large' ? (
    <SummaryLargeLayout settings={settings} />
  ) : (
    <SummaryLayout settings={settings} />
  )
}

export default TwitterPreview
