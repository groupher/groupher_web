import { type FC, memo, type ReactNode } from 'react'

import { Divider } from '@/widgets/Common'
import Tooltip from '@/widgets/Tooltip'

import SideMenu from './SideMenu/Mobile'

import { Wrapper, Title, MobileTitle, ArrowIcon, Desc, MobileMenu } from './styles/portal'

type TProps = {
  title: string
  desc?: ReactNode
  withDivider?: boolean
}

const Portal: FC<TProps> = ({ title, desc = null, withDivider = true }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Tooltip
        content={
          <MobileMenu>
            <SideMenu />
          </MobileMenu>
        }
        placement="bottom-start"
        trigger="click"
        noPadding
      >
        <MobileTitle>
          {title} <ArrowIcon />
        </MobileTitle>
      </Tooltip>

      {desc && <Desc>{desc}</Desc>}
      {withDivider && <Divider bottom={30} top={20} />}
    </Wrapper>
  )
}

export default memo(Portal)
