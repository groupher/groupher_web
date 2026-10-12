defmodule GroupherServer.ErrorCat do
  @moduledoc """
  Public boundary for structured application errors and context-owned catalogs.

  Context catalogs install the public DSL through `use GroupherServer.ErrorCat`;
  runtime callers use this facade for registry lookup, validation, and GraphQL
  formatting without depending on the DSL implementation.

      catalog / runtime caller -> ErrorCat -> DSL or registry workflow -> structured error
  """

  @doc "Installs the public ErrorCat catalog DSL in a context-owned catalog module."
  defmacro __using__(opts) do
    quote do
      use GroupherServer.ErrorCat.Domain, unquote(opts)
    end
  end

  @doc "Delegates catalogs/0 to the Context workflow owner."
  defdelegate catalogs(), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates code/1 to the Context workflow owner."
  defdelegate code(arg1), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates custom/0 to the Context workflow owner."
  defdelegate custom(), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates custom/1 to the Context workflow owner."
  defdelegate custom(arg1), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates declared?/2 to the Context workflow owner."
  defdelegate declared?(arg1, arg2), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates default/0 to the Context workflow owner."
  defdelegate default(), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates default/1 to the Context workflow owner."
  defdelegate default(arg1), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates definition/1 to the Context workflow owner."
  defdelegate definition(arg1), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates definition/2 to the Context workflow owner."
  defdelegate definition(arg1, arg2), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates gate_unknown/0 to the Context workflow owner."
  defdelegate gate_unknown(), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates gate_unknown/1 to the Context workflow owner."
  defdelegate gate_unknown(arg1), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates gq_format/1 to the Context workflow owner."
  defdelegate gq_format(arg1), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates ranges/0 to the Context workflow owner."
  defdelegate ranges(), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates reserved/0 to the Context workflow owner."
  defdelegate reserved(), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates valid?/1 to the Context workflow owner."
  defdelegate valid?(arg1), to: GroupherServer.ErrorCat.Workflow

  @doc "Delegates validate!/0 to the Context workflow owner."
  defdelegate validate!(), to: GroupherServer.ErrorCat.Workflow
end
