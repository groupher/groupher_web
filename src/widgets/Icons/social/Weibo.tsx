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
      <path
        d="M676.16 232.48s113.28-12 161.44 58.24 27.36 158.56 27.36 158.56a21.92 21.92 0 0 0 22.56 26.08h11.2A30.4 30.4 0 0 0 928 449.12s26.08-138.56-54.4-215.68c-62.72-60.32-148.64-66.88-183.04-66.88h-15.2a27.04 27.04 0 0 0-26.4 26.88v13.12a25.6 25.6 0 0 0 27.2 25.92zm-223.04 525.6c79.04-16 132.48-81.92 119.52-148.64-11.2-57.44-67.84-96-133.76-96a163.52 163.52 0 0 0-32 3.2c-79.04 16-132.48 81.92-119.52 148.64s86.88 108.16 165.76 92.8zm2.24-171.68A24.64 24.64 0 1 1 432 611.04a24.48 24.48 0 0 1 23.36-24.64zM368 624.96c24.32-11.36 51.04-5.6 59.52 12.96S424 680.64 400 692a60.96 60.96 0 0 1-25.12 5.76 36 36 0 0 1-34.4-18.88c-8.96-18.4 3.68-42.56 27.52-53.92z"
        fill="#F56467"
      />
      <path
        d="M467.52 857.44c208 0 374.4-110.24 374.4-246.4 0-114.88-141.76-114.88-141.76-122.4s70.72-74.08 0-115.68c-42.24-24.96-105.6-12.16-148.8 0a330.24 330.24 0 0 1-47.04 14.4c55.68-97.12-23.68-128-64-128-96 0-348.64 214.88-348.64 350.88s168.16 247.2 375.84 247.2zm-34.4-392.64c132.64-18.72 250.24 37.28 262.56 124.8s-85.28 173.76-218.08 192a365.28 365.28 0 0 1-50.72 3.52c-110.72 0-200.96-52.16-211.68-128-12.32-87.52 85.28-173.76 217.92-192.32z"
        fill="#F56467"
      />
      <path
        d="M780.64 444.16h16a21.44 21.44 0 0 0 20.64-17.44s18.88-73.12-24.96-113.12a111.04 111.04 0 0 0-75.84-28.16A108.32 108.32 0 0 0 691.2 288a21.12 21.12 0 0 0-17.44 20.16v6.88a16 16 0 0 0 17.92 16.8s48-6.56 71.36 21.6 5.12 73.76 5.12 73.76a12.32 12.32 0 0 0 12.48 16.96z"
        fill="#F56467"
      />
    </svg>
  )
}

export default memo(SVG)
