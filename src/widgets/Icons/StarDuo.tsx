import { memo, type SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 256 256" {...props}>
      <path
        d="M184.13 147.7a8.08 8.08 0 0 0-2.54 7.89l13.52 58.54a8 8 0 0 1-11.89 8.69l-51.1-31a7.93 7.93 0 0 0-8.24 0l-51.1 31a8 8 0 0 1-11.89-8.69l13.52-58.54a8.08 8.08 0 0 0-2.54-7.89l-45.11-39.35a8 8 0 0 1 4.54-14.07l59.46-5.14a8 8 0 0 0 6.67-4.88l23.23-55.36a8 8 0 0 1 14.68 0l23.23 55.36a8 8 0 0 0 6.67 4.88l59.46 5.14a8 8 0 0 1 4.54 14.07Z"
        fill="white"
      />
      <path d="M239.2 97.29a16 16 0 0 0-13.81-11L166 81.17l-23.28-55.36a15.95 15.95 0 0 0-29.44 0L90.07 81.17l-59.46 5.15a16 16 0 0 0-9.11 28.06l45.11 39.42-13.52 58.54a16 16 0 0 0 23.84 17.34l51-31 51.11 31a16 16 0 0 0 23.84-17.34l-13.51-58.6 45.1-39.36a16 16 0 0 0 4.73-17.09Zm-15.22 5-45.1 39.36a16 16 0 0 0-5.08 15.71L187.35 216l-51.07-31a15.9 15.9 0 0 0-16.54 0l-51 31 13.46-58.6a16 16 0 0 0-5.08-15.71L32 102.35a.37.37 0 0 1 0-.09l59.44-5.14a16 16 0 0 0 13.35-9.75L128 32.08l23.2 55.29a16 16 0 0 0 13.35 9.75l59.45 5.14v.07Z" />
    </svg>
  )
}

export default memo(SVG)
