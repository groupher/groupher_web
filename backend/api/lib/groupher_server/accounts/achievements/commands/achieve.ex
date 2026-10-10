defmodule GroupherServer.Accounts.Achievements.Commands.Achieve do
  @moduledoc """
  Owns serialized achievement counter changes.

      achievement command -> advisory transaction lock -> Persist -> row update
  """

  alias GroupherServer.Accounts
  alias Accounts.Model.{Achievement, User}
  alias Accounts.Achievements.Persist
  alias GroupherServer.Accounts.Config
  alias Helper.Transaction

  @collect_weight Config.achieve_collect_weight()
  @upvote_weight Config.achieve_upvote_weight()
  @follow_weight Config.achieve_follow_weight()

  @doc """
  Applies one increment or decrement to a supported achievement counter.

  ## Examples

      Accounts.Achievements.Commands.Achieve.run(user, :inc, :follow)
  """
  @spec run(User.t(), :inc | :dec, :follow | :upvote | :collect) ::
          {:ok, Achievement.t()} | {:error, term()}
  def run(%User{id: user_id}, operation, key) do
    Transaction.lock_global("achievement:user:#{user_id}", fn ->
      with {:ok, _} <- Persist.ensure(user_id),
           {:ok, achievement} <- Persist.find(user_id),
           {:ok, attrs} <- counter_attrs(achievement, operation, key) do
        Persist.update(achievement, attrs)
      end
    end)
  end

  @doc """
  Decreases the collect achievement count by a bounded amount.

  ## Examples

      Accounts.Achievements.Commands.Achieve.downgrade(user, :collect, 1)
  """
  @spec downgrade(User.t(), :collect, non_neg_integer()) ::
          {:ok, Achievement.t()} | {:error, term()}
  def downgrade(%User{id: user_id}, :collect, count) do
    Transaction.lock_global("achievement:user:#{user_id}", fn ->
      with {:ok, achievement} <- Persist.find(user_id) do
        attrs = %{
          articles_collects_count: max(achievement.articles_collects_count - count, 0),
          reputation: max(achievement.reputation - count * @collect_weight, 0)
        }

        Persist.update(achievement, attrs)
      end
    end)
  end

  defp counter_attrs(achievement, :inc, :follow) do
    {:ok,
     %{
       followers_count: achievement.followers_count + 1,
       reputation: achievement.reputation + @follow_weight
     }}
  end

  defp counter_attrs(achievement, :dec, :follow) do
    {:ok,
     %{
       followers_count: max(achievement.followers_count - 1, 0),
       reputation: max(achievement.reputation - @follow_weight, 0)
     }}
  end

  defp counter_attrs(achievement, :inc, :upvote) do
    {:ok,
     %{
       articles_upvotes_count: achievement.articles_upvotes_count + 1,
       reputation: achievement.reputation + @upvote_weight
     }}
  end

  defp counter_attrs(achievement, :dec, :upvote) do
    {:ok,
     %{
       articles_upvotes_count: max(achievement.articles_upvotes_count - 1, 0),
       reputation: max(achievement.reputation - @upvote_weight, 0)
     }}
  end

  defp counter_attrs(achievement, :inc, :collect) do
    {:ok,
     %{
       articles_collects_count: achievement.articles_collects_count + 1,
       reputation: achievement.reputation + @collect_weight
     }}
  end

  defp counter_attrs(achievement, :dec, :collect) do
    {:ok,
     %{
       articles_collects_count: max(achievement.articles_collects_count - 1, 0),
       reputation: max(achievement.reputation - @collect_weight, 0)
     }}
  end

  defp counter_attrs(_achievement, _operation, _key), do: {:error, :unsupported_achievement}
end
