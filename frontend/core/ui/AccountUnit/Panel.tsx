import { type FC, useCallback, useEffect, useRef, useState } from 'react'

import { SOCIAL } from '~/const/oauth'
import { titleCase } from '~/fmt'
import usePageLock from '~/hooks/usePageLock'
import useTrans from '~/hooks/useTrans'
import CloseCrossSVG from '~/icons/CloseLight'
import { signIn } from '~/oauth'
import { Link } from '~/platform'

import { OAUTH_PROVIDERS } from './constant'
import Loading, { LoadingMask } from './Loading'
import useSalon, { SocialIcon } from './salon/panel'

type TProps = {
  returnTo?: string
  show: boolean
  onClose: () => void
}

const Panel: FC<TProps> = ({ show, returnTo, onClose }) => {
  const s = useSalon()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const { lockPageOnce, unlockPageOnce } = usePageLock()

  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const { t } = useTrans()

  const handleClose = useCallback(() => {
    unlockPageOnce()
    onClose()
  }, [onClose, unlockPageOnce])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !show || dialog.open) return

    if (typeof dialog.showModal === 'function') dialog.showModal()
    else dialog.setAttribute('open', '')
    lockPageOnce()

    return () => {
      if (dialog.open) {
        if (typeof dialog.close === 'function') dialog.close()
        else dialog.removeAttribute('open')
      }
      unlockPageOnce()
    }
  }, [lockPageOnce, show, unlockPageOnce])

  if (!show) return null

  return (
    <dialog
      ref={dialogRef}
      aria-label='Sign in'
      className='bg-modal-mask fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none overflow-auto border-0 px-4 pt-24'
      onCancel={(event) => {
        event.preventDefault()
        handleClose()
      }}
    >
      <button
        type='button'
        aria-label='Close sign in'
        className='absolute inset-0 size-full cursor-default'
        onClick={handleClose}
      />
      <section
        aria-label='Sign in'
        className='border-divider bg-modal-bg shadow-modal relative z-1 mx-auto w-full max-w-md rounded-md border'
      >
        <button
          type='button'
          aria-label='Close sign in'
          className='align-both hover:bg-hoverBg absolute top-3.5 right-4 z-10 size-7 rounded-md'
          onClick={handleClose}
        >
          <CloseCrossSVG className='size-5' />
        </button>
        <div className={s.wrapper}>
          {loadingProvider && (
            <>
              <LoadingMask />
              <Loading provider={loadingProvider} />
            </>
          )}
          <div className={s.header}>{t('login.with.social')}</div>
          <div className={s.body}>
            {OAUTH_PROVIDERS.map((provider) => {
              const providerKey = titleCase(provider)
              const Icon = SocialIcon[providerKey] || null

              return (
                <button
                  type='button'
                  className={s.socialItem}
                  key={provider}
                  onClick={() => {
                    setLoadingProvider(providerKey)
                    void signIn(SOCIAL.GITHUB, { callbackUrl: returnTo }).catch(() =>
                      setLoadingProvider(null),
                    )
                  }}
                >
                  <div className={s.iconBox}>
                    <Icon className={s.icon} />
                  </div>
                  {providerKey}
                </button>
              )
            })}
          </div>
          <div className={s.footer}>
            <Link href='/' navigation='document' className={s.link}>
              {t('login.bind.hint')}
            </Link>
            <Link href='/' navigation='document' className={s.link}>
              {t('need.help')}
            </Link>
          </div>
        </div>
      </section>
    </dialog>
  )
}

export default Panel
