import { FC, useEffect, useState } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TActive } from '@/spec'
import { DesktopOnly, MobileOnly } from '@/widgets/Common'

import { FEAT_TYPE } from '../../constant'
import BgDots from '../BgDots'

import DiscussDemo from './DiscussDemo'

import {
  Wrapper,
  ImageWrapper,
  ColorBlock,
  ColorBlockHolder,
  IconsWrapper,
  Icon1,
  Icon2,
  Icon3,
} from '../../styles/feature_wall/discuss_feat/intro_image'

type TProps = TActive

const IntroImage: FC<TProps> = ({ $active }) => {
  const { isMobile } = useMobileDetect()

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Wrapper>
      <BgDots $active={$active} featType={FEAT_TYPE.DISCUSS} />
      <ImageWrapper>
        <DiscussDemo />
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
