import { memo, type SVGProps } from 'react'

const Account = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      {...props}
    >
      <path d="M512 0c155.52 0 281.6 126.08 281.6 281.6S667.52 563.2 512 563.2 230.4 437.12 230.4 281.6 356.48 0 512 0zm0 76.8a204.8 204.8 0 1 0 0 409.6 204.8 204.8 0 0 0 0-409.6z" />
      <path d="M512 486.4c268.62 0 486.4 217.78 486.4 486.4v51.2h-76.8v-51.2c0-226.227-183.373-409.6-409.6-409.6-223.514 0-405.248 179.046-409.523 401.536l-.077 8.064v51.2H25.6v-51.2c0-268.62 217.78-486.4 486.4-486.4z" />
      <path d="M512 691.2q38.4 0 38.4 38.4v179.2q0 38.4-38.4 38.4t-38.4-38.4V729.6q0-38.4 38.4-38.4Z" />
    </svg>
  )
}

export default memo(Account)
