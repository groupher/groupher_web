import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useTrans from '@/hooks/useTrans'
import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import { DASHBOARD_ROUTE } from '@/constant/route'

import HomeLogo from '@/widgets/HomeLogo'
import { SpaceGrow, SexyDivider, LinkAble } from '@/widgets/Common'

import { Wrapper, MenuBar, Icon } from './styles/more_panel'

const MorePanel: FC = () => {
  const { inView: badgeInView } = useCommunityDigestViewport()
  const { slug } = useViewingCommunity()
  const { t } = useTrans()

  return (
    <Wrapper>
      <LinkAble href={`/${slug}/${DASHBOARD_ROUTE.OVERVIEW}`}>
        <MenuBar $withTop={!badgeInView}>
          <Icon.Dashboard />
          {t('dashboard')}
          <SpaceGrow />
          <Icon.Link />
        </MenuBar>
      </LinkAble>

      <SexyDivider top={6} bottom={6} />
      <MenuBar $withTop={!badgeInView}>
        <Icon.Report />
        {t('report')}
      </MenuBar>
      <MenuBar $withTop={!badgeInView}>
        <HomeLogo size={18} left={-2} />
        {t('groupher.feedback')}
      </MenuBar>
    </Wrapper>
  )
}

export default observer(MorePanel)
