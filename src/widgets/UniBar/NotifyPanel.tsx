import useSalon from './styles/notify_panel'

export default () => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <>当前没有消息。</>
    </div>
  )
}
