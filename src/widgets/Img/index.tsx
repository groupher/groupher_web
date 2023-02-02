/*
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import { FC, ReactNode, memo } from 'react'
import { buildLog } from '@/utils/logger'

import SvgLoader from './SvgLoader'
import NormalImg from './NormalImg'
// import NextImg from './NextImg'
import LazyLoadImg from './LazyLoadImg'

/* eslint-disable-next-line */
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
    return (
      <SvgLoader
        src={src}
        beforeInjection={(svg) =>
          className.split(' ').map((singleClassName) => svg.classList.add(singleClassName))
        }
        onClick={onClick}
      />
    )
  }
  return (
    <>
      {noLazy ? (
        <NormalImg
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
