import { graphql } from '~/graphql/authoring'

export const alertItems = graphql(`
  query AlertItems($scope: ReviewBotScopeInput!) {
    alertItems(scope: $scope) {
      id
      owner
      targetType
      targetId
      communityId
      status
      susNotes {
        type
        evidence
        explanation
      }
      summary
      reportCount
      version
      openedAt
    }
  }
`)

export const resolveAlertItem = graphql(`
  mutation ResolveAlertItem($id: ID!, $resolution: String!, $commandId: ID!) {
    resolveAlertItem(id: $id, resolution: $resolution, commandId: $commandId) {
      itemId
      resolution
    }
  }
`)

export const myReports = graphql(`
  query MyReports {
    myReports {
      id
      targetType
      targetId
      communityId
      itemId
      reportType
      details
      withdrawnAt
      outdatedAt
      resolvedAt
      resolution
      insertedAt
    }
  }
`)

export const submitReport = graphql(`
  mutation SubmitReport($input: AlertReportInput!, $commandId: ID!) {
    submitReport(input: $input, commandId: $commandId) {
      id
      reportType
    }
  }
`)

export const withdrawReport = graphql(`
  mutation WithdrawReport($reportId: ID!, $commandId: ID!) {
    withdrawReport(reportId: $reportId, commandId: $commandId) {
      id
      withdrawnAt
    }
  }
`)
