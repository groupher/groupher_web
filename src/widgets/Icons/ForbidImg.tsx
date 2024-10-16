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
      <path d="m779.264 51.2-76.8 76.8H204.8a128 128 0 0 0-128 128v497.664l-69.12 69.12A204.8 204.8 0 0 1 0 768V256A204.8 204.8 0 0 1 204.8 51.2zm219.648 105.984A204.8 204.8 0 0 1 1024 256v512a204.8 204.8 0 0 1-204.8 204.8H184.32l75.776-76.8H819.2a128 128 0 0 0 128-128V256a128 128 0 0 0-6.656-40.448z" />
      <path d="M675.328 476.672 834.56 638.976a38.4 38.4 0 0 1-54.784 53.76l-158.72-161.792zm-153.6 153.6a38.4 38.4 0 0 1-54.272 54.272zm-355.84 29.696a38.4 38.4 0 0 1 11.264-30.208l108.544-108.544a89.088 89.088 0 0 1 43.008-24.064zM27.136 911.872 911.872 27.136a38.4 38.4 0 0 1 54.272 54.272L81.408 966.144a38.4 38.4 0 0 1-54.272-54.272z" />
    </svg>
  )
}

export default memo(SVG)
