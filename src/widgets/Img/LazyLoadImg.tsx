import { FC, ReactNode, memo, useState, useCallback } from 'react'
import { pick } from 'ramda'

import { LazyLoadImage } from 'react-lazy-load-image-component'

import {
  NormalWrapper,
  FallbackOffsetWrapper,
  LazyImageWrapper,
  FallbackWrapper,
  CheckPixel,
} from './styles/lazy_load_image'

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
  const [imgLoaded, setImgLoaded] = useState(true)
  const [checkError, setCheckError] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [over, setOver] = useState(false)

  // @ts-ignore
  const fallbackOpt = pick(['size', 'left', 'right', 'top', 'bottom'], fallback?.props || {})
  const Wrapper = !imgLoaded ? FallbackOffsetWrapper : NormalWrapper

  const handleBeforeLoad = useCallback(() => {
    if (!over) {
      // console.log('## handleBeforeLoad')
      setImgLoaded(false)
      setCheckError(true)
    }
  }, [over])

  const handleLoad = useCallback(() => {
    if (!over) {
      setImgLoaded(true)
      setLoadError(false)
      setCheckError(false)
      setOver(true)
    }
  }, [])

  const handleError = useCallback(() => {
    console.error('## lazy image load.: ', src)
    setLoadError(true)
    setImgLoaded(false)
    setOver(true)
  }, [])

  if (!src) {
    return (
      <Wrapper key={src} onClick={onClick} {...fallbackOpt}>
        <FallbackWrapper>{fallback}</FallbackWrapper>
      </Wrapper>
    )
  }
  /**
   * CheckPixel is a workaround for lazy loading has no onError callback,
   * for most OSS providers the cache control is lager than 5 mins
   * so on before load callback, we aetup a real img to track is onError mannually triggered
   */
  return (
    <Wrapper onClick={onClick} {...fallbackOpt}>
      {!imgLoaded && <FallbackWrapper>{fallback}</FallbackWrapper>}

      <LazyImageWrapper>
        {checkError && <CheckPixel src={src} alt="" onLoad={handleLoad} onError={handleError} />}

        {!loadError && (
          <LazyLoadImage
            className={className}
            src={src}
            alt={alt}
            effect="blur"
            visibleByDefault={visibleByDefault}
            onLoad={handleLoad}
            beforeLoad={handleBeforeLoad}
            threshold={threshold}
          />
        )}
      </LazyImageWrapper>
    </Wrapper>
  )
}

export default memo(LazyLoadImg)
