import { gql } from '@apollo/client';

export const DELETE_MONEY_MOVEMENT_MUTATION = gql`
  mutation DeleteMoneyMovement($id: String!) {
    deleteMoneyMovement(id: $id)
  }
`;
