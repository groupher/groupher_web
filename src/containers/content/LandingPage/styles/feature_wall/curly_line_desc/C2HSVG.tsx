import { memo, SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" {...props}>
      <path
        d="M409.417 12.556c-13.154 19.283-77.28 69.955-78.924 115.695-1.644 45.74 70.254 115.695 69.059 158.745-1.196 43.049-63.528 82.96-76.234 99.551"
        fill="none"
        strokeWidth={2}
        stroke='url("#c2h")'
        strokeLinecap="round"
        transform="scale(1.23542 -1.23542) rotate(-40 -151.452 77.34)"
        strokeDasharray="6 9"
      />
      <defs>
        <linearGradient id="c2h" gradientTransform="rotate(257 .5 .5)">
          <stop stopColor="#F5716E" offset={0} />
          <stop stopColor="#6EB6B6" offset={1} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default memo(SVG)
