defmodule GroupherServer.Accounts.Config do
  @moduledoc """
  Static configuration contract for accounts.

  Business position:

      Application env -> Accounts.Config -> account command/query policies
  """

  @general_config Application.compile_env(:groupher_server, :general, [])

  @type t :: %__MODULE__{
          default_subscribed_communities: pos_integer(),
          achieve_upvote_weight: non_neg_integer(),
          achieve_collect_weight: non_neg_integer(),
          achieve_follow_weight: non_neg_integer()
        }

  defstruct default_subscribed_communities:
              Keyword.get(@general_config, :default_subscribed_communities),
            achieve_upvote_weight: Keyword.get(@general_config, :user_achieve_upvote_weight),
            achieve_collect_weight: Keyword.get(@general_config, :user_achieve_collect_weight),
            achieve_follow_weight: Keyword.get(@general_config, :user_achieve_follow_weight)

  @doc """
  Returns the immutable account configuration snapshot.

  ## Examples

      Accounts.Config.base()
  """
  @spec base() :: t()
  def base, do: %__MODULE__{}

  @doc """
  Returns the default subscribed-community count.

  ## Examples

      Accounts.Config.default_subscribed_communities()
  """
  @spec default_subscribed_communities() :: pos_integer()
  def default_subscribed_communities, do: base().default_subscribed_communities

  @doc """
  Returns the achievement weight assigned to an upvote.

  ## Examples

      Accounts.Config.achieve_upvote_weight()
  """
  @spec achieve_upvote_weight() :: non_neg_integer()
  def achieve_upvote_weight, do: base().achieve_upvote_weight

  @doc """
  Returns the achievement weight assigned to a collect.

  ## Examples

      Accounts.Config.achieve_collect_weight()
  """
  @spec achieve_collect_weight() :: non_neg_integer()
  def achieve_collect_weight, do: base().achieve_collect_weight

  @doc """
  Returns the achievement weight assigned to a follow.

  ## Examples

      Accounts.Config.achieve_follow_weight()
  """
  @spec achieve_follow_weight() :: non_neg_integer()
  def achieve_follow_weight, do: base().achieve_follow_weight
end
