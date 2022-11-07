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
      <path d="M608.236 944.24H535.69V597.433h72.546v346.809zm313.922-168.703c-19.338 29.01-49.464 43.381-90.501 43.381h-83.18v125.328h-72.535V597.437H834.56c33.582 0 59.97 9.943 79.037 29.707 19.206 19.758 28.739 46.837 28.739 81.387.138 24.31-6.63 46.69-20.178 67.006zM130.852 944.24V205.71a5.55 5.55 0 0 0-5.53-5.53h-56.51a5.545 5.545 0 0 1-5.529-5.524v-56.653a5.545 5.545 0 0 1 5.53-5.524H328.3a5.545 5.545 0 0 1 5.524 5.524v332.719l338.934-336.59c.967-.967 2.488-1.658 3.87-1.658h252.713c4.977 0 7.327 5.94 3.871 9.395l-802.36 802.37zm724.157-275.79c-9.948-7.326-26.25-11.053-48.916-11.053h-57.616v101.555h67.293c23.209 0 38.963-7.05 47.395-21.14 4.557-7.742 6.77-18.658 6.77-32.748 0-16.998-4.972-29.153-14.926-36.613zm0 0z" />
    </svg>
  )
}

export default memo(SVG)