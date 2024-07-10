import { memo, type SVGProps } from 'react'

const UserBadge = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="prefix__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <path d="M885.902 533.703c16.782-22.187 26.112-49.408 26.112-77.71 0-44.885-25.116-87.41-65.507-111.104a67.698 67.698 0 00-34.304-9.301H572.416l5.973-122.88a107.036 107.036 0 00-29.497-79.417 106.638 106.638 0 00-77.88-33.394 116.252 116.252 0 00-111.787 85.106l-85.902 310.983h-.313v428.003H745.3c9.188 0 18.205-1.792 26.51-5.404a128.569 128.569 0 0072.904-155.392 128.683 128.683 0 0020.679-114.688c16.782-22.187 26.112-49.408 26.112-77.71a136.533 136.533 0 00-5.604-37.092zm-773.888-5.689V891.99c0 17.693 14.28 32 31.972 32h65.024V495.986h-64.996c-17.72 0-32 14.307-32 32z" />
    </svg>
  )
}

export default memo(UserBadge)
