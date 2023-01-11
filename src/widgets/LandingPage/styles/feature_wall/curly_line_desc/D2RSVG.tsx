import { memo, SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" {...props}>
      <path
        d="M212.5 212.219q191-47 187.5 187.5-18.5 236.5 187.5 187.5"
        markerEnd="url(#a)"
        transform="rotate(68 397.035 402)"
        strokeWidth={8}
        stroke="hsl(0, 0%, 75%)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="8 24"
      />
      <defs>
        <marker
          markerWidth={5}
          markerHeight={5}
          refX={2.5}
          refY={2.5}
          viewBox="0 0 5 5"
          orient="auto"
          id="a"
        >
          <path fill="hsl(0, 0%, 75%)" d="m0 5 1.667-2.5L0 0l5 2.5z" />
        </marker>
      </defs>
    </svg>
  )
}

export default memo(SVG)
