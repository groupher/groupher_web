import { memo, SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" {...props}>
      <path
        d="M250 250q222 3 150 150-81 133 150 150"
        markerEnd="url(#a)"
        transform="rotate(54 400 400)"
        strokeWidth={10}
        stroke="hsl(0, 0%, 75%)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0 17"
      />
      <defs>
        <marker
          markerWidth={4.5}
          markerHeight={4.5}
          refX={2.25}
          refY={2.25}
          viewBox="0 0 4.5 4.5"
          orient="auto"
          id="a"
        >
          <path fill="hsl(0, 0%, 75%)" d="M.9 4.5 0 2.25.9 0l3.6 2.25z" />
        </marker>
      </defs>
    </svg>
  )
}

export default memo(SVG)
