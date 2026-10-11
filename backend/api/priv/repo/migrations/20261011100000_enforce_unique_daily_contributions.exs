defmodule GroupherServer.Repo.Migrations.EnforceUniqueDailyContributions do
  use Ecto.Migration

  def up do
    execute("""
    WITH totals AS (
      SELECT MIN(id) AS keep_id, user_id, date, SUM(count) AS total_count
      FROM statistics.user_contributes
      GROUP BY user_id, date
    )
    UPDATE statistics.user_contributes AS contribution
    SET count = totals.total_count
    FROM totals
    WHERE contribution.id = totals.keep_id
    """)

    execute("""
    DELETE FROM statistics.user_contributes AS contribution
    USING statistics.user_contributes AS keeper
    WHERE contribution.user_id = keeper.user_id
      AND contribution.date = keeper.date
      AND contribution.id > keeper.id
    """)

    execute("""
    WITH totals AS (
      SELECT MIN(id) AS keep_id, community_id, date, SUM(count) AS total_count
      FROM statistics.community_contributes
      GROUP BY community_id, date
    )
    UPDATE statistics.community_contributes AS contribution
    SET count = totals.total_count
    FROM totals
    WHERE contribution.id = totals.keep_id
    """)

    execute("""
    DELETE FROM statistics.community_contributes AS contribution
    USING statistics.community_contributes AS keeper
    WHERE contribution.community_id = keeper.community_id
      AND contribution.date = keeper.date
      AND contribution.id > keeper.id
    """)

    create(unique_index(:user_contributes, [:user_id, :date], prefix: "statistics"))
    create(unique_index(:community_contributes, [:community_id, :date], prefix: "statistics"))
  end

  def down do
    drop(index(:community_contributes, [:community_id, :date], prefix: "statistics"))
    drop(index(:user_contributes, [:user_id, :date], prefix: "statistics"))
  end
end
