import { gql } from "@apollo/client";

export const REPOSITORY_BASIC_DATA = gql`
  fragment RepositoryBasicData on Repository {
    id
    description
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
    fullName
    language
    stargazersCount
    url
  }
`

export const REVIEWCONNECTION_DATA = gql`
  fragment ReviewConnectionData on ReviewConnection {
    edges {
      node {
        id
        createdAt
        rating
        text
        user {
          username
        }
      }
    }
  }
`