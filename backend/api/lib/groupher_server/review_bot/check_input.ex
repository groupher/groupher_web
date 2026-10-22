defmodule GroupherServer.ReviewBot.CheckInput do
  @moduledoc """
  Validated data sent to a ReviewBot provider for one pinned content version.

      Check snapshot -> CheckInput -> configured adapter
  """

  @enforce_keys [:request_id, :check_id, :content_token, :rules, :text, :required_modalities]
  defstruct [
    :request_id,
    :check_id,
    :content_token,
    :rules,
    :prompt,
    :text,
    :images,
    :required_modalities
  ]

  @type t :: %__MODULE__{
          request_id: String.t(),
          check_id: String.t(),
          content_token: String.t(),
          rules: [map()],
          prompt: String.t() | nil,
          text: %{title: String.t(), body: String.t()},
          images: [map()] | nil,
          required_modalities: [:text | :image]
        }

  @doc "Builds and validates a provider input pinned to the current content token."
  @spec new(map()) :: {:ok, t()} | {:error, term()}
  def new(attrs) when is_map(attrs) do
    input = struct(__MODULE__, attrs)

    if valid?(input), do: {:ok, input}, else: {:error, :invalid_check_input}
  rescue
    ArgumentError -> {:error, :invalid_check_input}
  end

  def new(_attrs), do: {:error, :invalid_check_input}

  defp valid?(%__MODULE__{} = input) do
    valid_id?(input.request_id) and valid_id?(input.check_id) and
      is_binary(input.content_token) and input.content_token != "" and is_list(input.rules) and
      is_binary(input.text.title) and is_binary(input.text.body) and
      is_list(input.required_modalities) and input.required_modalities != [] and
      Enum.all?(input.required_modalities, &(&1 in [:text, :image])) and
      is_list(input.images || []) and length(input.images || []) <= 10
  rescue
    _ -> false
  end

  defp valid_id?(value) when is_binary(value) do
    match?({:ok, _uuid}, Ecto.UUID.cast(value))
  end

  defp valid_id?(_value), do: false
end
