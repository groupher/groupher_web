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
      <path d="M213.333 768V256H128v512h85.333zm597.334-512v512H896V256h-85.333zM256 213.333h341.333V128H256v85.333zm341.333 0H768V128H597.333v85.333zM768 810.667H597.333V896H768v-85.333zm-170.667 0H256V896h341.333v-85.333zm-42.666-640v682.666H640V170.667h-85.333zM128 768a128 128 0 0 0 128 128v-85.333A42.667 42.667 0 0 1 213.333 768H128zm682.667 0A42.667 42.667 0 0 1 768 810.667V896a128 128 0 0 0 128-128h-85.333zM896 256a128 128 0 0 0-128-128v85.333A42.667 42.667 0 0 1 810.667 256H896zm-682.667 0A42.667 42.667 0 0 1 256 213.333V128a128 128 0 0 0-128 128h85.333z" />
    </svg>
  )
}

export default memo(SVG)
