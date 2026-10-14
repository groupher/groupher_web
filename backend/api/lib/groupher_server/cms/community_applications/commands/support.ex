defmodule GroupherServer.CMS.CommunityApplications.Commands.Support do
  @moduledoc """
  Shared target and Confirmation handling for application Commands.

      Command -> Support target/confirmation -> Receipt recovery -> application result
  """

  alias GroupherServer.CMS
  alias CMS.Communities.ErrorCat
  alias CMS.Model.CommunityApplication
  alias CMS.CommunityApplications.Query

  def application(%CommunityApplication{} = application), do: {:ok, application}

  def application(public_ref) when is_binary(public_ref) do
    case Query.application(public_ref) do
      %CommunityApplication{} = application -> {:ok, application}
      nil -> {:error, ErrorCat.application_not_found()}
    end
  end

  def confirmation(module, application_id, command_id) do
    struct(module, data: %{"application_id" => application_id, "command_id" => command_id})
  end

  def result(%{data: %{"application_id" => application_id}}) do
    case Query.application(application_id) do
      %CommunityApplication{} = application -> {:ok, application}
      nil -> {:error, CMS.ErrorCat.command_result_unavailable()}
    end
  end

  def result(_), do: {:error, CMS.ErrorCat.command_result_unavailable()}
end
