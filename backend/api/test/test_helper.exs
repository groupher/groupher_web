formatters =
  case {System.get_env("CI"), :os.type()} do
    {"true", _} -> [ExUnit.CLIFormatter]
    {_, {:unix, :darwin}} -> [ExUnit.CLIFormatter, ExUnitNotifier]
    _ -> [ExUnit.CLIFormatter]
  end

ExUnit.configure(exclude: :later, trace: false, formatters: formatters)
ExUnit.start()

# Upload capability tests must name their public URL explicitly; production code
# intentionally has no network fallback.
System.put_env("ASSETS_PUBLIC_ENDPOINT", "https://assets.test")

Ecto.Adapters.SQL.Sandbox.mode(GroupherServer.Repo, :manual)
