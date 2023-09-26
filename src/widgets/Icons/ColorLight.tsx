import { memo, SVGProps } from 'react'

// see https://www.svgrepo.com/svg/406090/light-bulb?edit=true
const Light = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="iconify iconify--twemoji"
      viewBox="0 0 36 36"
      {...props}
    >
      <path
        fill="#fbe0a1"
        d="M29 11.06c0 6.439-5 7.439-5 13.44 0 3.098-3.123 3.359-5.5 3.359-2.053 0-6.586-.779-6.586-3.361C11.914 18.5 7 17.5 7 11.06 7 5.029 12.285.14 18.083.14 23.883.14 29 5.029 29 11.06z"
      />
      <path
        fill="#CCD6DD"
        d="M22.167 32.5c0 .828-2.234 2.5-4.167 2.5-1.933 0-4.167-1.672-4.167-2.5 0-.828 2.233-.5 4.167-.5 1.933 0 4.167-.328 4.167.5z"
      />
      <path
        fill="#fffbf0"
        d="M22.707 10.293a.999.999 0 0 0-1.414 0L18 13.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414L17 15.414V26a1 1 0 1 0 2 0V15.414l3.707-3.707a.999.999 0 0 0 0-1.414z"
      />

      <path fill="#99AAB5" d="M24 31a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-6h12v6z" />
      <path
        fill="#CCD6DD"
        d="M11.999 32a1 1 0 0 1-.163-1.986l12-2a.994.994 0 0 1 1.15.822.999.999 0 0 1-.822 1.15l-12 2a.927.927 0 0 1-.165.014zm0-4a1 1 0 0 1-.163-1.986l12-2a.995.995 0 0 1 1.15.822.999.999 0 0 1-.822 1.15l-12 2a.927.927 0 0 1-.165.014z"
      />
    </svg>
  )
}

export default memo(Light)
