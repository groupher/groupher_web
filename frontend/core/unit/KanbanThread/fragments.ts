import { graphql } from '~/graphql/authoring'

export const KanbanAuthorFields = graphql(`
  fragment KanbanAuthorFields on User {
    login
    nickname
    avatar
    bio
    shortbio
  }
`)
