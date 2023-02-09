import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import {
  Wrapper,
  WarningIcon,
  Title,
  ResetButton,
  LearnMoreButton,
  MoreLink,
} from './styles/dashboard_alert'
import { clearDemoSetting } from './logic'

const DashboardAlert: FC = () => {
  return (
    <Wrapper>
      <WarningIcon />
      <Title>当前自定义设置只对本地演示有效</Title>
      <SpaceGrow />
      <ResetButton onClick={() => clearDemoSetting()}>恢复默认</ResetButton>
      <LearnMoreButton>
        <MoreLink href="/">了解更多</MoreLink>
      </LearnMoreButton>
    </Wrapper>
  )
}

export default DashboardAlert
