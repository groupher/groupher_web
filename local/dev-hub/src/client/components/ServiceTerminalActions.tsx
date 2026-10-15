import type { TPublicService } from '@shared/contracts'
import {
  BrushCleaning,
  FileBraces,
  GitBranch,
  LoaderCircle,
  RotateCw,
  SquareTerminal,
} from 'lucide-react'

import { ServiceActionButton } from './ServiceActionButton'

type TProps = {
  service: TPublicService
  expanded: boolean
  pending: boolean
  restartDisabled: boolean
  hasDependencies: boolean
  hasRequiredDependencyIssue: boolean
  hasStartedRequiredDependencies: boolean
  hasOptionalDependencyIssue: boolean
  onToggleTerminal: (id: string) => void
  onRestartService: (service: TPublicService) => void
  onOpenConfig: (id: string) => void
  onOpenDependencies: (id: string) => void
}

export function ServiceTerminalActions(props: TProps) {
  const { service } = props
  return (
    <div className='service-action service-action--terminal'>
      <ServiceActionButton
        type='button'
        className={`service-terminal-action ${props.expanded ? 'is-active' : ''}`}
        onClick={() => props.onToggleTerminal(service.id)}
        aria-label={`${props.expanded ? 'Close' : 'Open'} ${service.name} terminal`}
        aria-expanded={props.expanded}
        aria-controls={`terminal-${service.id}`}
        tooltip='Terminal'
      >
        <SquareTerminal aria-hidden='true' />
      </ServiceActionButton>
      <ServiceActionButton
        type='button'
        className='service-terminal-action'
        onClick={props.restartDisabled ? undefined : () => props.onRestartService(service)}
        aria-label={`Restart ${service.name}`}
        aria-disabled={props.restartDisabled}
        tooltip='Restart service'
      >
        {props.pending ? (
          <LoaderCircle className='spin' aria-hidden='true' />
        ) : (
          <RotateCw aria-hidden='true' />
        )}
      </ServiceActionButton>
      <ServiceActionButton
        type='button'
        className='service-terminal-action'
        aria-label={`Clean up ${service.name}`}
        tooltip='Clean build artifacts'
      >
        <BrushCleaning aria-hidden='true' />
      </ServiceActionButton>
      <ServiceActionButton
        type='button'
        className='service-terminal-action service-terminal-action--config'
        onClick={() => props.onOpenConfig(service.id)}
        aria-label={`Configure ${service.name}`}
        tooltip='Configure service'
      >
        <FileBraces aria-hidden='true' />
      </ServiceActionButton>
      {props.hasDependencies ? (
        <ServiceActionButton
          type='button'
          className={`service-terminal-action ${props.hasRequiredDependencyIssue ? 'has-required-dependency-issue' : ''} ${props.hasStartedRequiredDependencies ? 'has-started-required-dependencies' : ''} ${props.hasOptionalDependencyIssue ? 'has-optional-dependency-issue' : ''}`}
          onClick={() => props.onOpenDependencies(service.id)}
          aria-label={`View ${service.name} dependencies`}
          tooltip='Dependencies'
        >
          <GitBranch aria-hidden='true' />
        </ServiceActionButton>
      ) : null}
    </div>
  )
}
