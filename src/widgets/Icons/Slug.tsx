import { memo, type SVGProps } from 'react'

const Slug = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 256 256" {...props}>
      <path d="M200 164a36.07 36.07 0 0 0-33.94 24H72a28 28 0 0 1 0-56h96a44 44 0 0 0 0-88H72a12 12 0 0 0 0 24h96a20 20 0 0 1 0 40H72a52 52 0 0 0 0 104h94.06A36 36 0 1 0 200 164Zm0 48a12 12 0 1 1 12-12 12 12 0 0 1-12 12Z" />
    </svg>
  )
}

export default memo(Slug)
