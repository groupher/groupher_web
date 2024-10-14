import { memo, type SVGProps } from 'react'

const Heart = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      className="icon"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path d="M725.333 85.333a42.667 42.667 0 0 1 42.56 39.467L768 128v192a42.667 42.667 0 0 1-85.227 3.2l-.106-3.2V170.667h-512v682.666h256a42.667 42.667 0 0 1 42.56 39.467l.106 3.2a42.667 42.667 0 0 1-39.466 42.56l-3.2.107H128A42.667 42.667 0 0 1 85.44 899.2l-.107-3.2V128A42.667 42.667 0 0 1 124.8 85.44l3.2-.107h597.333zm-64 320C790.933 405.333 896 510.4 896 640c0 54.912-18.859 105.387-50.453 145.387l64.256 64.725a42.667 42.667 0 0 1-57.856 62.613l-2.71-2.496-67.989-68.48a233.579 233.579 0 0 1-119.915 32.918c-129.6 0-234.666-105.067-234.666-234.667s105.066-234.667 234.666-234.667zm0 85.334a149.333 149.333 0 1 0 0 298.666 149.333 149.333 0 0 0 0-298.666zM320 682.667a42.667 42.667 0 0 1 3.2 85.226L320 768h-42.667a42.667 42.667 0 0 1-3.2-85.227l3.2-.106H320zm42.667-213.334a42.667 42.667 0 0 1 3.2 85.227l-3.2.107h-85.334a42.667 42.667 0 0 1-3.2-85.227l3.2-.107h85.334zM533.333 256a42.667 42.667 0 0 1 3.2 85.227l-3.2.106h-256a42.667 42.667 0 0 1-3.2-85.226l3.2-.107h256z" />
    </svg>
  )
}

export default memo(Heart)
