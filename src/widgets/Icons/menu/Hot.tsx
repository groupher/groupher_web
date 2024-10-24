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
      <path d="M745.052 311.434c22.776 122.99-50.112 218.644-50.112 218.644C758.72 325.09 508.18 65.465 407.967 42.667c122.968 314.32-13.668 405.37-13.668 405.37 13.668-159.435-91.116-186.76-91.116-186.76 59.22 127.55-50.046 163.983-95.643 309.76-59.176 350.764 350.742 514.792 569.397 236.916 159.434-218.677-31.885-496.52-31.885-496.52zm0 0" />
      <path
        d="M553.733 475.417c127.539 195.878 95.643 314.308 27.325 359.861-54.66 36.478-104.773 36.478-150.315-13.657-31.895-41.004-27.336-77.437-9.119-109.333 22.776-50.101 145.777-141.24 132.11-236.882zm0 0"
        opacity={0.3}
      />
    </svg>
  )
}

export default memo(SVG)
