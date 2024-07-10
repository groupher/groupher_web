import { memo, type SVGProps } from 'react'

const Star = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 256 256" {...props}>
      <path d="M224 64a32 32 0 1 0-40 31v9a16 16 0 0 1-16 16H88a16 16 0 0 1-16-16v-9a32 32 0 1 0-16 0v9a32 32 0 0 0 32 32h32v25a32 32 0 1 0 16 0v-25h32a32 32 0 0 0 32-32v-9a32.06 32.06 0 0 0 24-31ZM48 64a16 16 0 1 1 16 16 16 16 0 0 1-16-16Zm96 128a16 16 0 1 1-16-16 16 16 0 0 1 16 16Zm48-112a16 16 0 1 1 16-16 16 16 0 0 1-16 16Z" />
    </svg>
  )
}

export default memo(Star)
