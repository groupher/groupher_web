import { existsSync, lstatSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const legacyOwners = [
  { owner: 'CMS.Policy', pattern: /CMS\.Policy/ },
  { owner: 'PublicCache.Policy', pattern: /PublicCache\.Policy/ },
  { owner: 'Comments.JobPolicy', pattern: /Comments\.JobPolicy/ },
  { owner: 'NamePolicy', pattern: /\bNamePolicy(?:\b|Test\b)/ },
]

const activeRoots = [
  'backend/api/lib',
  'backend/api/test',
  'backend/api/config',
  'docs/architecture/policy.md',
  'docs/apply/v1.md',
  'docs/feature/gate/v2.md',
  'docs/deploy/cloudflare.md',
  'docs/feature/interaction/v4.md',
]

const reportRoots = [
  ...activeRoots,
  'docs/architecture',
  'docs/migrations',
  'backend/api/priv/pipeline_graph.json',
]

const ignoredDirectories = new Set(['_build', 'deps', 'node_modules', 'dist', '.git'])
const textExtensions = new Set(['.ex', '.exs', '.md', '.json', '.mjs', '.js', '.ts', '.yml', '.yaml'])

const relative = (absolutePath) => path.relative(repoRoot, absolutePath)

/** Returns whether a source line matches the registered legacy owner pattern. */
export const matchesLegacyOwner = (owner, source) => {
  const legacyOwner = legacyOwners.find((entry) => entry.owner === owner)
  return legacyOwner?.pattern.test(source) ?? false
}

const collectFiles = (root) => {
  const absoluteRoot = path.resolve(repoRoot, root)
  if (!existsSync(absoluteRoot)) return []

  if (lstatSync(absoluteRoot).isFile()) {
    return textExtensions.has(path.extname(absoluteRoot)) ? [absoluteRoot] : []
  }

  const stat = readdirSync(absoluteRoot, { withFileTypes: true })

  return stat.flatMap((entry) => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return []
    return collectFiles(path.relative(repoRoot, path.join(absoluteRoot, entry.name)))
  })
}

/** Classifies a source path for blocking or report-only Policy boundary checks. */
export const classify = (file) => {
  if (file.startsWith('docs/migrations/')) return 'historical'
  if (file === 'backend/api/priv/pipeline_graph.json') return 'generated'
  if (file.startsWith('docs/architecture/backend-module-reorganization')) return 'historical'
  if (file.startsWith('docs/architecture/cms-facade-directory')) return 'historical'
  if (file === 'docs/architecture/public-cache-invalidation.md') return 'historical'
  if (file === 'docs/architecture/article-stats-target.md') return 'historical'
  return 'active'
}

/** Returns legacy Policy owner references for the requested source roots. */
export const policyBoundaryFindings = (roots = reportRoots) => {
  const findings = []
  const seen = new Set()

  for (const root of roots) {
    for (const file of collectFiles(root)) {
      const fileName = relative(file)
      if (seen.has(fileName)) continue
      seen.add(fileName)

      const lines = readFileSync(file, 'utf8').split(/\r?\n/)
      lines.forEach((source, index) => {
        for (const { owner } of legacyOwners) {
          if (!matchesLegacyOwner(owner, source)) continue
          findings.push({
            path: fileName,
            line: index + 1,
            owner,
            classification: classify(fileName),
            source: source.trim(),
          })
        }
      })
    }
  }

  return findings
}

/** Returns blocking findings from current runtime and contract roots. */
export const activePolicyBoundaryFindings = () =>
  policyBoundaryFindings(activeRoots).filter(({ classification }) => classification === 'active')

const findings = policyBoundaryFindings()
const activeFindings = findings.filter(({ classification }) => classification === 'active')
const reportFindings = findings.filter(({ classification }) => classification !== 'active')
const strict = process.argv.includes('--check')

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  console.log(`Policy boundary active findings: ${activeFindings.length}`)
  for (const finding of activeFindings) {
    console.log(`${finding.path}:${finding.line} [${finding.owner}] ${finding.source}`)
  }

  console.log(`Policy boundary historical/generated findings: ${reportFindings.length}`)
  for (const finding of reportFindings) {
    console.log(
      `${finding.classification} ${finding.path}:${finding.line} [${finding.owner}] ${finding.source}`,
    )
  }

  if (strict && activeFindings.length > 0) process.exitCode = 1
}
