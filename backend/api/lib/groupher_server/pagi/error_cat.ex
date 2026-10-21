defmodule GroupherServer.Pagi.ErrorCat do
  @moduledoc """
  Error catalog for the shared pagination contract.

  Pagi validation or cursor failure -> stable domain reason -> protocol boundary.
  """

  use GroupherServer.ErrorCat, namespace: {:pagi}

  error(:invalid_cursor, code: 4200)
  error(:unsupported_cursor_version, code: 4201)
  error(:unsupported_cursor_key, code: 4202)
  error(:cursor_query_mismatch, code: 4203)
  error(:cursor_signature_invalid, code: 4204)
  error(:page_out_of_range, code: 4205)
  error(:size_out_of_range, code: 4206)
  error(:deep_offset_rejected, code: 4207)
  error(:unsupported_sort, code: 4208)
  error(:invalid_config_context, code: 4209)
  error(:invalid_config, code: 4210)
  error(:config_mismatch, code: 4211)
  error(:unsupported_api, code: 4212)
  error(:count_failed, code: 4213)
  error(:query_failed, code: 4214)
end
