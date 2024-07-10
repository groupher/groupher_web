import { memo, type SVGProps } from 'react'

const User = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="prefix__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <defs>
        <style />
      </defs>
      <path d="M316.735 445.651a279.965 279.965 0 0089.589 56.846 290.424 290.424 0 00211.295 0 278.941 278.941 0 0089.589-56.846 263.309 263.309 0 0059.915-84.7 247.904 247.904 0 000-199.869 263.138 263.138 0 00-59.858-84.7 279.965 279.965 0 00-89.589-56.845 295.881 295.881 0 00-211.352 0 279.965 279.965 0 00-89.589 56.845 263.138 263.138 0 00-59.858 84.7 247.904 247.904 0 000 199.87 262.229 262.229 0 0059.858 84.7zM733.3 582.081H290.7a221.13 221.13 0 100 441.577h442.6a221.186 221.186 0 100-441.634zm0 0" />
    </svg>
  )
}

export default memo(User)
