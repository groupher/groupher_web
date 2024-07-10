import { memo, type SVGProps } from 'react'

const QR = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <path d="M213.333 341.333a42.667 42.667 0 1 1-85.333 0v-128A85.333 85.333 0 0 1 213.333 128h128a42.667 42.667 0 1 1 0 85.333h-128v128zm597.334 0v-128h-128a42.667 42.667 0 0 1 0-85.333h128A85.333 85.333 0 0 1 896 213.333v128a42.667 42.667 0 0 1-85.333 0zM213.333 682.667v128h128a42.667 42.667 0 0 1 0 85.333h-128A85.333 85.333 0 0 1 128 810.667v-128a42.667 42.667 0 0 1 85.333 0zm597.334 0a42.667 42.667 0 0 1 85.333 0v128A85.333 85.333 0 0 1 810.667 896h-128a42.667 42.667 0 0 1 0-85.333h128v-128zm-640-213.334h682.666a42.667 42.667 0 0 1 0 85.334H170.667a42.667 42.667 0 0 1 0-85.334z" />
    </svg>
  )
}

export default memo(QR)
