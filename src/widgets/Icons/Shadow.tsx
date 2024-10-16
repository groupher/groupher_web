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
      <path d="M736 96v191.872L928 288v640H288l-.128-192H96V96h640zM351.936 759.168 352 864l104.64-.064-104.704-104.768zM509.76 736h-90.496L547.2 863.936h90.496L509.76 736zm180.992 0h-90.496l127.936 127.936h90.496L690.752 736zM736 600.256v90.496l127.936 127.936v-90.496L736 600.256zM672 160H160v512h512V160zm64 259.264v90.496l127.936 127.936V547.2L736 419.264zm23.168-67.328L863.936 456.64 864 352l-104.832-.064z" />
    </svg>
  )
}

export default memo(SVG)
