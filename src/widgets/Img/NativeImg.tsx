import { type FC, memo, useState, useEffect, useRef, useCallback, type ReactNode } from 'react'

import { Image } from './styles'

type TProps = {
  className?: string
  src: string
  alt?: string
  fallback?: ReactNode | null
  onClick: () => void
}

/**
 * normal image like .jpg .jpeg .png  etc
 * the fallback is for the image offen block in china, like github avatars
 * fallback 常被用于图片间歇性被墙的情况，比如 github 头像等
 */
const NativeImg: FC<TProps> = ({
  className = 'img-class',
  src,
  alt = 'image',
  fallback = null,
  onClick,
}) => {
  const ref = useRef(null)
  const [loadCheck, setLoadCheck] = useState(true)
  const [loadCheck2, setLoadCheck2] = useState(true)

  useEffect(() => {
    const image = ref.current
    if (image?.complete) {
      image.naturalWidth === 0 ? setLoadCheck(false) : setLoadCheck(true)
    }
  }, [])

  const handleOnLoad = useCallback(() => setLoadCheck2(true), [])
  const handleOnError = useCallback(() => {
    setLoadCheck(false)
    setLoadCheck2(false)
  }, [])

  const loaded = loadCheck && loadCheck2

  return (
    <>
      <Image
        $loaded={!fallback || (fallback && loaded)}
        ref={ref}
        className={className}
        src={src}
        alt={alt}
        onClick={onClick}
        loading="eager"
        onLoad={() => handleOnLoad()}
        onError={() => handleOnError()}
      />
      {fallback && !loaded && fallback}
    </>
  )
}

export default memo(NativeImg)
