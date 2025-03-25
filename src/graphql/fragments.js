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