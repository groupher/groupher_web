import { memo, SVGProps } from 'react'

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
      <path d="M385.28 398.72c-19.84 1.92-32.64 21.12-27.52 40.32 3.84 14.72 17.92 24.96 33.28 23.68 47.36-4.48 94.72 12.16 128.64 46.08 33.92 33.92 50.56 81.92 46.08 128.64-1.28 15.36 8.96 29.44 23.68 33.28 19.2 5.12 38.4-7.68 40.32-27.52 6.4-65.92-16.64-132.48-64.64-179.84-48-47.36-113.92-71.04-179.84-64.64z" />
      <path d="M700.8 327.68c-96.64-96.64-234.88-138.88-368-115.2-18.56 3.2-30.08 21.76-24.96 39.68 4.48 16 20.48 26.24 36.48 23.04 112.64-19.84 229.76 16 311.68 97.28 81.92 81.92 117.76 199.04 97.28 311.68-3.2 16.64 7.04 32 23.04 36.48 17.92 5.12 36.48-7.04 39.68-24.96 23.68-133.12-18.56-271.36-115.2-368zM320 581.12c-65.28 0-118.4 53.12-118.4 118.4s53.12 118.4 118.4 118.4 118.4-53.12 118.4-118.4-53.12-118.4-118.4-118.4zm0 172.8c-30.08 0-54.4-24.32-54.4-54.4s24.32-54.4 54.4-54.4 54.4 24.32 54.4 54.4-24.32 54.4-54.4 54.4z" />
    </svg>
  )
}

export default memo(SVG)
