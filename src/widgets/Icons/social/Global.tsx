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
      <path d="M512 938.667a426.667 426.667 0 1 1 0-853.334 426.667 426.667 0 0 1 0 853.334zm-97.735-99.556a763.733 763.733 0 0 1-71.794-284.444h-169.13A341.675 341.675 0 0 0 414.32 839.11zm13.653-284.444C434.404 658.773 464.1 756.452 512 842.752a678.628 678.628 0 0 0 84.025-288.085H427.918zm422.742 0H681.529a763.733 763.733 0 0 1-71.85 284.444 341.675 341.675 0 0 0 240.98-284.444zm-677.32-85.334h169.131c5.348-98.588 29.753-195.129 71.85-284.444a341.675 341.675 0 0 0-241.037 284.444zm254.635 0h168.05A678.628 678.628 0 0 0 512 181.248a678.628 678.628 0 0 0-84.082 288.085h.057zM609.678 184.89a763.733 763.733 0 0 1 71.85 284.444H850.66A341.675 341.675 0 0 0 609.678 184.89z" />
    </svg>
  )
}

export default memo(SVG)
