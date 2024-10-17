import { gql } from '@apollo/client';

export const CREATE_MONEY_MOVEMENT_MUTATION = gql`
  mutation CreateMoneyMovement(
    $amount: Float!
    $concept: String!
    $date: String
  ) {
    createMoneyMovement(amount: $amount, concept: $concept, date: $date) {
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
