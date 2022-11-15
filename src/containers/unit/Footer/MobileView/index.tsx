import { FC } from 'react'

import type { TMetric } from '@/spec'
import { APP_VERSION, ABOUT_LINK } from '@/config'
import { bond } from '@/utils/mobx'

import type { TStore } from '../store'
import {
  Wrapper,
  SiteWrapper,
  Logo,
  SiteTitle,
  SiteInfoWrapper,
  Item,
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
      </SiteInfoWrapper>
      <VersionWrapper>
        <Item as="span">{APP_VERSION}</Item>
      </VersionWrapper>
    </Wrapper>
  )
}

export default bond(FooterContainer, 'footer') as FC
