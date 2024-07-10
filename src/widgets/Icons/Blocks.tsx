import { memo, type SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      className="icon"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path d="M384 672c53.02 0 96 42.98 96 96v96c0 53.02-42.98 96-96 96H160c-53.02 0-96-42.98-96-96v-96c0-53.02 42.98-96 96-96h224zm0 64H160c-17.496 0-31.713 14.042-31.996 31.47L128 768v96c0 17.496 14.042 31.713 31.47 31.996l.53.004h224c17.496 0 31.713-14.042 31.996-31.47L416 864v-96c0-17.496-14.042-31.713-31.47-31.996L384 736zm480-320c53.02 0 96 42.98 96 96v352c0 53.02-42.98 96-96 96H640c-53.02 0-96-42.98-96-96V512c0-53.02 42.98-96 96-96h224zm0 64H640c-17.496 0-31.713 14.042-31.996 31.47L608 512v352c0 17.496 14.042 31.713 31.47 31.996l.53.004h224c17.496 0 31.713-14.042 31.996-31.47L896 864V512c0-17.496-14.042-31.713-31.47-31.996L864 480zM384 64c53.02 0 96 42.98 96 96v352c0 53.02-42.98 96-96 96H160c-53.02 0-96-42.98-96-96V160c0-53.02 42.98-96 96-96h224zm0 64H160c-17.496 0-31.713 14.042-31.996 31.47L128 160v352c0 17.496 14.042 31.713 31.47 31.996l.53.004h224c17.496 0 31.713-14.042 31.996-31.47L416 512V160c0-17.496-14.042-31.713-31.47-31.996L384 128zm480-64c53.02 0 96 42.98 96 96v96c0 53.02-42.98 96-96 96H640c-53.02 0-96-42.98-96-96v-96c0-53.02 42.98-96 96-96h224zm0 64H640c-17.496 0-31.713 14.042-31.996 31.47L608 160v96c0 17.496 14.042 31.713 31.47 31.996l.53.004h224c17.496 0 31.713-14.042 31.996-31.47L896 256v-96c0-17.496-14.042-31.713-31.47-31.996L864 128z" />
    </svg>
  )
}

export default memo(SVG)
