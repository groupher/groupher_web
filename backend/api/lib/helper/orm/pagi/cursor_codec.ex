defmodule Helper.ORM.Pagi.CursorCodec do
  @moduledoc """
  Signs and validates the external Pagi cursor envelope.

  Flop cursor -> versioned payload -> URL-safe signed envelope. The inner Flop
  cursor is never exposed without a surface/order/fingerprint binding.
  """

  alias GroupherServer.{Pagi}
  alias Pagi.ErrorCat

  @cursor_version 1
  @max_cursor_bytes 8_192

  @type payload :: %{
          required(:cursor) => String.t(),
          required(:surface) => String.t(),
          required(:order) => map(),
          required(:fingerprint) => String.t()
        }

  @doc """
  Encodes an internal cursor and its non-sensitive query binding.

  ## Examples

      {:ok, cursor} = CursorCodec.encode(%{
        cursor: "flop-cursor",
        surface: "posts",
        order: %{"fields" => ["inserted_at"]},
        fingerprint: "query-fingerprint"
      }, current_key: "test-key")
      is_binary(cursor)
  """
  @spec encode(map(), keyword()) :: {:ok, String.t()} | {:error, ErrorCat.error()}
  def encode(payload, opts \\ [])

  def encode(%{} = payload, opts) do
    with {:ok, payload} <- normalize_payload(payload),
         {:ok, key_version, key} <- current_key(opts) do
      body = %{
        "cursor_version" => @cursor_version,
        "key_version" => key_version,
        "payload" => payload
      }

      envelope = Map.put(body, "signature", signature(body, key))
      {:ok, envelope |> Jason.encode!() |> Base.url_encode64(padding: false)}
    else
      {:error, :invalid} -> {:error, ErrorCat.invalid_cursor()}
      {:error, %_{} = error} -> {:error, error}
    end
  end

  def encode(_payload, _opts), do: {:error, ErrorCat.invalid_cursor()}

  @doc """
  Decodes, verifies, and optionally checks an external cursor binding.

  ## Examples

      {:ok, payload} = CursorCodec.decode(cursor, current_key: "test-key")
      payload.surface
      #=> "posts"
  """
  @spec decode(term(), keyword()) :: {:ok, payload()} | {:error, ErrorCat.error()}
  def decode(cursor, opts \\ [])

  def decode(cursor, opts) when is_binary(cursor) do
    with {:ok, :pass} <- validate_size(cursor, opts),
         {:ok, envelope} <- decode_envelope(cursor),
         {:ok, version} <- fetch_version(envelope),
         {:ok, key_version, key} <- key_for(envelope, opts),
         {:ok, payload} <- fetch_payload(envelope),
         {:ok, :pass} <- verify_signature(envelope, key),
         {:ok, :pass} <- validate_expected(payload, opts) do
      {:ok,
       %{
         cursor: payload["cursor"],
         surface: payload["surface"],
         order: payload["order"],
         fingerprint: payload["fingerprint"],
         cursor_version: version,
         key_version: key_version
       }}
    else
      {:error, :unsupported_version} -> {:error, ErrorCat.unsupported_cursor_version()}
      {:error, :unsupported_key} -> {:error, ErrorCat.unsupported_cursor_key()}
      {:error, :signature} -> {:error, ErrorCat.cursor_signature_invalid()}
      {:error, :query_mismatch} -> {:error, ErrorCat.cursor_query_mismatch()}
      {:error, %_{} = error} -> {:error, error}
      _error -> {:error, ErrorCat.invalid_cursor()}
    end
  end

  def decode(_cursor, _opts), do: {:error, ErrorCat.invalid_cursor()}

  defp normalize_payload(payload) do
    cursor = Map.get(payload, :cursor, Map.get(payload, "cursor"))
    surface = Map.get(payload, :surface, Map.get(payload, "surface"))
    order = Map.get(payload, :order, Map.get(payload, "order"))
    fingerprint = Map.get(payload, :fingerprint, Map.get(payload, "fingerprint"))

    if is_binary(cursor) and cursor != "" and is_binary(surface) and surface != "" and
         is_map(order) and is_binary(fingerprint) and fingerprint != "" do
      {:ok,
       %{
         "cursor" => cursor,
         "surface" => surface,
         "order" => order,
         "fingerprint" => fingerprint
       }}
    else
      {:error, :invalid}
    end
  end

  defp decode_envelope(cursor) do
    with {:ok, json} <- Base.url_decode64(cursor, padding: false),
         {:ok, envelope} <- Jason.decode(json),
         true <- is_map(envelope) do
      {:ok, envelope}
    else
      _error -> {:error, :invalid}
    end
  end

  defp fetch_version(%{"cursor_version" => @cursor_version}), do: {:ok, @cursor_version}
  defp fetch_version(%{"cursor_version" => _version}), do: {:error, :unsupported_version}
  defp fetch_version(_envelope), do: {:error, :invalid}

  defp fetch_payload(%{"payload" => payload}) when is_map(payload) do
    with {:ok, normalized} <- normalize_payload(payload), do: {:ok, normalized}
  end

  defp fetch_payload(_envelope), do: {:error, :invalid}

  defp verify_signature(%{"signature" => signature} = envelope, key) when is_binary(signature) do
    body = Map.delete(envelope, "signature")
    expected = signature(body, key)

    if Plug.Crypto.secure_compare(signature, expected) do
      {:ok, :pass}
    else
      {:error, :signature}
    end
  end

  defp verify_signature(_envelope, _key), do: {:error, :signature}

  defp validate_expected(payload, opts) do
    expected_surface = Keyword.get(opts, :surface)
    expected_order = Keyword.get(opts, :order)
    expected_fingerprint = Keyword.get(opts, :fingerprint)

    if (is_nil(expected_surface) or payload["surface"] == expected_surface) and
         (is_nil(expected_order) or payload["order"] == expected_order) and
         (is_nil(expected_fingerprint) or payload["fingerprint"] == expected_fingerprint) do
      {:ok, :pass}
    else
      {:error, :query_mismatch}
    end
  end

  defp validate_size(cursor, opts) do
    max_size = Keyword.get(opts, :max_cursor_bytes, @max_cursor_bytes)
    if byte_size(cursor) <= max_size, do: {:ok, :pass}, else: {:error, :invalid}
  end

  defp current_key(opts) do
    with {:ok, keyring} <- keyring(opts) do
      {:ok, keyring.current_version, keyring.current_key}
    end
  end

  defp key_for(%{"key_version" => key_version}, opts) when is_integer(key_version) do
    with {:ok, keyring} <- keyring(opts) do
      cond do
        key_version == keyring.current_version ->
          {:ok, key_version, keyring.current_key}

        is_binary(Map.get(keyring.previous_keys, key_version)) ->
          {:ok, key_version, Map.fetch!(keyring.previous_keys, key_version)}

        true ->
          {:error, :unsupported_key}
      end
    end
  end

  defp key_for(_envelope, _opts), do: {:error, :invalid}

  defp signature(body, key) do
    body
    |> Jason.encode!()
    |> then(&:crypto.mac(:hmac, :sha256, key, &1))
    |> Base.url_encode64(padding: false)
  end

  defp keyring(opts) do
    configured =
      case Application.get_env(:groupher_server, :pagination_cursor_keyring, %{}) do
        value when is_list(value) -> Map.new(value)
        %{} = value -> value
        _value -> %{}
      end

    keyring = %{
      current_version: option_or_config(opts, :current_key_version, configured, :current_version),
      current_key: option_or_config(opts, :current_key, configured, :current_key),
      previous_keys: option_or_config(opts, :previous_keys, configured, :previous_keys, %{})
    }

    if valid_keyring?(keyring), do: {:ok, keyring}, else: {:error, ErrorCat.invalid_config()}
  end

  defp option_or_config(opts, option, configured, config_key, fallback \\ nil) do
    if Keyword.has_key?(opts, option) do
      Keyword.get(opts, option)
    else
      Map.get(configured, config_key, fallback)
    end
  end

  defp valid_keyring?(%{
         current_version: current_version,
         current_key: current_key,
         previous_keys: previous_keys
       }) do
    is_integer(current_version) and current_version > 0 and is_binary(current_key) and
      current_key != "" and is_map(previous_keys) and
      Enum.all?(previous_keys, fn {version, key} ->
        is_integer(version) and version > 0 and version != current_version and is_binary(key) and
          key != ""
      end)
  end
end
