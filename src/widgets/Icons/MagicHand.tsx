import { memo, type SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      height={200}
      width={200}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-51.2 -51.2 614.4 614.4"
      xmlSpace="preserve"
      stroke="#000"
      strokeWidth={0.005}
      {...props}
    >
      <path d="m454.32 219.727-38.766-51.947 20.815-61.385a16.735 16.735 0 0 0-21.223-21.223l-61.384 20.815-51.949-38.766a16.736 16.736 0 0 0-26.741 13.626l.829 64.815-52.923 37.426a16.736 16.736 0 0 0 4.694 29.645l43.843 13.629-257.072 257.07c-6.535 6.534-6.535 17.131 0 23.666s17.131 6.535 23.666 0l257.072-257.073 13.629 43.844a16.735 16.735 0 0 0 29.645 4.695l37.426-52.923 64.815.828.214.001a16.736 16.736 0 0 0 13.41-26.743zm-86.81-7.664a16.703 16.703 0 0 0-13.876 7.071l-22.929 32.421c-12.767-41.075-12.097-40.949-15.933-44.786-4.112-4.112-4.736-3.485-44.786-15.934l32.423-22.928a16.742 16.742 0 0 0 7.071-13.876l-.508-39.706 31.825 23.748a16.734 16.734 0 0 0 15.382 2.437l37.606-12.753-12.753 37.607a16.726 16.726 0 0 0 2.437 15.382l23.748 31.825-39.707-.508zM173.373 67.274l-13.359-24.426-13.358 24.426-24.426 13.358 24.426 13.36 13.358 24.425 13.359-24.425 24.426-13.36zM362.946 384.489l-10.806-19.758-10.805 19.758-19.758 10.805 19.758 10.806 10.805 19.756 10.806-19.756 19.757-10.806zM378.142 19.757 367.337 0l-10.806 19.757-19.757 10.806 19.757 10.806 10.806 19.757 10.805-19.757L397.9 30.563zM490.635 142.513l-6.468-11.824-6.466 11.824-11.825 6.466 11.825 6.467 6.466 11.824 6.468-11.824 11.823-6.467zM492.626 294.117l-26.75 7.834-26.748-7.834 7.834 26.748-7.834 26.75 26.748-7.834 26.75 7.834-7.835-26.75z" />
    </svg>
  )
}

export default memo(SVG)
