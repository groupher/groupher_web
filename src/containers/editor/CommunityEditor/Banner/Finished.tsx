/* eslint-disable jsx-a11y/accessible-emoji */
import { FC, memo } from 'react'

import { ROUTE } from '@/constant/route'
import Button from '@/widgets/Buttons/Button'

import { Wrapper, Title, Desc, Footer, TheLink, DashboardIcon } from '../styles/banner/finished'

type TProps = {
  community: string
}

const Finished: FC<TProps> = ({ community }) => {
  return (
    <Wrapper>
      <Title>👏🏻 &nbsp;&nbsp;感谢你的信任</Title>
      <Desc>申请处理中，在此之前你可以去管理后台完善社区设置</Desc>
      <Footer>
        <TheLink href={`/${community}`}>
          <Button ghost>社区主页</Button>
        </TheLink>

        <TheLink href={`/${community}/${ROUTE.DASHBOARD.DASHBOARD}`}>
          <Button>
            <DashboardIcon />
            管理后台
          </Button>
        </TheLink>
      </Footer>
    </Wrapper>
  )
}

export default memo(Finished)
