import { memo, type SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <path d="M924.402 1023.068H.68V99.345H462.54v98.91H99.597V924.15h725.896V561.207h98.91z" />
      <path d="m930.805 22.977 69.966 69.966-453.493 453.492-69.965-69.901z" />
      <path d="M1022.464 304.03h-98.917V99.345H709.231V.428h313.233z" />
    </svg>
  )
}

export default memo(SVG)
