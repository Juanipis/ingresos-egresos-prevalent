import { gql } from '@apollo/client';

export const UPDATE_MONEY_MOVEMENT_MUTATION = gql`
  mutation UpdateMoneyMovement(
    $id: String!
    $amount: Float
    $concept: String
    $date: String
  ) {
    updateMoneyMovement(
      id: $id
      amount: $amount
      concept: $concept
      date: $date
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
