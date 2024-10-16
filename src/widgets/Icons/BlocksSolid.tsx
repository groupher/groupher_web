import { memo, type SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      className="icon"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path d="M384 672c53.02 0 96 42.98 96 96v96c0 53.02-42.98 96-96 96H160c-53.02 0-96-42.98-96-96v-96c0-53.02 42.98-96 96-96h224zm480-256c53.02 0 96 42.98 96 96v352c0 53.02-42.98 96-96 96H640c-53.02 0-96-42.98-96-96V512c0-53.02 42.98-96 96-96h224zM384 64c53.02 0 96 42.98 96 96v352c0 53.02-42.98 96-96 96H160c-53.02 0-96-42.98-96-96V160c0-53.02 42.98-96 96-96h224zm480 0c53.02 0 96 42.98 96 96v96c0 53.02-42.98 96-96 96H640c-53.02 0-96-42.98-96-96v-96c0-53.02 42.98-96 96-96h224z" />
    </svg>
  )
}

export default memo(SVG)
