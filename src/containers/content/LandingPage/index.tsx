/* *
 * LandingPage
 *
 */

import { FC } from 'react'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import Link from 'next/link'

import { ROUTE } from '@/constant/route'

import Tooltip from '@/widgets/Tooltip'
import Button from '@/widgets/Buttons/Button'
import FaqList from '@/widgets/FaqList'

import Header from './Header'
import CoverImage from './CoverImage'
import FeatureWall from './FeatureWall'
import UsersWall from './UsersWall'

import type { TStore } from './store'

import {
  Wrapper,
  Banner,
  Title,
  Desc,
  ButtonGroup,
  DemoPanel,
  DemoMenuItem,
  LinkIcon,
  DemoButton,
  Note,
  InfoIcon,
  Divider,
  FAQWrapper,
} from './styles'

import { useInit } from './logic'

type TProps = {
  landingPage?: TStore
}

const LandingPageContainer: FC<TProps> = ({ landingPage: store }) => {
  useInit(store)

  return (
    <Wrapper testid="landing-page">
      <Banner>
        <Header />
        <Title>让你的产品聆听用户的声音</Title>
        <Desc>
          讨论区，GTD 看板，更新日志，帮助文档多合一，收集沉淀用户反馈，助你打造更好的产品
        </Desc>
        <ButtonGroup>
          <Link href={`/${ROUTE.HOME}/${ROUTE.HELP}`}>
            <Button size="medium">开始使用</Button>
          </Link>

          <Tooltip
            content={
              <DemoPanel>
                <DemoMenuItem href={`/${ROUTE.HOME}`}>
                  官方社区
                  <LinkIcon />
                </DemoMenuItem>
                <DemoMenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.DASHBOARD}`}>
                  管理后台
                  <LinkIcon />{' '}
                </DemoMenuItem>
              </DemoPanel>
            }
            placement="bottom"
            trigger="click"
            offset={[1, 5]}
          >
            <DemoButton size="medium" ghost>
              在线体验
            </DemoButton>
          </Tooltip>
        </ButtonGroup>
        <Note>
          <InfoIcon />
          本站正在开发中，详情请联系 mydearxym@qq.com
        </Note>
      </Banner>

      <CoverImage />
      <Divider top={100} bottom={80} />
      <FeatureWall />

      <Divider top={60} bottom={80} />
      <UsersWall />

      <Divider top={60} bottom={80} />
      <FAQWrapper>
        <FaqList mode="flat" large />
      </FAQWrapper>
      <Divider top={60} bottom={50} />
    </Wrapper>
  )
}

export default bond(LandingPageContainer, 'landingPage') as FC<TProps>
