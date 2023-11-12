import { FC, ReactNode } from 'react'

type TProps = {
  children: ReactNode
}
const Layout: FC<TProps> = ({ children }) => {
  return <div style={{ border: '1px solid tomato;' }}>{children}</div>
}

export default Layout
