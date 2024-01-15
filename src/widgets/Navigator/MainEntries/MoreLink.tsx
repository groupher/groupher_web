import { FC, memo, lazy, Suspense } from 'react'

import Tooltip from '@/widgets/Tooltip'

import { SiteLink, ArrowIcon } from '../styles/more_links'

const MorePanel = lazy(() => import('../MorePanel'))

const MoreLink: FC = () => {
  return (
    <Tooltip
      // @ts-ignore
      content={
        <Suspense fallback={null}>
          <MorePanel />
        </Suspense>
      }
      placement="bottom"
      hideOnClick={false}
      trigger="click"
      noPadding
    >
      {/* @ts-ignore */}
      <SiteLink as="div" $testid="header-more-link">
        更多 <ArrowIcon />
      </SiteLink>
    </Tooltip>
  )
}

export default memo(MoreLink)
