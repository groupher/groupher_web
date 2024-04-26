import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'
import HomeLogo from '@/widgets/HomeLogo'
import { SpaceGrow, SexyDivider } from '@/widgets/Common'

import { Wrapper, MenuBar, ICON } from './styles/more_panel'

const MorePanel: FC = () => {
  const { inView: badgeInView } = useCommunityDigestViewport()

  return (
    <Wrapper>
      <MenuBar $withTop={!badgeInView}>
        <ICON.Dashboard />
        控制台
        <SpaceGrow />
        <ICON.Link />
      </MenuBar>
      <SexyDivider top={6} bottom={6} />
      <MenuBar $withTop={!badgeInView}>
        <ICON.Report />
        举报违规
      </MenuBar>
      <MenuBar $withTop={!badgeInView}>
        <HomeLogo size={18} left={-2} />
        社区功能反馈
      </MenuBar>
    </Wrapper>
  )
}

export default observer(MorePanel)
