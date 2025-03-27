import { gql } from "@apollo/client";
import { REPOSITORY_BASIC_DATA, REVIEWCONNECTION_DATA } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepositoryBasicData
        }
      }
    }
  }
  ${REPOSITORY_BASIC_DATA}
`;

export const ME = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            text
            createdAt
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryBasicData
      reviews {
        ...ReviewConnectionData
      }
    }
  }
  ${REPOSITORY_BASIC_DATA}
  ${REVIEWCONNECTION_DATA}
`