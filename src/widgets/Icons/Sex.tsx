import { memo, type SVGProps } from 'react'

const Sex = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="prefix__icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <path d="M436.235 677.148l-123.155.098-.098-96.263v-10.972c121.699-18.882 214.59-118.448 214.492-238.74-.121-133.642-114.955-241.942-256.509-241.797-141.526.098-256.166 108.545-256.067 242.235.098 120.241 93.182 219.662 214.903 238.401v10.924l.098 96.263-126.383.098c-22.987.048-41.578 17.62-41.554 39.319 0 21.701 18.64 39.27 41.601 39.27l126.409-.098.098 139.37c.023 21.701 18.666 39.271 41.627 39.271 22.96-.048 41.579-17.623 41.555-39.321l-.121-139.42 123.155-.098c22.987 0 41.578-17.62 41.554-39.319 0-21.65-18.64-39.223-41.602-39.223zm358.012-223.643l-.194-229.127 77.767 74.661c8.156 7.817 18.932 11.747 29.71 11.747 10.485 0 21.022-3.739 29.126-11.31 16.359-15.193 16.604-40.048.438-55.535L809.977 127.68c-6.894-8.497-22.718-23.981-48.253-26.797-15.633-1.797-39.805 1.117-64.515 24.467-31.845 30.195-123.546 118.981-123.546 118.981l.194.098c-7.283 7.087-11.844 16.699-11.844 27.329 0 21.698 18.641 39.27 41.65 39.27a42.62 42.62 0 0029.613-11.894s40.972-39.661 77.572-74.901l.194 229.323c-121.699 18.932-214.613 118.448-214.492 238.74.098 133.691 114.977 241.945 256.481 241.847 141.555-.098 256.167-108.546 256.068-242.235-.098-120.247-93.154-219.714-214.854-238.403z" />
    </svg>
  )
}

export default memo(Sex)
