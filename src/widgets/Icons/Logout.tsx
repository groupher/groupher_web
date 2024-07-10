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
      <path d="M809.3 613.9c-10.8 13.9-8.1 33.6 5.4 44.3 5.8 4.5 12.6 6.7 19.3 6.7 9.4 0 18.8-4 24.7-12.1l95-121.4c4-5.4 6.3-12.1 6.7-18.8v-1.8c0-6.7-2.2-13.4-6.7-18.8l-95-121.4c-10.8-13.9-30.5-16.1-44.4-5.4s-16.1 30.5-5.4 44.3l56 70.8H432.3c-17.5 0-31.4 14.3-31.4 31.4v.4c0 17.5 14.3 31.4 31.4 31.4h432.6l-55.6 70.4z" />
      <path d="M512.5 959.7c-60.5 0-119.2-11.6-174.4-35.4-53.3-22.4-101.3-55.1-142.6-95.9-41.2-41.1-73.5-89.1-95.9-142.4-23.3-55.1-35.4-113.8-35.4-174.2s11.7-119.1 35.4-174.2c22.4-53.3 55.1-101.2 95.9-142.4s89.2-73.5 142.6-95.9C393.3 76 452 63.9 512.5 63.9c95.9 0 187.8 30 264.9 86.5 13.9 10.3 17 30 6.7 43.9s-30 17-43.9 6.7c-66.3-48.8-145.2-74.4-227.7-74.4-52 0-102.7 10.3-150.2 30.5-45.7 19.3-87 47-122.4 82.4s-63.2 76.6-82.5 122.3c-20.2 47.5-30 97.6-30 149.6s10.3 102.6 30.5 150.1c19.3 45.7 47.1 86.9 82.5 122.3 35.4 35.4 76.7 63.2 122.4 82.4 47.5 20.2 97.7 30 149.7 30 82.5 0 161.4-25.5 227.7-74.4 13.9-10.3 33.6-7.2 43.9 6.7 10.3 13.9 7.2 33.6-6.7 43.9-77.1 57.3-169 87.3-264.9 87.3z" />
    </svg>
  )
}

export default memo(SVG)
