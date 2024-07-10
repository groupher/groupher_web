import { memo, type SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 256 256" {...props}>
      <path d="M233.54 142.23a8 8 0 00-8-2 88.08 88.08 0 01-109.8-109.8 8 8 0 00-10-10 104.84 104.84 0 00-52.91 37A104 104 0 00136 224a103.09 103.09 0 0062.52-20.88 104.84 104.84 0 0037-52.91 8 8 0 00-1.98-7.98zm-44.64 48.11A88 88 0 0165.66 67.11a89 89 0 0131.4-26A106 106 0 0096 56a104.11 104.11 0 00104 104 106 106 0 0014.92-1.06 89 89 0 01-26.02 31.4z" />
    </svg>
  )
}

export default memo(SVG)
