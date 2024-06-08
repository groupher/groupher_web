import type { FC } from 'react'

const SVG: FC = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    className="icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path d="M434.624 800H96a64 64 0 0 1-64-64V288a64 64 0 0 1 64-64h339.136l-81.056-81.088a32 32 0 0 1 45.248-45.248l133.984 133.984a31.904 31.904 0 0 1 11.136 24.32 31.904 31.904 0 0 1-11.136 24.384L399.328 414.336a32 32 0 1 1-45.248-45.248L435.136 288H128a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h306.624l-81.088-81.088a32 32 0 0 1 45.248-45.248l133.984 133.984a31.904 31.904 0 0 1 11.136 24.32 31.904 31.904 0 0 1-11.136 24.384L398.784 926.336a32 32 0 1 1-45.248-45.248L434.624 800zM672 64h256a64 64 0 0 1 64 64v256a64 64 0 0 1-64 64H672a64 64 0 0 1-64-64V128a64 64 0 0 1 64-64zm128 512a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm-96-448a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32H704zm96 512a128 128 0 1 0 0 256 128 128 0 0 0 0-256z" />
  </svg>
)

export default SVG
