import { FC, useEffect, useState } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TActive } from '@/spec'
import { DesktopOnly, MobileOnly } from '@/widgets/Common'

import ChangelogDemo from './ChangelogDemo'

import { FEAT_TYPE } from '../../constant'
import BgDots from '../BgDots'

import {
  Wrapper,
  ImageWrapper,
  ColorBlock,
  ColorBlockHolder,
  IconsWrapper,
  Icon1,
  Icon2,
  Icon3,
} from '../../styles/feature_wall/changelog_feat/intro_image'

type TProps = TActive

const IntroImage: FC<TProps> = ({ $active }) => {
  const [loaded, setLoaded] = useState(false)

  const { isMobile } = useMobileDetect()

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Wrapper>
      <BgDots $active={$active} featType={FEAT_TYPE.CHANGELOG} />
      <ImageWrapper>
        <ChangelogDemo />
      </ImageWrapper>

      <DesktopOnly>
        {!loaded && <ColorBlockHolder />}

        {loaded && <ColorBlock $active={$active} />}
      </DesktopOnly>

      <MobileOnly>
        <ColorBlock />
      </MobileOnly>

      <DesktopOnly>
        <IconsWrapper>
          <Icon1 />
          <Icon2 />
          <Icon3 />
        </IconsWrapper>
      </DesktopOnly>
    </Wrapper>
  )
}

export default IntroImage
