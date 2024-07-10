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
      <path d="M811.429 73.143q13.142 0 25.142 5.143 18.858 7.428 30 23.428t11.143 35.429v736.571q0 19.429-11.143 35.429t-30 23.428q-10.857 4.572-25.142 4.572-27.429 0-47.429-18.286L512 676.571 260 918.857q-20.571 18.857-47.429 18.857-13.142 0-25.142-5.143-18.858-7.428-30-23.428t-11.143-35.429V137.143q0-19.429 11.143-35.429t30-23.428q12-5.143 25.142-5.143H811.43z" />
    </svg>
  )
}

export default memo(SVG)
