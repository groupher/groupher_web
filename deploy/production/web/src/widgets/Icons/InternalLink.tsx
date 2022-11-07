import { memo, SVGProps } from 'react'

const InternalLink = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="prefix__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <path d="M663.368 484.7L469.627 641.556a61.972 61.972 0 01-87.183-87.162L539.32 360.632a55.788 55.788 0 00-3.932-74.547l-84.869-84.89c-13.394-13.393-12.902-35.655 1.167-49.704a36.905 36.905 0 0124.228-10.855l372.409-17.695a49.869 49.869 0 0152.736 52.736l-17.716 372.409a37.192 37.192 0 01-36.782 35.123c-9.01 0-17.53-3.482-23.757-9.728l-84.869-84.87a55.788 55.788 0 00-74.547-3.91zM299.15 781.926l502.375 34.653a40.96 40.96 0 0138.154 40.857v2.724a40.96 40.96 0 01-40.96 40.96H245.76a122.88 122.88 0 01-122.88-122.88V225.28a40.96 40.96 0 0140.96-40.96h2.724a40.96 40.96 0 0140.857 38.134l34.653 502.395a61.44 61.44 0 0057.077 57.077z" />
    </svg>
  )
}

export default memo(InternalLink)
