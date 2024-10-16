import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: String!, $name: String, $role: String) {
    updateUser(id: $id, name: $name, role: $role) {
      id
      name
      role
    }
  }
`;
