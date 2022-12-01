import { memo, SVGProps } from 'react'

const Reject = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <path d="M512 938.667C276.352 938.667 85.333 747.648 85.333 512S276.352 85.333 512 85.333 938.667 276.352 938.667 512 747.648 938.667 512 938.667zm208.683-575.019a257.707 257.707 0 0 0-60.331-60.33L303.317 660.351a257.707 257.707 0 0 0 60.331 60.33l357.035-357.034z" />
    </svg>
  )
}

export default memo(Reject)
