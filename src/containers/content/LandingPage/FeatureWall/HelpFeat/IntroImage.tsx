import { FC, useEffect, useState } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'
import { Parallax } from 'react-scroll-parallax'

import type { TActive } from '@/spec'
import { DesktopOnly, MobileOnly } from '@/widgets/Common'

import { FEAT_TYPE } from '../../constant'
import BgDots from '../BgDots'

import HelpDemo from './HelpDemo'

import {
  Wrapper,
  ImageWrapper,
  ColorBlock,
  ColorBlockHolder,
  IconsWrapper,
  Icon1,
  Icon2,
  Icon3,
} from '../../styles/feature_wall/help_feat/intro_image'

type TProps = TActive

const IntroImage: FC<TProps> = ({ $active }) => {
  const [loaded, setLoaded] = useState(false)

  const { isMobile } = useMobileDetect()

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Wrapper>
      <BgDots $active={$active} featType={FEAT_TYPE.HELP} />
      <ImageWrapper>
        <HelpDemo />
      </ImageWrapper>

      <DesktopOnly>
        {!loaded && <ColorBlockHolder />}

        {loaded && (
          <Parallax speed={15} rotate={[-2, 6]} translateY={[10, -10]} disabled={isMobile}>
            <ColorBlock $active={$active} />
          </Parallax>
        )}
      </DesktopOnly>

      <MobileOnly>
        <ColorBlock />
      </MobileOnly>

      <Parallax
        speed={15}
        rotate={[-4, 14]}
        translateY={[10, -10]}
        opacity={[1, 0.5]}
        disabled={isMobile}
      >
        <DesktopOnly>
          <IconsWrapper>
            <Icon1 />
            <Icon2 />
            <Icon3 />
          </IconsWrapper>
        </DesktopOnly>
      </Parallax>
    </Wrapper>
  )
}

export default IntroImage
