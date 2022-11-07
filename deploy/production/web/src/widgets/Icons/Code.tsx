import { memo, SVGProps } from 'react'

const Code = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="prefix__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <path d="M1024 512c0 17-6.7 33.2-18.8 45.2l-128 128c-24.2 25.8-64.7 27.1-90.5 2.9-25.8-24.2-27.1-64.7-2.9-90.5.9-1 1.9-2 2.9-2.9l82.7-82.8-82.8-82.8c-25-25-25-65.5 0-90.5s65.5-25 90.5 0l128 128c12.1 12.1 18.9 28.4 18.9 45.4zM697.2 284.5l-256 512h-.6c-15.4 31.5-53.5 44.6-85 29.2-22-10.8-35.9-33.2-35.6-57.7.2-9.9 2.7-19.6 7.4-28.3h-.6l256-512h.6c15.4-31.5 53.5-44.6 85-29.2 21.9 10.7 35.8 33.1 35.6 57.5-.2 9.9-2.7 19.6-7.4 28.4l.6.1zM192 704c-17 0-33.3-6.7-45.2-18.8l-128-128c-25-25-25-65.5-.1-90.5l.1-.1 128-128c25-25 65.5-25 90.5 0s25 65.5 0 90.5L154.5 512l82.8 82.8c25 25 25 65.5 0 90.5-12.1 12-28.3 18.7-45.3 18.7z" />
    </svg>
  )
}

export default memo(Code)