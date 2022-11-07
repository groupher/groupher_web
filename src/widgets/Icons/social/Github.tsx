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
      <path d="M950.857 512q0 143.429-83.714 258T650.857 928.571q-15.428 2.858-22.571-4t-7.143-17.142V786.857q0-55.428-29.714-81.143Q624 702.286 650 695.43t53.714-22.286 46.286-38 30.286-60 11.714-86q0-69.143-45.143-117.714 21.143-52-4.571-116.572-16-5.143-46.286 6.286t-52.571 25.143L621.714 300Q568.571 285.143 512 285.143T402.286 300q-9.143-6.286-24.286-15.429t-47.714-22-49.143-7.714q-25.143 64.572-4 116.572Q232 420 232 489.143q0 48.571 11.714 85.714t30 60 46 38.286 53.715 22.286T432 705.714q-22.857 20.572-28 58.857-12 5.715-25.714 8.572T345.714 776t-37.428-12.286T276.57 728q-10.857-18.286-27.714-29.714t-28.286-13.715l-11.428-1.714q-12 0-16.572 2.572T189.714 692t5.143 8 7.429 6.857l4 2.857q12.571 5.715 24.857 21.715t18 29.142l5.714 13.143q7.429 21.715 25.143 35.143T318.286 826 358 830t31.714-2l13.143-2.286q0 21.715.286 50.857t.286 30.858q0 10.285-7.429 17.142t-22.857 4Q240.57 884.571 156.857 770T73.143 512q0-119.429 58.857-220.286T291.714 132 512 73.143 732.286 132 892 291.714 950.857 512z" />
    </svg>
  )
}

export default memo(SVG)