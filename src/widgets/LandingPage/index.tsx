/*
 *
 * LandingPage
 *
 */

import { FC, memo } from 'react'
import Link from 'next/link'

import { ROUTE } from '@/constant/route'
import { buildLog } from '@/utils/logger'

import Tooltip from '@/widgets/Tooltip'
import Button from '@/widgets/Buttons/Button'
import { SpaceGrow } from '@/widgets/Common'

import Header from './Header'

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
  CoverImage,
} from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:LandingPage:index')

type TProps = {
  testid?: string
}

const LandingPage: FC<TProps> = ({ testid = 'landing-page' }) => {
  return (
    <Wrapper testid={testid}>
      <Banner>
        <Header />
        <Title>让你的产品聆听用户的声音</Title>
        <Desc>讨论区，GTD 看板，更新日志，帮助文档多合一，收集沉淀用户反馈，打造更好的产品</Desc>
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
              查看 Demo
            </DemoButton>
          </Tooltip>
        </ButtonGroup>
        <Note>
          <InfoIcon />
          本站正在开发中，详情请联系 mydearxym@qq.com
        </Note>
      </Banner>

      <CoverImage src="/landing-demo.png" />

      <SpaceGrow />
    </Wrapper>
  )
}

export default memo(LandingPage)
