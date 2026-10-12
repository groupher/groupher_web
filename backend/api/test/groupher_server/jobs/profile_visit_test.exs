defmodule GroupherServer.Test.Jobs.ProfileVisit do
  use GroupherServer.TestMate, async: false

  alias GroupherServer.Jobs

  setup do
    oban_config =
      :groupher_server
      |> Application.fetch_env!(Oban)
      |> Keyword.merge(testing: :manual, queues: false, plugins: false)

    start_supervised!({Oban, oban_config})

    previous = Application.get_env(:groupher_server, :env)
    Application.put_env(:groupher_server, :env, :test_jobs)
    on_exit(fn -> Application.put_env(:groupher_server, :env, previous) end)
    :ok
  end

  test "profile_visit persists a finite idempotent job contract" do
    visit_id = Ecto.UUID.generate()

    assert {:ok, %Oban.Job{worker: "GroupherServer.Jobs.ProfileVisit"} = job} =
             Jobs.profile_visit(7, visit_id)

    args = Map.new(job.args, fn {key, value} -> {to_string(key), value} end)

    assert args == %{
             "profile_id" => 7,
             "type" => "profile_visit",
             "version" => 1,
             "visit_id" => visit_id
           }

    assert job.unique.period == :infinity
    assert job.unique.keys == [:visit_id]
    assert :executing in job.unique.states
    assert :completed in job.unique.states
  end
end
