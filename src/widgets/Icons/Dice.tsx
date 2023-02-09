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
      <path d="M488 72.896a48 48 0 0 1 43.456-2.304L536 72.896 880.256 271.68a48 48 0 0 1 23.776 36.928l.224 4.64V710.72a48 48 0 0 1-20.096 39.04l-3.904 2.56L536 951.04a48 48 0 0 1-43.456 2.336L488 951.072 143.744 752.32a48 48 0 0 1-23.776-36.928l-.224-4.64V313.28c0-15.616 7.552-30.112 20.096-39.04l3.904-2.56L488 72.96zm-304.32 282.88.032 345.728L480 872.544V531.52l-4-6.944-292.288-168.8zm656.576 0L547.968 524.544l-3.968 6.88v341.12l296.256-171.04V355.776zM384 688.16c17.664 8.736 32 30.176 32 47.84 0 17.664-14.336 24.896-32 16.16-17.664-8.768-32-30.176-32-47.84 0-17.696 14.336-24.928 32-16.16zm384-63.872c17.664-8.64 32-1.376 32 16.32 0 17.664-14.336 39.04-32 47.68-17.664 8.672-32 1.376-32-16.288s14.336-39.04 32-47.68zm-512-.128c17.664 8.736 32 30.176 32 47.84 0 17.664-14.336 24.896-32 16.16-17.664-8.768-32-30.176-32-47.84 0-17.696 14.336-24.928 32-16.16zm384-64c17.664-8.768 32-1.536 32 16.16 0 17.664-14.336 39.072-32 47.84-17.664 8.736-32 1.504-32-16.16s14.336-39.104 32-47.84zm-256-32c17.664 8.736 32 30.176 32 47.84 0 17.664-14.336 24.896-32 16.16-17.664-8.768-32-30.176-32-47.84 0-17.696 14.336-24.928 32-16.16zm-128-64c17.664 8.736 32 30.176 32 47.84 0 17.664-14.336 24.896-32 16.16-17.664-8.768-32-30.176-32-47.84 0-17.696 14.336-24.928 32-16.16zm256-331.232L218.848 302.144l293.12 169.28 293.12-169.28L512 132.928zM512 272c26.496 0 48 14.336 48 32s-21.504 32-48 32-48-14.336-48-32 21.504-32 48-32z" />
    </svg>
  )
}

export default memo(SVG)