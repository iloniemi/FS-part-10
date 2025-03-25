import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";
import { numberToText } from "../../utils";



describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const mock = repositories.edges.map(edge => edge.node);

      render(<RepositoryListContainer repositories={repositories} />);
      //screen.debug();
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const checkItem = (item, expected) => {
        const name = within(item).getByTestId('fullName');
        expect(name).toHaveTextContent(expected.fullName);
        const description = within(item).getByTestId('description');
        expect(description).toHaveTextContent(expected.description);
        const language = within(item).getByTestId('language');
        expect(language).toHaveTextContent(expected.language);
        const forks = within(item).getByTestId('forks');
        expect(forks).toHaveTextContent(numberToText(expected.forksCount).toString());
        const stars = within(item).getByTestId('stars');
        expect(stars).toHaveTextContent(numberToText(expected.stargazersCount).toString());
        const reviews = within(item).getByTestId('reviews');
        expect(reviews).toHaveTextContent(numberToText(expected.reviewCount).toString());
        const rating = within(item).getByTestId('rating');
        expect(rating).toHaveTextContent(numberToText(expected.ratingAverage).toString());
      }
      checkItem(firstRepositoryItem, mock[0]);
      checkItem(secondRepositoryItem, mock[1]);
    });
  });
});