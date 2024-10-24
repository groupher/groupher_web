import type { FC } from 'react'

const SvgComponent: FC = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 256 256" {...props}>
    <path d="M83.25 40a8 8 0 0 1 8-8H192a8 8 0 0 1 0 16h-6.46l18.75 106.3a8 8 0 0 1-6.48 9.26 7.52 7.52 0 0 1-1.4.13 8 8 0 0 1-7.87-6.61L169.29 48h-78a8 8 0 0 1-8.04-8Zm130.13 181.92a8 8 0 0 1-11.3-.54L168.1 184H136v56a8 8 0 0 1-16 0v-56H40a8 8 0 0 1 0-16h9.29l16.95-96-24.16-26.62a8 8 0 1 1 11.84-10.76l160 176a8 8 0 0 1-.54 11.3ZM153.55 168 79.84 86.92 65.54 168Z" />
  </svg>
)

export default SvgComponent
