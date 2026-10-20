defmodule GroupherServer.Pagi.ConfigTest do
  use ExUnit.Case, async: true

  alias GroupherServer.ErrorCat
  alias GroupherServer.Pagi.SchemaRegistry
  alias GroupherServer.Pagi.Config, as: DashboardConfig
  alias GroupherServer.Pagi.EffectiveConfig

  @pagination_default_fixture Path.expand(
                                "../../../../../packages/contracts/fixtures/pagination-default-v1.json",
                                __DIR__
                              )

  test "the registry exposes one frozen schema matrix" do
    assert SchemaRegistry.supported_schema_versions() == [1]

    assert {:ok, %{offset: [:page], cursor: [:load_more, :infinite_scroll]}} =
             SchemaRegistry.matrix_for(1)

    assert SchemaRegistry.valid_combination?(1, :offset, :page)
    assert SchemaRegistry.valid_combination?(1, :cursor, :load_more)
    assert SchemaRegistry.valid_combination?(1, :cursor, :infinite_scroll)
    refute SchemaRegistry.valid_combination?(1, :offset, :load_more)
    refute SchemaRegistry.valid_combination?(1, :cursor, :page)
    refute SchemaRegistry.valid_combination?(2, :offset, :page)
  end

  test "a missing surface returns the complete platform default" do
    assert {:ok,
            %EffectiveConfig{
              schema_version: 1,
              mode: :page,
              config: %Helper.ORM.Pagi.Config{
                api: :offset,
                default_size: 20,
                max_size: 100,
                platform_hard_max: 100,
                revision: 0
              }
            }} = DashboardConfig.normalize(nil)
  end

  test "keeps the backend default aligned with the shared transport fixture" do
    fixture =
      @pagination_default_fixture
      |> File.read!()
      |> Jason.decode!()

    %EffectiveConfig{config: config, mode: mode, schema_version: schema_version} =
      DashboardConfig.default()

    assert fixture["api"] == Atom.to_string(config.api)
    assert fixture["mode"] == Atom.to_string(mode)
    assert fixture["schemaVersion"] == schema_version
    assert fixture["revision"] == config.revision
    assert fixture["defaultSize"] == config.default_size
    assert fixture["maxSize"] == config.max_size
  end

  test "size fields inherit while required fields do not" do
    assert {:ok, %EffectiveConfig{config: config}} =
             DashboardConfig.normalize(%{
               schema_version: 1,
               api: :cursor,
               mode: :load_more,
               revision: 4
             })

    assert config.default_size == 20
    assert config.max_size == 100

    assert {:error, %ErrorCat.Error{reason: :invalid_config}} =
             DashboardConfig.normalize(%{api: :offset, mode: :page, revision: 1})

    assert {:error, %ErrorCat.Error{reason: :invalid_config}} =
             DashboardConfig.normalize(%{
               schema_version: 1,
               api: :offset,
               mode: :page,
               revision: nil
             })
  end

  test "unknown keys, platform override, unsupported schema and invalid matrix fail closed" do
    base = %{schema_version: 1, api: :offset, mode: :page, revision: 1}

    for attrs <- [
          Map.put(base, :unknown, true),
          Map.put(base, :platform_hard_max, 1),
          %{base | schema_version: 2},
          %{base | api: :cursor},
          %{base | mode: :load_more},
          %{base | revision: -1},
          %{base | schema_version: 0},
          %{base | schema_version: "1"},
          Map.put(base, :default_size, 0),
          Map.put(base, :max_size, 101),
          Map.put(base, :default_size, "20")
        ] do
      assert {:error, %ErrorCat.Error{reason: :invalid_config}} = DashboardConfig.normalize(attrs)
    end
  end

  test "string enum values are normalized without weakening the closed matrix" do
    assert {:ok, %EffectiveConfig{config: %{api: :cursor}, mode: :infinite_scroll}} =
             DashboardConfig.normalize(%{
               "schema_version" => 1,
               "api" => "cursor",
               "mode" => "infinite_scroll",
               "revision" => 7
             })
  end

  test "API errors distinguish malformed values from parsed but unsupported atoms" do
    base = %{schema_version: 1, api: :offset, mode: :page, revision: 1}

    for api <- [nil, "stream", 1] do
      assert {:error, %ErrorCat.Error{reason: :invalid_config}} =
               DashboardConfig.normalize(%{base | api: api})
    end

    assert {:error, %ErrorCat.Error{reason: :unsupported_api}} =
             DashboardConfig.normalize(%{base | api: :stream})
  end
end
