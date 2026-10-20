import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { maskElixir } from './check-cms-context-module-boundary.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const backendRoot = path.join(repoRoot, 'backend', 'api', 'lib')
const manifestPath = path.join(repoRoot, 'backend', 'api', 'priv', 'pagination_inventory.json')

const sourceFiles = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) return sourceFiles(absolute)
    return entry.isFile() && entry.name.endsWith('.ex') ? [absolute] : []
  })

const relativePath = (file) => path.relative(repoRoot, file).split(path.sep).join('/')

const functionAt = (lines, index) => {
  for (let cursor = index; cursor >= 0; cursor -= 1) {
    const match = lines[cursor].match(/^\s*defp?\s+([a-z_][A-Za-z0-9_!?]*)/)
    if (match) return match[1]
  }
  return null
}

const dispositionFor = (source) => {
  if (source.endsWith('accounts/collect_folders/articles.ex')) return 'embedded_collection'
  if (source.endsWith('cms/communities/count.ex')) return 'aggregate'
  if (source.includes('cms/artiment_mentions/store.ex')) return 'internal_bounded_or_pagi'
  if (source.includes('accounts/search/user.ex') || source.includes('cms/search/community.ex')) {
    return 'public_search_pagi'
  }
  if (source.endsWith('accounts/profiles/list.ex')) return 'standard_pagi_or_synthetic'
  return 'standard_pagi'
}

/** Builds the legacy paginator manifest used by the migration gate. */
export const paginationInventory = (root = backendRoot) => {
  const entries = []
  const helperDefinitions = []
  const seenHelperDefinitions = new Set()

  for (const file of sourceFiles(root)) {
    const source = readFileSync(file, 'utf8')
    const masked = maskElixir(source)
    const sourceRelative = relativePath(file)
    const lines = masked.split('\n')

    lines.forEach((line, index) => {
      const lineNumber = index + 1
      const helperDefinition = line.match(/^\s*def\s+(paginator|embeds_paginator)\s*\(/)
      if (
        helperDefinition &&
        sourceRelative === 'backend/api/lib/helper/orm.ex' &&
        !seenHelperDefinitions.has(helperDefinition[1])
      ) {
        seenHelperDefinitions.add(helperDefinition[1])
        helperDefinitions.push({
          disposition: 'delete_after_runtime_migration',
          function: helperDefinition[1],
          kind: 'helper_definition',
          line: lineNumber,
          source: sourceRelative,
        })
      }

      const matches = [...line.matchAll(/\b(ORM\.(?:paginator|embeds_paginator)|Repo\.paginate)\s*\(/g)]
      for (const match of matches) {
        const isHelperRepoAdapter = sourceRelative === 'backend/api/lib/helper/orm.ex'
        const kind = isHelperRepoAdapter ? 'helper_definition' : 'executable_call'
        entries.push({
          disposition: isHelperRepoAdapter
            ? 'delete_after_runtime_migration'
            : dispositionFor(sourceRelative),
          function: functionAt(lines, index),
          kind,
          line: lineNumber,
          symbol: match[1],
          source: sourceRelative,
        })
      }
    })
  }

  entries.sort((left, right) => left.source.localeCompare(right.source) || left.line - right.line)
  helperDefinitions.sort((left, right) => left.line - right.line)

  const executable = entries.filter((entry) => entry.kind === 'executable_call')
  return {
    generated_from: 'backend/api/lib',
    schema: 1,
    scope: {
      excluded: ['documentation strings/comments after Elixir masking'],
      mode: 'report_only',
      note: 'Candidates require surface, identity, query-budget and consumer review; this manifest is not a strict gate.',
    },
    summary: {
      executable_calls: executable.length,
      executable_files: new Set(executable.map((entry) => entry.source)).size,
      helper_definitions: helperDefinitions.length,
      raw_matches: entries.length,
    },
    helper_definitions: helperDefinitions,
    entries,
  }
}

const report = (manifest) => {
  const { summary } = manifest
  return [
    `Legacy pagination inventory: ${summary.executable_calls} executable calls in ${summary.executable_files} files`,
    `Raw matches: ${summary.raw_matches}; helper definitions: ${summary.helper_definitions}`,
    ...manifest.entries.map(
      (entry) =>
        `- ${entry.source}:${entry.line} ${entry.function ?? '<unknown>'} ${entry.symbol ?? entry.function} [${entry.kind}; ${entry.disposition}]`,
    ),
  ].join('\n')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const manifest = paginationInventory()
  console.log(report(manifest))

  if (process.argv.includes('--strict')) {
    const { executable_calls, helper_definitions } = manifest.summary

    if (executable_calls > 0 || helper_definitions > 0) {
      console.error('Legacy pagination strict gate failed: migrate all executable calls and helpers first.')
      process.exit(1)
    }

    console.log('Legacy pagination strict gate passed.')
  }

  if (process.argv.includes('--check')) {
    if (!existsSync(manifestPath)) {
      console.error(`Missing ${relativePath(manifestPath)}; run with --write first.`)
      process.exit(1)
    }

    const expected = `${JSON.stringify(manifest, null, 2)}\n`
    const actual = readFileSync(manifestPath, 'utf8')
    if (actual !== expected) {
      console.error(`Stale ${relativePath(manifestPath)}; run with --write first.`)
      process.exit(1)
    }
    console.log(`Pagination inventory is fresh: ${relativePath(manifestPath)}`)
  }

  if (process.argv.includes('--write')) {
    mkdirSync(path.dirname(manifestPath), { recursive: true })
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
    console.log(`Wrote ${relativePath(manifestPath)}`)
  }
}
