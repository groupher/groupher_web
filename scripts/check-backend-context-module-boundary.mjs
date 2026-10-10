import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { maskElixir } from './check-cms-context-module-boundary.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const backendRoot = path.join(repoRoot, 'backend', 'api', 'lib', 'groupher_server')

const relative = (file) => path.join('backend/api/lib/groupher_server', file)

const facadeFiles = [
  'accounts/achievements.ex',
  'accounts/mailbox.ex',
  'accounts/collect_folders.ex',
  'accounts/fans.ex',
  'accounts/profiles.ex',
  'accounts/publish.ex',
  'analysis/aggregator.ex',
  'analysis/contribution.ex',
  'analysis/maintenance.ex',
  'analysis/metric_event.ex',
  'analysis/web.ex',
  'messaging.ex',
  'messaging/inbox.ex',
  'public_cache.ex',
]

const persistFiles = [
  'accounts/achievements/persist.ex',
  'accounts/mailbox/projection.ex',
  'accounts/collect_folders/persist.ex',
  'accounts/fans/persist.ex',
  'accounts/profiles/persist.ex',
  'analysis/aggregator/persist.ex',
  'analysis/contribution/persist.ex',
  'analysis/maintenance/persist.ex',
  'analysis/metric_event/persist.ex',
  'messaging/mentions/persist.ex',
  'messaging/notifications/persist.ex',
  'messaging/inbox/persist.ex',
  'accounts/publish/persist.ex',
  'accounts/profiles/oauth/persist.ex',
  'public_cache/persist.ex',
]

const requiredOwnerFiles = [
  'accounts/mailbox/query.ex',
  'accounts/mailbox/projection.ex',
  'accounts/mailbox/effects.ex',
  'accounts/mailbox/workflow.ex',
  'accounts/collect_folders/persist.ex',
  'accounts/collect_folders/commands/create.ex',
  'accounts/collect_folders/commands/update.ex',
  'accounts/collect_folders/commands/delete.ex',
  'accounts/collect_folders/commands/add.ex',
  'accounts/collect_folders/commands/remove.ex',
  'accounts/fans/persist.ex',
  'accounts/fans/effects.ex',
  'accounts/fans/commands/follow.ex',
  'accounts/fans/commands/unfollow.ex',
  'accounts/profiles/query.ex',
  'accounts/profiles/persist.ex',
  'accounts/profiles/effects.ex',
  'accounts/profiles/read.ex',
  'accounts/profiles/commands/update_profile.ex',
  'accounts/profiles/commands/update_subscribe_state.ex',
  'accounts/profiles/commands/link_oauth.ex',
  'accounts/profiles/commands/unlink_oauth.ex',
  'accounts/profiles/commands/sign_in_oauth.ex',
  'accounts/profiles/commands/link_oauth_identity.ex',
  'accounts/profiles/commands/unlink_oauth_identity.ex',
  'accounts/profiles/oauth/persist.ex',
  'accounts/achievements/persist.ex',
  'accounts/achievements/commands/achieve.ex',
  'accounts/publish/persist.ex',
  'accounts/publish/effects.ex',
  'accounts/publish/projection.ex',
  'analysis/aggregator/persist.ex',
  'analysis/aggregator/workflow.ex',
  'analysis/contribution/persist.ex',
  'analysis/contribution/query.ex',
  'analysis/contribution/effects.ex',
  'analysis/contribution/workflow.ex',
  'analysis/maintenance/query.ex',
  'analysis/maintenance/persist.ex',
  'analysis/maintenance/workflow.ex',
  'analysis/metric_event/persist.ex',
  'analysis/web/provision.ex',
  'messaging/mentions/query.ex',
  'messaging/mentions/persist.ex',
  'messaging/notifications/query.ex',
  'messaging/notifications/persist.ex',
  'messaging/commands/send_mention.ex',
  'messaging/commands/send_notification.ex',
  'messaging/commands/revoke_notification.ex',
  'messaging/commands/mark_read.ex',
  'messaging/commands/mark_read_all.ex',
  'messaging/inbox/persist.ex',
  'public_cache/persist.ex',
  'public_cache/workflow.ex',
]

const removedLegacyFiles = [
  'accounts/collect_folders/write.ex',
  'accounts/fans/actions.ex',
  'accounts/profiles/user_read.ex',
  'accounts/profiles/subscribe.ex',
  'messaging/mentions.ex',
  'messaging/notifications.ex',
  'messaging/inbox/read_state.ex',
  'accounts/achievements/reputation.ex',
]

/** Returns executable lines while preserving source line numbers. */
export const executableLines = (source) => maskElixir(source).split('\n')

/** Checks the migrated facade and owner manifest. */
export const backendContextBoundaryFindings = (root = backendRoot) => {
  const result = []
  const addResult = (category, file, message, line = 1) =>
    result.push({ category, file: relative(file), line, message })

  for (const file of requiredOwnerFiles) {
    if (!existsSync(path.join(root, file))) {
      addResult('missing_owner', file, 'required migrated owner file is missing')
    }
  }

  for (const file of removedLegacyFiles) {
    if (existsSync(path.join(root, file))) {
      addResult('legacy_owner', file, 'legacy Writer/Actions/read owner still exists')
    }
  }

  for (const file of facadeFiles) {
    const absolute = path.join(root, file)
    if (!existsSync(absolute)) {
      addResult('missing_facade', file, 'migrated facade file is missing')
      continue
    }

    executableLines(readFileSync(absolute, 'utf8')).forEach((line, index) => {
      if (/\b(?:Repo|Transaction|ORM)\./.test(line)) {
        addResult(
          'facade_persistence',
          file,
          'facade contains direct persistence, transaction, or ORM access',
          index + 1,
        )
      }
    })
  }

  for (const file of persistFiles) {
    const absolute = path.join(root, file)
    if (!existsSync(absolute)) continue

    executableLines(readFileSync(absolute, 'utf8')).forEach((line, index) => {
      if (/\bRepo\.transaction\s*\(/.test(line) || /\bTransaction\.(?:run|lock_global)\s*\(/.test(line)) {
        addResult(
          'persist_transaction',
          file,
          'Persist/projection contains transaction ownership',
          index + 1,
        )
      }
    })
  }

  return result
}

const format = (items) =>
  items.map(({ category, file, line, message }) => `- ${file}:${line}: ${category}: ${message}`)

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = backendContextBoundaryFindings()
  console.log(`Backend context module boundary report: ${result.length} findings`)
  if (result.length) console.log(format(result).join('\n'))

  const strict = process.argv.includes('--strict')
  if (strict && result.length) process.exitCode = 1
  else if (!strict) console.log('This is a report-only migrated-context inventory.')
}
