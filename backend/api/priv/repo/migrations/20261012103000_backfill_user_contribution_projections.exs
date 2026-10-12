defmodule GroupherServer.Repo.Migrations.BackfillUserContributionProjections do
  use Ecto.Migration

  def up do
    execute("""
    WITH digests AS (
      SELECT
        users.id AS user_id,
        COALESCE(SUM(contributions.count), 0)::integer AS total_count,
        COALESCE(
          jsonb_agg(
            jsonb_build_object(
              'date', to_char(contributions.date, 'YYYY-MM-DD'),
              'count', contributions.count
            )
            ORDER BY contributions.date
          ) FILTER (WHERE contributions.id IS NOT NULL),
          '[]'::jsonb
        ) AS records
      FROM account.users AS users
      LEFT JOIN statistics.user_contributes AS contributions
        ON contributions.user_id = users.id
       AND contributions.date >= CURRENT_DATE - INTERVAL '6 months'
      WHERE users.contributes IS NULL
      GROUP BY users.id
    )
    UPDATE account.users AS users
    SET contributes = jsonb_build_object(
      'start_date', to_char(CURRENT_DATE - INTERVAL '6 months', 'YYYY-MM-DD'),
      'end_date', to_char(CURRENT_DATE, 'YYYY-MM-DD'),
      'total_count', digests.total_count,
      'records', digests.records
    )
    FROM digests
    WHERE users.id = digests.user_id
      AND users.contributes IS NULL
    """)
  end

  def down, do: :ok
end
