/*
 *
 * LandingPage
 *
 */

import { FC, memo } from 'react'
import Link from 'next/link'

import { ROUTE } from '@/constant/route'
import { buildLog } from '@/utils/logger'

import Button from '@/widgets/Buttons/Button'

import { SpaceGrow } from '@/widgets/Common'
import { Wrapper, Banner, Title, Desc, Note, InfoIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:LandingPage:index')

type TProps = {
  testid?: string
}

const LandingPage: FC<TProps> = ({ testid = 'landing-page' }) => {
  return (
    <Wrapper testid={testid}>
      <Banner>
        <Title>让你的产品聆听用户的声音</Title>
        <Desc>
          互动讨论，GTD 看板，更新日志，帮助文档多合一，收集整理用户用户反馈，助你打造更好的产品
        </Desc>
        <Link href={`/${ROUTE.HOME}`}>
          <Button size="medium" top={30}>
            查看示例
          </Button>
        </Link>
        <Note>
          <InfoIcon />
          本站正在开发中，详情请联系 mydearxym@qq.com
        </Note>
      </Banner>

      <SpaceGrow />
    </Wrapper>
  )
}

export default memo(LandingPage)
