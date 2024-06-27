import { type FC, memo } from 'react'

import type { TMetric } from '~/spec'
import { changeToCommunity } from '~/signal'

import METRIC from '~/const/metric'

import {
  Breadcrumbs,
  Logo,
  LogoLink,
  LogoText,
  // OfflineWrapper,
  ActionText,
} from './styles'

import MainEntries from './MainEntries'

// export const BlinkCursor = dynamic(() => import('~/widgets/BlinkCursor'), {
//   ssr: false,
// })

const renderMainEntries = (metric) => {
  switch (metric) {
    case METRIC.ARTICLE_EDITOR: {
      return <ActionText>发布内容</ActionText>
    }

    default: {
      return <MainEntries />
    }
  }
}

type TProps = {
  metric: TMetric
  showLogoText: boolean
}

const DigestView: FC<TProps> = ({ metric, showLogoText }) => {
  // const { online } = useNetwork()
  return (
    <Breadcrumbs>
      <LogoLink
        onClick={() => {
          changeToCommunity('home')
        }}
      >
        <Logo />
        {showLogoText && <LogoText>YourProduct</LogoText>}
      </LogoLink>

      {/* <BlinkCursor duration={1.6} height={14} left={5} right={2} /> */}
      {renderMainEntries(metric)}
      {/* {online ? (
        renderMainEntries(metric)
      ) : (
        <OfflineWrapper>您已离线，请检查网络设置</OfflineWrapper>
      )} */}
    </Breadcrumbs>
  )
}

export default memo(DigestView)
