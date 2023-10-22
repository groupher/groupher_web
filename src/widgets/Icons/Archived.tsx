import { memo, SVGProps } from 'react'

const Archived = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      className="icon"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path d="M109.722 597.606h116.07c44.8 0 85.709 25.293 105.78 65.332 11.314 22.681 34.56 37.068 59.903 37.068h242.637c25.395 0 48.64-14.336 59.904-37.068a118.22 118.22 0 0 1 105.78-65.332h114.431L792.013 190.054a51.2 51.2 0 0 0-48.999-36.454H280.986a51.2 51.2 0 0 0-49.05 36.506l-122.214 407.5zm-7.322 51.2V819.2a51.2 51.2 0 0 0 51.2 51.2h716.8a51.2 51.2 0 0 0 51.2-51.2V648.806H799.846c-25.395 0-48.588 14.336-59.904 37.018a118.22 118.22 0 0 1-105.779 65.382H391.526a118.22 118.22 0 0 1-105.728-65.382 67.02 67.02 0 0 0-59.904-37.018H102.4zM280.986 102.4h462.028a102.4 102.4 0 0 1 98.1 72.96l123.033 410.266a204.8 204.8 0 0 1 8.653 58.88V819.2a102.4 102.4 0 0 1-102.4 102.4H153.6A102.4 102.4 0 0 1 51.2 819.2V644.454a204.8 204.8 0 0 1 8.653-58.88L182.886 175.36a102.4 102.4 0 0 1 98.1-72.96z" />
    </svg>
  )
}

export default memo(Archived)
