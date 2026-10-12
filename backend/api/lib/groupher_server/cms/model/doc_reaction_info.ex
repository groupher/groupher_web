defmodule GroupherServer.CMS.Model.DocReactionInfo do
  @moduledoc """
  Doc fixed-reaction projection schema.

  Business position:

      CMS.Interactions.Projection -> DocReactionInfo -> cms.doc_reaction_infos
  """

  use GroupherServer.CMS.Model.Interaction.ReactionInfo,
    table: "doc_reaction_infos",
    collection?: true
end
