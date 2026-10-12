defmodule GroupherServer.Repo.Migrations.DeleteLegacyProfileVisitJobs do
  use Ecto.Migration

  def up do
    execute("""
    DELETE FROM public.oban_jobs
    WHERE worker = 'GroupherServer.Jobs.ProfileVisit'
    """)
  end

  def down do
    raise "Deleted ProfileVisit jobs referenced a removed Worker and cannot be restored"
  end
end
