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
      <path
        d="M214.101 512c0-32.512 5.547-63.701 15.36-92.928L57.173 290.219A491.861 491.861 0 0 0 4.693 512c0 79.701 18.859 154.88 52.395 221.61l172.203-129.066A290.56 290.56 0 0 1 214.1 512"
        fill="#FBBC05"
      />
      <path
        d="M516.693 216.192c72.107 0 137.259 25.003 188.459 65.963l148.95-145.622C763.348 59.18 646.996 11.392 516.692 11.392c-202.325 0-376.234 113.28-459.52 278.827l172.374 128.853c39.68-118.016 152.832-202.88 287.146-202.88"
        fill="#EA4335"
      />
      <path
        d="M516.693 807.808c-134.357 0-247.509-84.864-287.232-202.88L57.173 733.781c83.243 165.547 257.152 278.827 459.52 278.827 124.843 0 244.054-43.392 333.568-124.757L686.677 764.032c-46.122 28.459-104.234 43.776-170.026 43.776"
        fill="#34A853"
      />
      <path
        d="M1005.397 512c0-29.568-4.693-61.44-11.648-91.008H516.651V614.4h274.602c-13.696 65.963-51.072 116.65-104.533 149.632l163.541 123.819C944.256 802.432 1005.397 675.2 1005.397 512"
        fill="#4285F4"
      />
    </svg>
  )
}

export default memo(SVG)
