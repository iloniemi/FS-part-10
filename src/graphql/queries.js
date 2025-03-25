import { gql } from "@apollo/client";
import { REPOSITORY_BASIC_DATA } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
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
  query Me {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryBasicData
    }
  }
  ${REPOSITORY_BASIC_DATA}
`