import { graphql } from '~/graphql/authoring'

const userPassport = graphql(`
  query UserPassport($login: String!) {
    user(login: $login) {
      passportString
      social {
        github
        twitter
        zhihu
      }
    }
  }
`)

const allPassportRules = graphql(`
  query AllPassportRules {
    allPassportRulesString {
      cms
    }
  }
`)

const updateModeratorPassport = graphql(`
  mutation UpdateModeratorPassport(
    $commandId: ID!
    $community: String!
    $user: String!
    $rules: Json!
  ) {
    updateModeratorPassport(
      commandId: $commandId
      community: $community
      user: $user
      rules: $rules
    ) {
      slug
    }
  }
`)

const removeModerator = graphql(`
  mutation RemoveModerator($commandId: ID!, $community: String!, $user: String!) {
    removeModerator(commandId: $commandId, community: $community, user: $user) {
      slug
    }
  }
`)

const schema = {
  userPassport,
  allPassportRules,
  updateModeratorPassport,
  removeModerator,
}

export default schema
