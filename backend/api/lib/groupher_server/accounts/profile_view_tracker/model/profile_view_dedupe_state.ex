defmodule GroupherServer.Accounts.ProfileViewTracker.Model.ProfileViewDedupeState do
  @moduledoc """
  Sliding-window dedupe state for one Profile and stable viewer identity.

      policy-admitted Profile view -> conditional UPSERT -> counted or duplicate
  """

  use Ecto.Schema

  alias GroupherServer.Accounts.Model.User
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.account()
  @primary_key false

  schema "profile_view_dedupe_states" do
    belongs_to(:profile, User)
    field(:viewer_tracking_key, :binary)
    field(:last_counted_at, :utc_datetime)
    field(:expires_at, :utc_datetime)

    timestamps(type: :utc_datetime)
  end
end
