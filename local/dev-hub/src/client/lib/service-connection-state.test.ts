import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import type { TPublicService } from '@shared/contracts'

import {
  DISCONNECTED_SERVICE_REASON,
  getServiceDisplayStatus,
  isServiceDisconnected,
  projectDisconnectedServices,
} from './service-connection-state'

const runningService: TPublicService = {
  id: 'community',
  name: 'Community',
  description: '',
  group: 'frontend',
  monogram: 'CM',
  technologies: null,
  port: 3007,
  url: 'http://127.0.0.1:3007/health',
  appUrl: 'http://127.0.0.1:3007/home/post',
  portlessName: 'community',
  portlessUrl: 'https://community.groupher.localhost/health',
  portlessAppUrl: 'https://community.groupher.localhost/home/post',
  endpoints: [],
  status: 'running',
  pid: 1234,
  startedAt: 100,
  endedAt: null,
  exitCode: null,
  externalProcess: null,
  canStart: true,
  unavailableReason: null,
  metricThresholds: {
    browserBusyPercent: 80,
    browserHeapBytes: 512 * 1024 * 1024,
    serverCpuPercent: 80,
    serverRssBytes: 512 * 1024 * 1024,
  },
  startPolicy: {
    defaultMode: 'chain',
    optionalDependencies: [],
    requiredDependencies: [],
  },
}

describe('projectDisconnectedServices', () => {
  it('marks stale service snapshots disconnected without changing their runtime status', () => {
    const projected = projectDisconnectedServices([runningService])

    assert.deepEqual(projected, [
      {
        ...runningService,
        pid: null,
        startedAt: null,
        externalProcess: null,
        canStart: false,
        unavailableReason: DISCONNECTED_SERVICE_REASON,
      },
    ])
    assert.equal(isServiceDisconnected(projected[0]!), true)
    assert.equal(getServiceDisplayStatus(projected[0]!), 'disconnected')
  })
})
