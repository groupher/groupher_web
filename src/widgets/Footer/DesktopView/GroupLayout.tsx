import { FC, memo } from 'react'
import { useTheme } from 'styled-components'

import type { TThemeMap, TMetric } from '@/spec'
import { GITHUB, APP_VERSION } from '@/config'
import { SpaceGrow } from '@/widgets/Common'

import { DEME_SOCIALS } from '@/constant/social'
import SocialList from '@/widgets/SocialList'

import {
  Wrapper,
  InnerWrapper,
  BrandWrapper,
  BrandLogo,
  BrandDesc,
  Column,
  Title,
  Body,
  LinkItem,
  HeartIcon,
  Item,
} from '../styles/desktop_view/group_layout'

type TProps = {
  metric: TMetric
}

const HomeView: FC<TProps> = ({ metric }) => {
  const theme = useTheme() as TThemeMap

  const linkColors = {
    color: theme.footer.text,
    hoverColor: theme.footer.hover,
  }

  return (
    <Wrapper>
      <InnerWrapper metric={metric}>
        <BrandWrapper>
          <BrandLogo src="/groupher-alpha.png" />
          <BrandDesc>让你的产品聆听用户的声音</BrandDesc>
          <SpaceGrow />

          <SocialList size="medium" selected={DEME_SOCIALS} />
        </BrandWrapper>

        <Column>
          <Title>产品</Title>
          <Body>
            <LinkItem href="/" {...linkColors}>
              使用帮助
            </LinkItem>
            <LinkItem href="/" {...linkColors}>
              隐私说明
            </LinkItem>
            <LinkItem href="/" {...linkColors}>
              免责声明
            </LinkItem>
            <Item as="div">版本号: {APP_VERSION}</Item>
            <LinkItem href="/" {...linkColors}>
              <HeartIcon />
              捐助
            </LinkItem>
            <LinkItem href="/" {...linkColors}>
              友情链接
            </LinkItem>
          </Body>
        </Column>

        <Column>
          <Title>资源</Title>
          <Body>
            <LinkItem href="/home/changelog" {...linkColors}>
              官方社区
            </LinkItem>
            <LinkItem href="/home/changelog" {...linkColors}>
              开发计划
            </LinkItem>
            <LinkItem href="/" {...linkColors}>
              文档中心
            </LinkItem>
            <LinkItem href="/" {...linkColors}>
              技术栈
            </LinkItem>
            <LinkItem href={`${GITHUB}`} {...linkColors}>
              Github
            </LinkItem>
            <LinkItem href="/" {...linkColors}>
              Logo &amp; 设计
            </LinkItem>
          </Body>
        </Column>

        <Column>
          <Title>竞品对比</Title>
          <Body>
            <LinkItem href="/" {...linkColors}>
              与腾讯兔小巢对比
            </LinkItem>
            <LinkItem href="/" {...linkColors}>
              与 Flarum 对比
            </LinkItem>
            <LinkItem href="/" {...linkColors}>
              与 Discourse 对比
            </LinkItem>
            <LinkItem href="/" {...linkColors}>
              与 Canny.io 对比
            </LinkItem>
          </Body>
        </Column>
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(HomeView)
