defmodule GroupherServer.Jobs.WallpaperLifecycle do
  @moduledoc """
  Reconciles Wallpaper receipts, retired revisions, and abandoned generated assets.

  The operation is idempotent, so Oban may retry safely after partial external
  object deletion or a process crash.

      Oban cron
        -> Wallpaper lifecycle reconciliation
        -> expired receipts / revisions / orphan assets
        -> database cleanup and Assets Hub deletion queue
  """

  use Oban.Worker, queue: :default, max_attempts: 3

  @doc """
  Runs one idempotent Wallpaper lifecycle reconciliation and reports retryable errors to Oban.

  ## Examples

      perform(%Oban.Job{})
  """
  @impl Oban.Worker
  def perform(%Oban.Job{}) do
    case GroupherServer.CMS.wallpaper_reconcile_lifecycle() do
      {:ok, _summary} -> {:ok, :pass}
      {:error, reason} -> {:error, reason}
    end
  end
end
