defmodule GroupherServer.PublicCache.DeliveryConfigTest do
  @moduledoc false

  use ExUnit.Case, async: false

  alias GroupherServer.PublicCache.DeliveryConfig

  setup do
    previous = Application.get_env(:groupher_server, DeliveryConfig)

    on_exit(fn ->
      if previous == nil do
        Application.delete_env(:groupher_server, DeliveryConfig)
      else
        Application.put_env(:groupher_server, DeliveryConfig, previous)
      end
    end)

    :ok
  end

  test "reads DeliveryConfig overrides while retaining defaults" do
    Application.put_env(:groupher_server, DeliveryConfig,
      timeout_ms: 750,
      max_attempts: 3
    )

    assert DeliveryConfig.timeout_ms() == 750
    assert DeliveryConfig.max_attempts() == 3
    assert DeliveryConfig.retry_base_delay_seconds() == 1
    assert DeliveryConfig.max_tags_per_request() == 100
  end
end
