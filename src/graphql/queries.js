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
`