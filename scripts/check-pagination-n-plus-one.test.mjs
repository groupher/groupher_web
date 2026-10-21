import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { paginationNPlusOneInventory } from './check-pagination-n-plus-one.mjs'

test('reports only explicitly classified background collection reads', () => {
  const manifest = paginationNPlusOneInventory()

  assert.equal(manifest.scope.mode, 'report_only')
  assert.equal(manifest.summary.findings, 1)

  const [searchFinding] = manifest.findings
  assert.equal(searchFinding.source, 'backend/api/lib/groupher_server/cms/search_artiments/indexer.ex')
  assert.equal(searchFinding.function, 'public_article_for')
  assert.equal(searchFinding.line, 224)
  assert.equal(searchFinding.symbol, 'FrontDesk.article')
  assert.equal(searchFinding.disposition, 'background_exception')
  assert.equal(searchFinding.path_kind, 'background')
  assert.equal(
    manifest.findings.some((finding) => finding.source === 'backend/api/lib/groupher_server/cms/press/query.ex'),
    false,
  )
  assert.equal(manifest.findings.some((finding) => finding.source.includes('/test/')), false)
})

test('reports inline helper captures with question-mark function names', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'pagination-n-plus-one-'))

  try {
    writeFileSync(
      path.join(root, 'fixture.ex'),
      [
        'defmodule PaginationNPlusOneFixture do',
        '  defp collect_usages(rows, actor) do',
        '    Enum.filter(rows, &usage_visible?(&1, actor))',
        '  end',
        '',
        '  defp usage_visible?(row, actor) do',
        '    Gate.with_community_check(actor, :edit, row.community, row, fn _ -> {:ok, row} end)',
        '  end',
        'end',
        ''
      ].join('\n'),
    )

    const manifest = paginationNPlusOneInventory(root)
    const finding = manifest.findings.find(
      (item) => item.source.endsWith('/fixture.ex') && item.function === 'usage_visible?',
    )

    assert.equal(finding?.kind, 'collection_helper_read')
    assert.equal(finding?.symbol, 'Gate.with_community_check')
    assert.equal(finding?.disposition, 'requires_migration')
    assert.equal(finding?.path_kind, 'request')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('reports direct helper calls from collection builders', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'pagination-n-plus-one-'))

  try {
    writeFileSync(
      path.join(root, 'fixture.ex'),
      [
        'defmodule PaginationNPlusOneFixture do',
        '  defp build_items(rows, actor) do',
        '    Enum.map(rows, fn row -> decision(row, actor) end)',
        '  end',
        '',
        '  defp decision(row, actor) do',
        '    Gate.with_community_check(actor, :edit, row.community, row, fn _ -> {:ok, row} end)',
        '  end',
        'end',
        ''
      ].join('\n'),
    )

    const manifest = paginationNPlusOneInventory(root)
    const finding = manifest.findings.find(
      (item) => item.source.endsWith('/fixture.ex') && item.function === 'decision',
    )

    assert.equal(finding?.kind, 'collection_helper_read')
    assert.equal(finding?.via_function, 'build_items')
    assert.equal(finding?.symbol, 'Gate.with_community_check')
    assert.equal(finding?.disposition, 'requires_migration')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('reports Repo and FrontDesk reads hidden behind collection helpers', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'pagination-n-plus-one-'))

  try {
    writeFileSync(
      path.join(root, 'fixture.ex'),
      [
        'defmodule PaginationNPlusOneFixture do',
        '  defp build_items(rows) do',
        '    Enum.map(rows, fn row -> {load_item(row), load_public(row)} end)',
        '  end',
        '',
        '  defp load_item(row) do',
        '    Repo.get_by(Article, id: row.article_id)',
        '  end',
        '',
        '  defp load_public(row) do',
        '    FrontDesk.article(row.path)',
        '  end',
        'end',
        '',
      ].join('\n'),
    )

    const manifest = paginationNPlusOneInventory(root)
    const repoFinding = manifest.findings.find(
      (item) => item.source.endsWith('/fixture.ex') && item.function === 'load_item',
    )
    const frontDeskFinding = manifest.findings.find(
      (item) => item.source.endsWith('/fixture.ex') && item.function === 'load_public',
    )

    assert.equal(repoFinding?.kind, 'collection_helper_read')
    assert.equal(repoFinding?.symbol, 'Repo.get_by')
    assert.equal(repoFinding?.via_function, 'build_items')
    assert.equal(frontDeskFinding?.kind, 'collection_helper_read')
    assert.equal(frontDeskFinding?.symbol, 'FrontDesk.article')
    assert.equal(frontDeskFinding?.via_function, 'build_items')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('does not treat qualified Map calls as local helper references', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'pagination-n-plus-one-'))

  try {
    writeFileSync(
      path.join(root, 'fixture.ex'),
      [
        'defmodule PaginationNPlusOneFixture do',
        '  defp list(rows) do',
        '    Enum.map(rows, &Map.get(&1, :id))',
        '  end',
        '',
        '  defp get(row) do',
        '    Repo.get(Article, row.id)',
        '  end',
        'end',
        '',
      ].join('\n'),
    )

    const manifest = paginationNPlusOneInventory(root)
    assert.equal(manifest.findings.some((item) => item.source.endsWith('/fixture.ex')), false)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
