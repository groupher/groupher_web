import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'

import { browserGraphQLRequest } from '~/graphql/client'
import useTrans from '~/hooks/useTrans'
import { invalidateExact } from '~/query/invalidation/executor'

import { reviewConfig, updateReviewConfig } from './schema'

type TProps = { community: string; scopeKind: 'COMMUNITY' | 'PLATFORM' }
type TSubject = 'ARTICLE' | 'COMMENT' | 'DOC'

export default function ReviewSettings({ community, scopeKind }: TProps) {
  const { t } = useTrans()
  const client = useQueryClient()
  const [subject, setSubject] = useState<TSubject>('ARTICLE')
  const selectedSubject = scopeKind === 'COMMUNITY' && subject === 'DOC' ? 'ARTICLE' : subject
  const commandIdRef = useRef<{ key: string; id: string } | null>(null)
  const scope = scopeKind === 'PLATFORM' ? { kind: scopeKind } : { kind: scopeKind, community }
  const configQuery = useQuery({
    queryKey: ['alert-board-config', community, scopeKind, selectedSubject],
    queryFn: async () => {
      const response = await browserGraphQLRequest(reviewConfig, {
        scope,
        subjectKind: selectedSubject,
      })
      return response.reviewConfig
    },
  })

  const save = useMutation({
    mutationFn: async ({ data, version }: { data: FormData; version: number }) => {
      const rules = JSON.parse(String(data.get('rules'))) as {
        items: Array<Record<string, unknown>>
      }
      const modalities = String(data.get('modalities'))
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
      const config = {
        publishMode:
          selectedSubject === 'DOC'
            ? 'IMMEDIATE'
            : (String(data.get('publishMode')) as 'IMMEDIATE' | 'AI_FIRST' | 'HUMAN_FIRST'),
        editMode:
          selectedSubject === 'DOC'
            ? 'IMMEDIATE'
            : (String(data.get('editMode')) as 'IMMEDIATE' | 'AI_FIRST'),
        backgroundCheck: data.get('backgroundCheck') === 'on',
        // The repository's GraphQL Json scalar accepts a JSON-encoded string.
        rules: JSON.stringify(rules),
        prompt: String(data.get('prompt')).trim() || null,
        providerProfile: String(data.get('profile')).trim() || null,
        requiredModalities: modalities,
      }
      const intentKey = JSON.stringify([scope, selectedSubject, version, config])
      if (commandIdRef.current?.key !== intentKey) {
        commandIdRef.current = { key: intentKey, id: crypto.randomUUID() }
      }
      return browserGraphQLRequest(updateReviewConfig, {
        commandId: commandIdRef.current.id,
        input: {
          scope,
          subjectKind: selectedSubject,
          expectedVersion: version,
          config,
        },
      })
    },
    onSuccess: async () => {
      commandIdRef.current = null
      await invalidateExact(client, [
        { queryKey: ['alert-board-config', community, scopeKind, selectedSubject] },
      ])
    },
  })

  return (
    <section className='mx-auto max-w-3xl px-5 py-8'>
      <h1 className='mb-5 text-xl font-semibold'>{t('alert_board.settings')}</h1>
      <label className='mb-5 block text-sm'>
        {t('alert_board.content_type')}
        <select
          className='border-divider mt-2 block rounded-md border bg-transparent p-2'
          value={selectedSubject}
          onChange={(event) => {
            setSubject(event.target.value as TSubject)
          }}
        >
          {scopeKind === 'PLATFORM' && <option value='DOC'>{t('alert_board.doc')}</option>}
          <option value='ARTICLE'>{t('alert_board.article')}</option>
          <option value='COMMENT'>{t('alert_board.comment')}</option>
        </select>
      </label>
      {configQuery.isPending ? (
        <p className='text-digest text-sm'>{t('alert_board.loading')}</p>
      ) : configQuery.isError ? (
        <p role='alert' className='text-sm text-red-600'>
          {t('alert_board.config_error')}
        </p>
      ) : (
        <form
          key={`${selectedSubject}:${configQuery.data.version}`}
          className='grid gap-4'
          onSubmit={(event) => {
            event.preventDefault()
            save.mutate({
              data: new FormData(event.currentTarget),
              version: configQuery.data.version,
            })
          }}
        >
          <label className='text-sm'>
            {t('alert_board.publish_mode')}
            <select
              className='border-divider mt-2 block w-full rounded-md border bg-transparent p-2'
              name='publishMode'
              defaultValue={selectedSubject === 'DOC' ? 'IMMEDIATE' : configQuery.data.publishMode}
              disabled={selectedSubject === 'DOC'}
            >
              <option value='IMMEDIATE'>{t('alert_board.mode.immediate')}</option>
              {selectedSubject !== 'DOC' && (
                <>
                  <option value='AI_FIRST'>{t('alert_board.mode.ai_first')}</option>
                  <option value='HUMAN_FIRST'>{t('alert_board.mode.human_first')}</option>
                </>
              )}
            </select>
          </label>
          <label className='text-sm'>
            {t('alert_board.edit_mode')}
            <select
              className='border-divider mt-2 block w-full rounded-md border bg-transparent p-2'
              name='editMode'
              defaultValue={selectedSubject === 'DOC' ? 'IMMEDIATE' : configQuery.data.editMode}
              disabled={selectedSubject === 'DOC'}
            >
              <option value='IMMEDIATE'>{t('alert_board.mode.immediate')}</option>
              {selectedSubject !== 'DOC' && (
                <option value='AI_FIRST'>{t('alert_board.mode.ai_first')}</option>
              )}
            </select>
          </label>
          <label className='flex items-center gap-2 text-sm'>
            <input
              type='checkbox'
              name='backgroundCheck'
              defaultChecked={configQuery.data.backgroundCheck}
            />
            {t('alert_board.background_check')}
          </label>
          <label className='text-sm'>
            {t('alert_board.word_rules_json')}
            <textarea
              className='border-divider mt-2 min-h-40 w-full rounded-md border bg-transparent p-3 font-mono text-xs'
              name='rules'
              defaultValue={JSON.stringify(configQuery.data.rules ?? { items: [] }, null, 2)}
            />
          </label>
          <label className='text-sm'>
            {t('alert_board.prompt')}
            <textarea
              className='border-divider mt-2 min-h-24 w-full rounded-md border bg-transparent p-3 text-sm'
              name='prompt'
              defaultValue={configQuery.data.prompt ?? ''}
            />
          </label>
          <label className='text-sm'>
            {t('alert_board.provider_profile')}
            <input
              className='border-divider mt-2 block w-full rounded-md border bg-transparent p-2'
              name='profile'
              defaultValue={configQuery.data.providerProfile ?? ''}
            />
          </label>
          <label className='text-sm'>
            {t('alert_board.modalities')}
            <input
              className='border-divider mt-2 block w-full rounded-md border bg-transparent p-2'
              name='modalities'
              defaultValue={configQuery.data.requiredModalities.join(',') || 'text'}
            />
          </label>
          {save.isError && (
            <p role='alert' className='text-sm text-red-600'>
              {t('alert_board.save_error')}
            </p>
          )}
          <button
            type='submit'
            disabled={save.isPending}
            className='border-divider w-fit rounded-md border px-4 py-2 text-sm disabled:opacity-50'
          >
            {save.isPending ? t('alert_board.saving') : t('alert_board.save')}
          </button>
        </form>
      )}
    </section>
  )
}
