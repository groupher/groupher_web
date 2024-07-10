import { memo, type SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 256 256" {...props}>
      <path d="M120 40v-8a8 8 0 0116 0v8a8 8 0 01-16 0zm72 88a64 64 0 11-64-64 64.07 64.07 0 0164 64zm-16 0a48 48 0 10-48 48 48.05 48.05 0 0048-48zM58.34 69.66a8 8 0 0011.32-11.32l-8-8a8 8 0 00-11.32 11.32zm0 116.68l-8 8a8 8 0 0011.32 11.32l8-8a8 8 0 00-11.32-11.32zM192 72a8 8 0 005.66-2.34l8-8a8 8 0 00-11.32-11.32l-8 8A8 8 0 00192 72zm5.66 114.34a8 8 0 00-11.32 11.32l8 8a8 8 0 0011.32-11.32zM40 120h-8a8 8 0 000 16h8a8 8 0 000-16zm88 88a8 8 0 00-8 8v8a8 8 0 0016 0v-8a8 8 0 00-8-8zm96-88h-8a8 8 0 000 16h8a8 8 0 000-16z" />
    </svg>
  )
}

export default memo(SVG)
