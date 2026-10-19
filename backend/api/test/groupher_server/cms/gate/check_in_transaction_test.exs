defmodule GroupherServer.CMS.Gate.CheckInTransactionTest do
  use ExUnit.Case, async: true

  alias GroupherServer.CMS.Gate
  alias GroupherServer.CMS.Model.Community

  test "fails closed when called outside a runner transaction" do
    assert {:error, :gate_transaction_required} =
             Gate.check_in_transaction(:system, :edit, %Community{id: 1})
  end
end
