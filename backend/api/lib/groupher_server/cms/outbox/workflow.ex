defmodule GroupherServer.CMS.Outbox.Workflow do
  @moduledoc """
  Owns post-commit delivery of CMS outbox events.

      Jobs worker -> CMS facade -> Outbox.Workflow -> persistence and effects
  """

  alias __MODULE__.{Article, Asset, Comment, Community, Interaction}

  @spec perform(atom(), Oban.Job.t()) :: Oban.Worker.result()
  def perform(:article, job), do: Article.perform(job)
  def perform(:asset, job), do: Asset.perform(job)
  def perform(:comment, job), do: Comment.perform(job)
  def perform(:community, job), do: Community.perform(job)
  def perform(:interaction, job), do: Interaction.perform(job)
end
