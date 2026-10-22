import { graphql } from '~/graphql/authoring'

export const reviewCases = graphql(`
  query ReviewCases($scope: ReviewScopeInput!, $filter: ReviewCaseFilterInput, $pagi: PagiInput) {
    reviewCases(scope: $scope, filter: $filter, pagi: $pagi) {
      entries {
        id
        targetKey
        scopeKey
        contentToken
        status
        priority
        version
        openedAt
        resolution
      }
      pageInfo {
        ... on OffsetPageInfo {
          page
          size
          totalCount
          totalPages
        }
      }
    }
  }
`)

export const myReports = graphql(`
  query MyReports($pagi: PagiInput) {
    myReports(pagi: $pagi) {
      entries {
        id
        targetKey
        reasonCode
        details
        insertedAt
      }
      pageInfo {
        ... on OffsetPageInfo {
          page
          size
          totalCount
          totalPages
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`)

export const reviewCase = graphql(`
  query ReviewCase($scope: ReviewScopeInput!, $id: ID!) {
    reviewCase(scope: $scope, id: $id) {
      case {
        id
        targetKey
        scopeKey
        contentToken
        status
        priority
        version
        openedAt
        resolution
      }
      safeSummary
      allowedActions
      reports {
        id
        reasonCode
        details
        reporterId
        insertedAt
        withdrawnAt
      }
      decisions {
        id
        action
        source
        reasonCode
        note
        insertedAt
      }
      activeRestrictions
      signals
    }
  }
`)

export const decideReviewCase = graphql(`
  mutation DecideReviewCase($caseId: ID!, $input: ReviewDecisionInput!, $commandId: ID!) {
    decideReviewCase(caseId: $caseId, input: $input, commandId: $commandId) {
      commandId
      caseVersion
      reviewDecision {
        id
        action
        reasonCode
      }
    }
  }
`)

export const reviewConfig = graphql(`
  query ReviewConfig($scope: ReviewScopeInput!, $subjectKind: ReviewSubjectKind!) {
    reviewConfig(scope: $scope, subjectKind: $subjectKind) {
      scopeKey
      subjectKind
      version
      publishMode
      editMode
      backgroundCheck
      rulesetId
      rules
      prompt
      providerProfile
      requiredModalities
    }
  }
`)

export const contentReview = graphql(`
  query ContentReview($target: ReviewTargetInput!) {
    contentReview(target: $target) {
      status
      contentToken
      checkUnavailable
      canEdit
      canRequestReview
      viewerReportId
      reasonCodes
    }
  }
`)

export const submitReport = graphql(`
  mutation SubmitReport($input: SubmitReportInput!, $commandId: ID!) {
    submitReport(input: $input, commandId: $commandId) {
      commandId
      report {
        id
        reasonCode
      }
    }
  }
`)

export const withdrawReport = graphql(`
  mutation WithdrawReport($reportId: ID!, $commandId: ID!) {
    withdrawReport(reportId: $reportId, commandId: $commandId) {
      commandId
      report {
        id
        withdrawnAt
      }
    }
  }
`)

export const updateReviewConfig = graphql(`
  mutation UpdateReviewConfig($input: UpdateReviewConfigInput!, $commandId: ID!) {
    updateReviewConfig(input: $input, commandId: $commandId) {
      commandId
      reviewConfig {
        version
        publishMode
        editMode
        backgroundCheck
      }
    }
  }
`)
