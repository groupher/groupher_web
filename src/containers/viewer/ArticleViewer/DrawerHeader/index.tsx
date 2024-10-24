import { closeDrawer } from '~/signal'

import Share from '~/widgets/Share'
import ArticleSettingMenu from '~/widgets/ArticleSettingMenu'

import { Wrapper, BackButton, ArrowIcon, BackText, ReportIcon } from '../styles/drawer_header'

export default () => (
  <Wrapper>
    <BackButton onClick={() => closeDrawer()}>
      <ArrowIcon />
      <BackText>返回列表</BackText>
    </BackButton>
    <div className="grow" />
    <Share modalOffset="53%" />
    <ReportIcon />
    <ArticleSettingMenu left={16} />
  </Wrapper>
)
