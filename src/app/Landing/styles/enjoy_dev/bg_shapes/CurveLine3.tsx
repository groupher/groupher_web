import { memo, SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" {...props}>
      <path
        d="M494.619 19.73c-16.144 6.13-78.326-8.968-96.861 36.772-18.535 45.74 3.139 184.604-14.35 237.668-17.489 53.065-75.486 67.265-90.583 80.718"
        fill="none"
        strokeWidth={3}
        stroke='url("#cl-3")'
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="cl-3">
          <stop stopColor="#EAECF6" offset={0} />
          <stop stopColor="#4A6DB0" offset={1} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default memo(SVG)
