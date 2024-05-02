import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'
import useTrans from '@/hooks/useTrans'

import HomeLogo from '@/widgets/HomeLogo'
import { SpaceGrow, SexyDivider } from '@/widgets/Common'

import { Wrapper, MenuBar, Icon } from './styles/more_panel'

const MorePanel: FC = () => {
  const { inView: badgeInView } = useCommunityDigestViewport()
  const { t } = useTrans()

  return (
    <Wrapper>
      <MenuBar $withTop={!badgeInView}>
        <Icon.Dashboard />
        {t('dashboard')}
        <SpaceGrow />
        <Icon.Link />
      </MenuBar>
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
