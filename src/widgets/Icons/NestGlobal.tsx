import { memo, type SVGProps } from 'react'

const Lock = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      className="icon"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path d="M496 752h32v32h-32zm0-64h32v32h-32zm214.512-293.168 27.312-13.648 14.32 28.608-27.328 13.664zm123.68-26.032 13.984-6.992C860.496 375.92 877.92 384 896.064 384A64 64 0 1 0 864 264.592c-24.64 14.208-35.936 42.288-30.32 68.672l-13.824 6.912 14.32 28.624zM880 292.304c4.944-2.864 10.304-4.304 15.952-4.304 11.424 0 22.048 6.128 27.76 16a32.032 32.032 0 0 1-27.648 48 32.128 32.128 0 0 1-27.76-16A32.032 32.032 0 0 1 880 292.304zM765.168 367.52l27.36-13.68 14.304 28.624-27.36 13.664zM655.84 422.192l27.328-13.68 14.32 28.624-27.36 13.664zm-384-12.384 14.304-28.624 27.312 13.664-14.304 28.624zm-54.688-27.344 14.304-28.608 27.36 13.664-14.32 28.624zm109.344 54.688 14.304-28.64 27.36 13.68-14.32 28.64zM96 375.408c10.08 5.824 21.088 8.592 31.936 8.592 18.144 0 35.568-8.08 47.904-22.192l13.968 6.992 14.32-28.64-13.824-6.896c5.6-26.4-5.68-54.464-30.304-68.688A63.968 63.968 0 0 0 72.592 288 64 64 0 0 0 96 375.408zM100.288 304a32.16 32.16 0 0 1 27.776-16 32.032 32.032 0 0 1 27.648 48c-5.712 9.872-16.336 16-27.776 16a32.032 32.032 0 0 1-27.648-48zM544 840.576a63.92 63.92 0 0 0-16-6.512V816h-32v18.08a64 64 0 1 0 48 6.512zM539.712 912c-5.712 9.872-16.336 16-27.776 16a32.032 32.032 0 0 1-27.648-48 32.16 32.16 0 0 1 27.776-16 32.032 32.032 0 0 1 27.648 48z" />
      <path d="M864 640c-28.256 0-53.408 12.432-70.976 31.872l-165.6-105.392A126.768 126.768 0 0 0 640 512c0-14.88-3.04-28.96-7.712-42.256l10.528-5.264-14.32-28.624-10.096 5.056c-20.128-30.08-52.8-50.56-90.4-55.296V254.384c45.36-7.648 80-46.848 80-94.4a96 96 0 0 0-192 0c0 47.552 34.64 86.752 80 94.4v131.232c-37.6 4.736-70.272 25.232-90.4 55.296l-10.096-5.056-14.32 28.64 10.528 5.248C387.04 483.024 384 497.104 384 512c0 19.568 4.736 37.888 12.592 54.48L230.976 671.872C213.408 652.432 188.256 640 160 640a96 96 0 1 0 88.48 58.672L413.952 593.36A126.928 126.928 0 0 0 496 638.4V656h32v-17.6a126.96 126.96 0 0 0 82.048-45.04l165.488 105.312A96 96 0 1 0 864 640zM160 800c-35.296 0-64-28.704-64-64s28.704-64 64-64 64 28.704 64 64-28.704 64-64 64zm288-640c0-35.296 28.704-64 64-64s64 28.704 64 64-28.704 64-64 64-64-28.704-64-64zm64 448c-52.928 0-96-43.072-96-96s43.072-96 96-96 96 43.072 96 96-43.072 96-96 96zm352 192c-35.296 0-64-28.704-64-64s28.704-64 64-64 64 28.704 64 64-28.704 64-64 64z" />
    </svg>
  )
}

export default memo(Lock)
