import { gql } from '@apollo/client';

export const GET_MONEY_MOVEMENTS_QUERY = gql`
  query GetMoneyMovements(
    $email: String
    $startDate: String
    $endDate: String
    $limit: Int
    $offset: Int
  ) {
    moneyMovements(
      email: $email
      startDate: $startDate
      endDate: $endDate
      limit: $limit
      offset: $offset
    ) {
      id
      amount
      concept
      date
      createdAt
      updatedAt
      user {
        id
        name
        email
      }
    }
  }
`;
