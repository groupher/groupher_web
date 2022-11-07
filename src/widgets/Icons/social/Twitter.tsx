import { memo, SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1260 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <path
        d="M1259.847 121.148c-46.525 20.729-96.274 34.548-148.326 40.536 53.434-31.784 94.431-82.454 113.778-142.798-50.21 29.481-105.486 51.131-164.448 62.647A257.585 257.585 0 0 0 872.45 0C729.652 0 614.032 115.62 614.032 258.42c0 20.268 2.303 40.075 6.91 58.961-215.12-11.055-405.363-113.777-532.96-269.934-22.11 38.233-35.008 82.454-35.008 129.9 0 89.825 45.603 168.594 115.16 215.118-42.38-1.382-81.994-12.897-117.003-32.244v3.224c0 125.294 88.903 229.398 207.287 253.351-21.65 5.989-44.681 9.213-68.174 9.213-16.583 0-32.705-1.842-48.828-4.606 32.706 102.722 128.518 177.346 241.375 179.649-88.443 69.096-199.917 110.553-321.065 110.553-20.729 0-41.458-1.382-61.726-3.685C114.24 981.161 250.127 1024 396.15 1024c475.379 0 735.179-393.846 735.179-735.18 0-11.055-.46-22.57-.922-33.626 51.131-36.851 94.892-82.454 129.44-134.046z"
        fill="#55ACEE"
      />
    </svg>
  )
}

export default memo(SVG)