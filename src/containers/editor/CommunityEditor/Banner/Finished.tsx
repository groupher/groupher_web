/* eslint-disable jsx-a11y/accessible-emoji */
import { FC, memo } from 'react'

import Button from '@/widgets/Buttons/Button'

import { Wrapper, Title, Desc, Footer, DashboardIcon } from '../styles/banner/finished'

// import type { TSetupDomainStatus, TValidState } from '../spec'

const Finished: FC = () => {
  return (
    <Wrapper>
      <Title>👏🏻 &nbsp;&nbsp;感谢你的信任</Title>
      <Desc>申请处理中，在此之前你可以去管理后台完善社区设置</Desc>
      <Footer>
        <Button ghost>社区主页</Button>
        <Button>
          <DashboardIcon />
          管理后台
        </Button>
      </Footer>
    </Wrapper>
  )
}

export default memo(Finished)
