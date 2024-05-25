/*
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import { type FC, type ReactNode, memo } from 'react'
import { buildLog } from '@/logger'

import NativeImg from './NativeImg'
import LazyLoadImg from './LazyLoadImg'

const log = buildLog('w:Img')

type IProps = {
  src: string
  alt?: string
  className?: string
  fallback?: ReactNode | null
  noLazy?: boolean
  // see https://www.npmjs.com/package/react-lazy-load-image-component
  visibleByDefault?: boolean
  onClick?: () => void
}

const Img: FC<IProps> = ({
  className = 'img-class',
  src,
  alt = 'img',
  fallback = null,
  noLazy = false,
  visibleByDefault = true,
  onClick = log,
}) => {
  if (/\.(svg)$/i.test(src)) {
    // see solution in:
    // https://github.com/tanem/react-svg/issues/676#issuecomment-589639104
    return <>SVG TODO</>
  }
  return (
    <>
      {noLazy ? (
        <NativeImg
          className={className}
          src={src}
          alt={alt}
          fallback={fallback}
          onClick={onClick}
        />
      ) : (
        // <NextImg className={className} src={src} alt={alt} fallback={fallback} />
        <LazyLoadImg
          className={className}
          src={src}
          alt={alt}
          fallback={fallback}
          visibleByDefault={visibleByDefault}
          onClick={onClick}
        />
      )}
    </>
  )
}

export default memo(Img)
