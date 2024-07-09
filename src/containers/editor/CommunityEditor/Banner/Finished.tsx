/* eslint-disable jsx-a11y/accessible-emoji */
import { ROUTE } from '~/const/route'

import { SexyDivider } from '~/widgets/Common'

import useLogic from '../useLogic'
import {
  Wrapper,
  Title,
  Desc,
  Frame,
  LeftFrame,
  RightFrame,
  ArrowIcon,
  CommunityLogo,
  CommunityTitle,
  CommunityDesc,
  GotoLink,
  GoDashLink,
  DashItem,
  DashIntro,
  DashTitle,
  DashDesc,
} from '../styles/banner/finished'

export default () => {
  const { logo, title, slug, desc } = useLogic()

  return (
    <Wrapper>
      <Title>👏🏻 &nbsp;&nbsp;社区已创建成功</Title>
      <Desc>感谢您的信任，在此之前你可以去管理后台完善相关社区设置</Desc>
      <Frame>
        <LeftFrame>
          <CommunityLogo src={logo} />
          <CommunityTitle>{title}</CommunityTitle>
          <CommunityDesc>{desc}</CommunityDesc>
          <GotoLink href={`/${slug}`}>社区主页</GotoLink>
        </LeftFrame>
        <RightFrame>
          <DashItem href={`/${slug}/${ROUTE.DASHBOARD.LAYOUT}`}>
            <DashIntro>
              <DashTitle>
                布局样式 <ArrowIcon />
              </DashTitle>
              <DashDesc>社区外观，展现样式，关于信息等</DashDesc>
            </DashIntro>
          </DashItem>

          <DashItem href={`/${slug}/${ROUTE.DASHBOARD.THREADS}`}>
            <DashIntro>
              <DashTitle>
                社区板块 <ArrowIcon />
              </DashTitle>
              <DashDesc>是否开通看板，更新日志，文档等</DashDesc>
            </DashIntro>
          </DashItem>

          <DashItem href={`/${slug}/${ROUTE.DASHBOARD.ADMINS}`}>
            <DashIntro>
              <DashTitle>
                管理员 <ArrowIcon />
              </DashTitle>
              <DashDesc>添加社区管理员，权限设置等。</DashDesc>
            </DashIntro>
          </DashItem>

          <DashItem href={`/${slug}/${ROUTE.DASHBOARD.TAGS}`}>
            <DashIntro>
              <DashTitle>
                标签编辑 <ArrowIcon />
              </DashTitle>
              <DashDesc>编辑讨论区，更新日志等板块的标签。</DashDesc>
            </DashIntro>
          </DashItem>

          <DashItem href={`/${slug}/${ROUTE.DASHBOARD.ADMINS}`}>
            <DashIntro>
              <DashTitle>
                数据导入 <ArrowIcon />
              </DashTitle>
              <DashDesc>从兔小巢，Github Discusstion 等平台导入历史数据</DashDesc>
            </DashIntro>
          </DashItem>

          <SexyDivider />
          <GoDashLink href={`/${slug}/${ROUTE.DASHBOARD.OVERVIEW}`}>前往控制台</GoDashLink>
        </RightFrame>
      </Frame>
    </Wrapper>
  )
}
