import { memo, type SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      className="icon"
      viewBox="0 0 1280 1024"
      {...props}
    >
      <path d="M1187.6 118.2H92.4c-51 0-92.4 41.4-92.4 92.2v603c0 51 41.4 92.4 92.4 92.4h1095.4c51 0 92.4-41.4 92.2-92.2V210.4c0-50.8-41.4-92.2-92.4-92.2zM677 721.2H554v-240L431 635 308 481.2v240H184.6V302.8h123l123 153.8 123-153.8h123v418.4zm270.6 6.2L763 512h123V302.8h123V512h123z" />
    </svg>
  )
}

export default memo(SVG)
