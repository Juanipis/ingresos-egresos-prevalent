import { gql } from '@apollo/client';

export const GET_MONEY_MOVEMENTS_QUERY = gql`
  query GetMoneyMovements($email: String) {
    moneyMovements(email: $email) {
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
