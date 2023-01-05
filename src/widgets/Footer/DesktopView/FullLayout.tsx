import { FC, memo } from 'react'
import { useTheme } from 'styled-components'

import type { TThemeMap, TMetric } from '@/spec'
import { GITHUB, ABOUT_LINK } from '@/config'
import { SpaceGrow } from '@/widgets/Common'

import SOCIAL_LIST from '@/constant/social'
import SocialList from '@/widgets/SocialList'

import {
  Wrapper,
  InnerWrapper,
  BrandWrapper,
  BrandTitle,
  BrandDesc,
  SocialInfo,
  Column,
  Title,
  Body,
  Item,
  LinkItem,
} from '../styles/desktop_view/full_layout'

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
          <BrandTitle>Groupher</BrandTitle>
          <BrandDesc>让你的产品聆听用户的声音</BrandDesc>
          <SpaceGrow />

          <SocialInfo>
            <SocialList
              selected={[
                {
                  type: SOCIAL_LIST.HOMEPAGE,
                  addr: 'https://groupher.com',
                },
                {
                  type: SOCIAL_LIST.TWITTER,
                  addr: 'https://twitter.com',
                },
                {
                  type: SOCIAL_LIST.BOSS,
                  addr: 'https://zhipin.com',
                },
              ]}
            />
          </SocialInfo>
        </BrandWrapper>

        <Column>
          <Title>使用指南</Title>
          <Body>
            <LinkItem href={`${ABOUT_LINK}`} {...linkColors}>
              发帖须知
            </LinkItem>
            <LinkItem href={`${ABOUT_LINK}`} {...linkColors}>
              会员福利
            </LinkItem>
            <LinkItem href={`${ABOUT_LINK}`} {...linkColors}>
              隐私说明
            </LinkItem>
            <LinkItem href={`${ABOUT_LINK}`} {...linkColors}>
              存档规则
            </LinkItem>
            <LinkItem href={`${ABOUT_LINK}`} {...linkColors}>
              免责声明
            </LinkItem>
          </Body>
        </Column>

        <Column>
          <Title>开发者</Title>
          <Body>
            <Item as="span" normal>
              开发计划
            </Item>
            <LinkItem href="/feedback" {...linkColors}>
              文档中心
            </LinkItem>
            <LinkItem href={`${GITHUB}`} {...linkColors}>
              技术栈
            </LinkItem>
            <LinkItem href={`${GITHUB}`} {...linkColors}>
              API
            </LinkItem>
            <LinkItem href={`${GITHUB}`} {...linkColors}>
              Github
            </LinkItem>
          </Body>
        </Column>

        <Column>
          <Title>品牌</Title>
          <Body>
            <LinkItem href={`${ABOUT_LINK}`} {...linkColors}>
              价值观
            </LinkItem>
            <LinkItem href={`${ABOUT_LINK}`} {...linkColors}>
              名词解释
            </LinkItem>
            <LinkItem href={`${ABOUT_LINK}`} {...linkColors}>
              Logo &amp; 资源
            </LinkItem>
          </Body>
        </Column>
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(HomeView)
