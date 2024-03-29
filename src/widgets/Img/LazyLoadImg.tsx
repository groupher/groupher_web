import { FC, ReactNode, memo, useState } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'

import { Wrapper, LazyImageWrapper, FallbackWrapper } from './styles/lazy_load_image'

type TProps = {
  className?: string
  src: string
  alt?: string
  fallback?: ReactNode | null
  visibleByDefault?: boolean
  onClick?: () => void
  threshold?: number
}

/**
 * lazy load images like .jpg .jpeg .png  etc
 * the fallback is for the image offen block in china, like github avatars
 * fallback 常被用于图片间歇性被墙的情况，比如 github 头像等
 */
const LazyLoadImg: FC<TProps> = ({
  className = 'img-class',
  src,
  alt = 'image',
  fallback = null,
  visibleByDefault = true,
  onClick,
  threshold = 200,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <Wrapper onClick={onClick}>
      <FallbackWrapper>{!imgLoaded && fallback}</FallbackWrapper>
      <LazyImageWrapper>
        <LazyLoadImage
          className={className}
          src={src}
          alt={alt}
          // placeholder={fallback}
          effect="blur"
          visibleByDefault={visibleByDefault}
          onLoad={() => setImgLoaded(true)}
          // beforeLoad={() => setImgLoaded(true)}
          threshold={threshold}
        />
      </LazyImageWrapper>
    </Wrapper>
  )
}

export default memo(LazyLoadImg)
