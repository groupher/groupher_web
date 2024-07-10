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
      <path d="M767.855 991.726s-307.414-254.712-150.76-361.93c90.347-61.683 149.218 48.62 149.218 48.62s58.78-110.394 149.217-48.53c156.655 107.128-147.675 361.93-147.675 361.93zM497.722 64.313c135.974 0 246.095 112.752 246.095 251.718 0 139.149-110.212 251.81-246.276 251.81-135.973 0-246.185-112.752-246.185-251.81 0-139.057 110.212-251.809 246.185-251.809z" />
      <path d="M457.085 567.387c-119.737-.907-205.094 183.052-259.52 407.467-12.155 49.8-92.342-31.386-101.594 6.712C193.03 581.81 351.317 511.964 544.256 554.96c-22.314 2.721-87.08 12.518-87.08 12.518z" />
    </svg>
  )
}

export default memo(SVG)
