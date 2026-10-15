import { Dialog } from '@base-ui/react/dialog'
import type { TPublicService, TServiceConfigKind } from '@shared/contracts'
import { FileBraces, RefreshCw, X } from 'lucide-react'

import { useServiceConfig } from '@/hooks/useServiceConfig'

import { ConfigDrawerBody } from './ConfigDrawerBody'

type TProps = {
  service: TPublicService
  onClose: () => void
}

const KIND_LABEL: Record<TServiceConfigKind, string> = {
  'env-files': 'Environment files',
  'elixir-config': 'Elixir configuration',
  'python-settings': 'Python settings',
  none: 'Service configuration',
}

export function ConfigDrawer({ service, onClose }: TProps) {
  const config = useServiceConfig(service.id)
  const { manifest } = config

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className='config-drawer-backdrop' />
        <Dialog.Viewport className='config-drawer-viewport'>
          <Dialog.Popup className='config-drawer-popup' data-service-id={service.id}>
            <header className='config-drawer-header'>
              <div className='config-drawer-title-group'>
                <FileBraces aria-hidden='true' />
                <div>
                  <span className='config-drawer-kicker'>Service configuration</span>
                  <Dialog.Title>{service.name}</Dialog.Title>
                </div>
              </div>
              <Dialog.Close
                className='config-drawer-close'
                aria-label='Close service configuration'
              >
                <X aria-hidden='true' />
              </Dialog.Close>
            </header>

            <div className='config-drawer-toolbar'>
              <div>
                <strong>{manifest ? KIND_LABEL[manifest.kind] : 'Configuration'}</strong>
                {manifest?.environment ? <span>{manifest.environment}</span> : null}
              </div>
              <div>
                <span>
                  {manifest?.files.length || 0} {manifest?.files.length === 1 ? 'file' : 'files'}
                </span>
                <button type='button' disabled={config.loading} onClick={config.refresh}>
                  <RefreshCw className={config.loading ? 'spin' : ''} aria-hidden='true' />
                  Refresh
                </button>
              </div>
            </div>

            <ConfigDrawerBody manifest={manifest} config={config} />
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
