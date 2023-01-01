import { memo, SVGProps } from 'react'

const Report = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <path d="M213.71 966.683A156.342 156.342 0 0 1 73.86 740.304l299.246-596.856a155.526 155.526 0 0 1 139.798-86.273h.1a155.44 155.44 0 0 1 139.75 86.325l298.99 596.855a156.366 156.366 0 0 1-139.799 226.328zm235.64-785.009L150.208 778.477a69.718 69.718 0 0 0 2.968 69.234c13.253 21.492 35.308 33.67 60.535 33.67h598.236c25.176 0 47.18-12.178 60.433-33.67a69.889 69.889 0 0 0 3.07-69.183l-298.99-596.804c-12.282-24.613-36.076-39.3-63.453-39.3h-.1c-27.48.001-51.274 14.687-63.555 39.25zm6.55 557.607a56.85 56.85 0 1 1 56.851 56.851 56.824 56.824 0 0 1-56.85-56.852zm0-227.453v-113.7a56.85 56.85 0 0 1 113.7 0v113.7a56.85 56.85 0 1 1-113.7 0z" />
    </svg>
  )
}

export default memo(Report)