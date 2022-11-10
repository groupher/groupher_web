import { FC } from 'react'

import type { TMetric } from '@/spec'
import { ICON, GITHUB, APP_VERSION, ABOUT_LINK } from '@/config'
import { bond } from '@/utils/mobx'
import { ROUTE } from '@/constant'

import type { TStore } from '../store'
import {
  Wrapper,
  SiteWrapper,
  Logo,
  SiteTitle,
  SiteInfoWrapper,
  Item,
  ItemIcon,
  Divider,
  VersionWrapper,
} from '../styles/mobile_view'
import { useInit } from '../logic'

type TProps = {
  footer?: TStore
  metric?: TMetric
}

const FooterContainer: FC<TProps> = ({ footer: store, metric }) => {
  useInit(store, metric)

  return (
    <Wrapper>
      <SiteWrapper>
        <Logo />
        <SiteTitle>oderPlanets</SiteTitle>
      </SiteWrapper>

      <SiteInfoWrapper>
        <Item href={`${ABOUT_LINK}`} passHref>
          关于
        </Item>
        <Divider space={8} radius={3} />
        <Item href="/feedback" passHref>
          建议反馈
        </Item>
        <Divider space={8} radius={3} />
        <Item href={`/${ROUTE.SPONSOR}`} passHref>
          特别感谢 <ItemIcon src={`${ICON}/emotion/heart.png`} />
        </Item>
        <Divider space={8} radius={3} />
        <Item href={GITHUB} target="_blank" passHref>
          Github
        </Item>
      </SiteInfoWrapper>
      <VersionWrapper>
        <Item as="span">{APP_VERSION}</Item>
      </VersionWrapper>
    </Wrapper>
  )
}

export default bond(FooterContainer, 'footer') as FC
