import { FC } from 'react'

import type { TDashboardPath } from '@/spec'
import { DASHBOARD_ROUTE } from '@/constant/route'

import { Wrapper, Title } from '../styles/dashboard_intros/content_preview'

type TProps = {
  tab: TDashboardPath
}

const ContentPreview: FC<TProps> = ({ tab }) => {
  let Content = null

  switch (tab) {
    case DASHBOARD_ROUTE.INFO: {
      Content = <Title>基本信息</Title>
      break
    }

    case DASHBOARD_ROUTE.LAYOUT: {
      Content = <Title>布局与样式</Title>
      break
    }

    default: {
      Content = <Title>其他</Title>
    }
  }

  return <Wrapper>{Content}</Wrapper>
}

export default ContentPreview
