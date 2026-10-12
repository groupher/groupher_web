defmodule GroupherServer.Repo.Migrations.ExcludeFutureUserContributionsFromProjections do
  use Ecto.Migration

  def up do
    execute("""
    WITH affected_users AS (
      SELECT DISTINCT contributions.user_id
      FROM statistics.user_contributes AS contributions
      WHERE contributions.date > CURRENT_DATE
    ),
    digests AS (
      SELECT
        affected_users.user_id,
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
      FROM affected_users
      LEFT JOIN statistics.user_contributes AS contributions
        ON contributions.user_id = affected_users.user_id
       AND contributions.date >= CURRENT_DATE - INTERVAL '6 months'
       AND contributions.date <= CURRENT_DATE
      GROUP BY affected_users.user_id
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
    """)
  end

  def down, do: :ok
end
