import type { SVGProps } from 'react'

const SVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      className="icon"
      viewBox="0 0 1280 1024"
      {...props}
    >
      <path d="M489.335 97.987c7.399-4.2 16.798-1.8 20.997 5.6l333.956 578.522c4.2 7.4 1.8 16.798-5.6 20.998L452.94 925.877c-7.4 4.2-16.798 1.8-20.997-5.6L97.987 341.756c-4.2-7.4-1.8-16.798 5.6-20.998l385.748-222.77zM55.593 237.568c-53.193 30.796-71.39 98.787-40.595 152.18l333.956 578.523c30.796 53.193 98.787 71.59 152.18 40.795l385.548-222.77c53.193-30.796 71.59-98.787 40.795-152.18L593.52 55.593c-30.796-53.193-98.987-71.39-152.18-40.595L55.593 237.568zm592.52 760.3c19.398 16.197 44.395 25.996 71.791 25.996h447.94c61.793 0 111.986-50.193 111.986-111.985v-671.91c0-61.793-50.193-111.986-111.985-111.986h-447.94c-3.6 0-7 .2-10.6.4L982.87 602.12c48.394 83.789 19.598 191.175-64.191 239.568l-270.564 156.18zm515.732-622.718-96.387 99.787c-6.399 6.4-16.998 6.4-22.997 0l-96.787-99.787c-27.996-28.996-26.396-76.99 5-103.786 26.996-23.397 68.39-18.998 93.387 6.4l9.999 10.398 9.398-10.399c24.997-25.397 65.992-29.996 93.788-6.4 30.996 26.997 32.396 74.991 4.4 103.787zm-821.09-26.596-14.399 53.793-40.794 152.18c-13.998 51.992 16.998 105.385 68.79 119.383s105.387-16.997 119.385-68.79l4.8-17.598c.2-.8.4-1.6.6-2.2l35.394 61.392-24.196 13.998c-13.399 7.6-17.798 24.797-10.2 37.995s24.798 17.798 37.996 10.199l96.387-55.593c13.398-7.599 17.798-24.797 10.199-37.995s-24.797-17.797-37.995-10.198l-24.197 13.998-35.395-61.392c.8.2 1.6.4 2.2.6l17.597 4.8c51.993 13.997 105.386-16.999 119.384-68.792s-16.998-105.386-68.79-119.384l-152.18-40.794-53.393-14.998c-22.197-6-45.194 7.199-51.194 29.596z" />
    </svg>
  )
}

export default SVG
