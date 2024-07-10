import { memo, type SVGProps } from 'react'

const Emotion = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <path d="M528.896 808.405c13.397-1.578 25.77 8.491 25.77 21.974v42.368a20.565 20.565 0 0 1-18.047 20.693A405.333 405.333 0 1 1 893.44 536.619a20.565 20.565 0 0 1-20.693 18.048h-42.368c-13.483 0-23.552-12.374-21.974-25.771A320 320 0 1 0 528.94 808.363z" />
      <path d="M746.667 917.333V832h-85.334A21.333 21.333 0 0 1 640 810.667V768a21.333 21.333 0 0 1 21.333-21.333h85.334v-85.334A21.333 21.333 0 0 1 768 640h42.667A21.333 21.333 0 0 1 832 661.333v85.334h85.333A21.333 21.333 0 0 1 938.667 768v42.667A21.333 21.333 0 0 1 917.333 832H832v85.333a21.333 21.333 0 0 1-21.333 21.334H768a21.333 21.333 0 0 1-21.333-21.334zm-330.24-314.88a36.267 36.267 0 0 0-64.854 32.427c28.331 56.661 84.694 84.053 139.094 84.053 54.4 0 110.762-27.392 139.093-84.053a36.267 36.267 0 0 0-64.853-32.427C550.57 631.125 521.6 646.4 490.667 646.4c-30.934 0-59.904-15.275-74.24-43.947zM396.8 433.067a49.067 49.067 0 1 1-98.133 0 49.067 49.067 0 0 1 98.133 0zm236.8 49.066a49.067 49.067 0 1 0 0-98.133 49.067 49.067 0 0 0 0 98.133z" />
    </svg>
  )
}

export default memo(Emotion)
