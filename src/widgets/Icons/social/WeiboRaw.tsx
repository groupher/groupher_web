import { memo, type SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      className="icon"
      viewBox="0 0 1102 1024"
      {...props}
    >
      <path d="M922.073 681.905c-7.72 91.53-60.259 174.159-146.747 232.527-81.763 55.296-189.677 85.386-304.05 85.386-242.688 0-436.145-143.675-436.066-333.745l.394-4.254C51.673 512.63 177.23 345.01 329.255 268.13a255.37 255.37 0 0 1 112.325-27.726c26.782 0 52.54 4.962 76.8 14.73 49.625 20.007 69.317 53.248 77.746 104.999l3.938-.945c37.494-8.429 55.847-11.5 78.77-11.5 25.205 0 47.576 5.12 67.74 15.753l5.12 2.993 2.443 1.812c48.049 35.683 59.47 76.958 55.374 136.98 83.102 38.44 120.36 83.259 112.64 176.68zM748.78 520.901l.552-5.041c5.356-50.255 0-77.588-29.933-99.88l1.26.552-1.89-.946a83.495 83.495 0 0 0-39.936-8.822c-17.093 0-32.61 2.6-65.93 10.162a551.306 551.306 0 0 1-37.809 7.64 29.538 29.538 0 0 1-34.028-26.781l-.473-5.12c-4.253-47.34-13.863-70.499-44.347-82.708a145.487 145.487 0 0 0-54.666-10.476c-27.726 0-56.635 7.246-86.094 21.582-134.46 67.9-247.336 218.664-261.12 346.112l-.158 1.024c0 150.843 163.84 272.542 377.068 272.542 103.03 0 199.444-26.94 270.966-75.303 72.31-48.759 114.846-115.555 120.99-188.495 5.671-67.9-20.322-94.13-96.414-126.031a29.538 29.538 0 0 1-18.038-30.011zm177.231-158.563a29.538 29.538 0 1 1-59.077 0c0-45.292-37.258-82.313-83.023-82.313a29.538 29.538 0 0 1 0-59.077c78.297 0 142.1 63.409 142.1 141.39z" />
      <path d="M1078.902 362.969a29.538 29.538 0 1 1-59.077 0c0-130.521-109.804-237.096-245.208-237.096a29.538 29.538 0 0 1 0-59.077c167.62 0 304.285 132.569 304.285 296.173zm-574.858 99.328c119.336 0 216.38 61.125 238.829 155.096 14.257 60.18-4.175 122.88-50.57 175.734-42.063 47.813-103.188 82.866-172.584 99.486a365.332 365.332 0 0 1-84.519 10.004c-119.335 0-216.38-61.125-238.828-155.018-14.336-60.259 4.174-123.038 50.648-175.656 41.984-47.891 103.188-83.101 172.505-99.564a365.962 365.962 0 0 1 84.598-10.082zm0 59.077c-23.315 0-47.182 2.835-70.892 8.428-57.66 13.784-108.15 42.772-141.785 81.132-34.343 38.99-47.182 82.393-37.494 122.959 15.36 64.433 87.119 109.725 181.327 109.725 23.473 0 47.262-2.835 70.814-8.428 57.816-13.863 108.228-42.772 141.863-81.053 34.343-39.07 47.183-82.55 37.494-123.038-15.36-64.59-87.119-109.804-181.327-109.804z" />
      <path d="M437.17 673.87a54.35 54.35 0 0 0-21.82 4.727 51.751 51.751 0 0 0-25.679 24.497 41.748 41.748 0 0 0-.787 35.131 43.008 43.008 0 0 0 40.33 24.576 53.8 53.8 0 0 0 47.419-29.302 41.433 41.433 0 0 0 .945-35.052 43.166 43.166 0 0 0-40.409-24.576" />
    </svg>
  )
}

export default memo(SVG)
