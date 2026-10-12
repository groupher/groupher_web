defmodule GroupherServer.CMS.Artiment do
  @moduledoc """
  Internal facade for polymorphic Article and Comment metadata.

      caller -> GroupherServer.CMS.Artiment -> result
  """

  alias __MODULE__.{Matcher, PlateJSON, Threads}

  @doc "Runs `match` through this capability boundary."
  defdelegate match(value), to: Matcher
  @doc "Runs `match_interaction` through this capability boundary."
  defdelegate match_interaction(value), to: Matcher
  @doc "Runs `decode_body` through this capability boundary."
  defdelegate decode_body(body), to: PlateJSON, as: :decode
  @doc "Runs `thread_values` through this capability boundary."
  defdelegate thread_values(), to: Threads, as: :enums
  @doc "Runs `article_thread_values` through this capability boundary."
  defdelegate article_thread_values(), to: Threads, as: :article_enums
  @doc "Runs `parse_thread` through this capability boundary."
  defdelegate parse_thread(value), to: Threads, as: :to_atom
end
