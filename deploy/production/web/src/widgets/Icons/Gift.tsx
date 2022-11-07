import { memo, SVGProps } from 'react'

// for bonus usage
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
      <path d="M853.33 307.2H731.996c11.735-20.204 18.934-43.274 18.934-68.27 0-75.397-61.102-136.53-136.53-136.53-41.032 0-77.404 18.463-102.4 47.063-24.996-28.6-61.399-47.063-102.4-47.063-75.428 0-136.53 61.133-136.53 136.53 0 24.996 7.199 48.066 18.934 68.27H170.67c-37.54 0-68.27 30.73-68.27 68.26v68.27h819.2v-68.27c0-37.53-30.73-68.26-68.27-68.26zm-375.46 0H409.6c-37.632 0-68.27-30.597-68.27-68.27s30.638-68.27 68.27-68.27 68.27 30.597 68.27 68.27v68.27zm136.53 0h-68.27v-68.27c0-37.673 30.638-68.27 68.27-68.27s68.27 30.597 68.27 68.27-30.638 68.27-68.27 68.27zm-68.27 614.4h238.94c37.53 0 68.26-30.74 68.26-68.27V512h-307.2v409.6zm-375.46-68.27c0 37.53 30.73 68.27 68.26 68.27h238.94V512h-307.2v341.33z" />
    </svg>
  )
}

export default memo(SVG)
