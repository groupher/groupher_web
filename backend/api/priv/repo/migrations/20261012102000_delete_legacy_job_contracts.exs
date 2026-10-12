defmodule GroupherServer.Repo.Migrations.DeleteLegacyJobContracts do
  use Ecto.Migration

  @obsolete_workers [
    "GroupherServer.Jobs.Later",
    "GroupherServer.CMS.Outbox.Workers.Article.Cleanup",
    "GroupherServer.CMS.Outbox.Workers.Asset.Cleanup",
    "GroupherServer.CMS.Outbox.Workers.Comment.Cleanup",
    "GroupherServer.CMS.Outbox.Workers.Community.Cleanup",
    "GroupherServer.CMS.Outbox.Workers.Interaction.Cleanup",
    "GroupherServer.CMS.Communities.Jobs.Setup",
    "GroupherServer.CMS.CommunityApplications.Jobs.CreateCommunity",
    "GroupherServer.CMS.CommunityApplications.Jobs.ExpireLogoUploads",
    "GroupherServer.CMS.CommunityApplications.Jobs.ExpireSubmitted",
    "GroupherServer.PublicCache.PurgeWorker",
    "GroupherServer.CMS.Communities.Jobs.ReleaseExpiredSlugClaims"
  ]

  def up do
    workers = Enum.map_join(@obsolete_workers, ", ", &"'#{&1}'")

    execute("""
    DELETE FROM public.oban_jobs
    WHERE worker IN (#{workers})
    """)
  end

  def down do
    raise "Deleted jobs referenced removed Worker modules and cannot be restored"
  end
end
