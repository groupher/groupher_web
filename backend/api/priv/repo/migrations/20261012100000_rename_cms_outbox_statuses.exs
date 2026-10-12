defmodule GroupherServer.Repo.Migrations.RenameCmsOutboxStatuses do
  use Ecto.Migration

  def up do
    # The application vocabulary changed, but rewriting a live enum-like text
    # column would make the old and new releases mutually unreadable during a
    # rolling deploy. `CMS.Outbox.Status` maps the new application atoms onto
    # the durable legacy database vocabulary instead.
    :ok
  end

  def down, do: :ok
end
