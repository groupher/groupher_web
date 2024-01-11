import { memo, SVGProps } from 'react'

const HashTag = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 256 256" {...props}>
      <path d="M229.26 90.4a108 108 0 0 1-177.63 114A108 108 0 0 1 195.41 43.63l20.1-20.11a12 12 0 0 1 17 17l-96 96a12 12 0 1 1-17-17l24-24a36 36 0 1 0 19.76 39.65 12 12 0 0 1 23.53 4.74 60 60 0 1 1-25.73-62l17.23-17.17a84 84 0 1 0 28.46 38 12 12 0 1 1 22.5-8.35Z" />
    </svg>
  )
}

export default memo(HashTag)
