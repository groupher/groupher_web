defmodule GroupherServer.Test.Query.AlertBoard.ReportMutationTest do
  @moduledoc "Verifies the AlertBoard submit, current-viewer, and withdraw GraphQL flow."

  use GroupherServer.TestMate, async: false

  alias GroupherServer.Repo
  alias CMS.Model.ArticlePublic
  alias GroupherServerWeb.Schema

  test "report submit appears only to its reporter and withdrawal removes that viewer fact" do
    {community, post, _attrs, _author} = mock_article(:post)
    {:ok, reporter} = db_insert(:user)

    target = %{
      "kind" => "ARTICLE",
      "article" => %{
        "community" => community.slug,
        "thread" => "POST",
        "innerId" => Integer.to_string(article_inner_id(post, community))
      }
    }

    assert {:ok, %{data: %{"submitReport" => %{"report" => %{"id" => report_id}}}}} =
             Absinthe.run(
               """
               mutation Submit($input: SubmitReportInput!, $commandId: ID!) {
                 submitReport(input: $input, commandId: $commandId) {
                   report { id }
                 }
               }
               """,
               Schema,
               variables: %{
                 "input" => %{
                   "target" => target,
                   "reasonCode" => "SPAM",
                   "details" => "Repeated spam"
                 },
                 "commandId" => Ecto.UUID.generate()
               },
               context: %{cur_user: reporter}
             )

    review_query =
      """
      query Review($target: ReviewTargetInput!) {
        contentReview(target: $target) { viewerReportId }
      }
      """

    assert {:ok, %{data: %{"contentReview" => %{"viewerReportId" => ^report_id}}}} =
             Absinthe.run(review_query, Schema,
               variables: %{"target" => target},
               context: %{cur_user: reporter}
             )

    assert {:ok, %{data: %{"contentReview" => %{"viewerReportId" => nil}}}} =
             Absinthe.run(review_query, Schema,
               variables: %{"target" => target},
               context: %{cur_user: nil}
             )

    public = Repo.get_by!(ArticlePublic, article_id: post.article_id)
    Repo.update!(Ecto.Changeset.change(public, visible: false))

    my_reports_query =
      """
      query MyReports {
        myReports(pagi: {offset: {page: 1, size: 20}}) {
          entries { id targetKey }
        }
      }
      """

    assert {:ok, %{data: %{"myReports" => %{"entries" => [%{"id" => ^report_id}]}}}} =
             Absinthe.run(my_reports_query, Schema, context: %{cur_user: reporter})

    assert {:ok, %{data: %{"withdrawReport" => %{"report" => %{"id" => ^report_id}}}}} =
             Absinthe.run(
               """
               mutation Withdraw($reportId: ID!, $commandId: ID!) {
                 withdrawReport(reportId: $reportId, commandId: $commandId) {
                   report { id }
                 }
               }
               """,
               Schema,
               variables: %{
                 "reportId" => report_id,
                 "commandId" => Ecto.UUID.generate()
               },
               context: %{cur_user: reporter}
             )

    assert {:ok, %{data: %{"myReports" => %{"entries" => []}}}} =
             Absinthe.run(my_reports_query, Schema, context: %{cur_user: reporter})

    assert {:ok, %{errors: errors}} =
             Absinthe.run(my_reports_query, Schema, context: %{cur_user: nil})

    assert errors != []
  end
end
