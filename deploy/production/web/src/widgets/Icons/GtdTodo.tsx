import { memo, SVGProps } from 'react'

const TODO = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <path d="M512.005 958.709c-246.322 0-446.715-200.392-446.715-446.715 0-246.311 200.393-446.704 446.715-446.704 246.31 0 446.704 200.393 446.704 446.704 0 246.323-200.392 446.715-446.704 446.715zm0-788.993c-188.738 0-342.29 153.545-342.29 342.278 0 188.738 153.552 342.29 342.29 342.29 188.734 0 342.279-153.552 342.279-342.29 0-188.733-153.545-342.278-342.279-342.278z" />
    </svg>
  )
}

export default memo(TODO)
