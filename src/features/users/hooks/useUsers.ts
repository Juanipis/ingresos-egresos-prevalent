'use client';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS_QUERY } from '@/features/users/api/getUsers';
import { UPDATE_USER_MUTATION } from '@/features/users/api/updateUser';
import { DELETE_USER_MUTATION } from '../api/deleteUser';

export const useUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS_QUERY);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  const updateUserDetails = async (id: string, name: string, role: string) => {
    await updateUser({
      variables: { id, name, role },
      refetchQueries: [{ query: GET_USERS_QUERY }],
    });
  };

  const deleteUserById = async (id: string) => {
    await deleteUser({
      variables: { id },
      refetchQueries: [{ query: GET_USERS_QUERY }],
    });
  };

  return {
    loading,
    error,
    users: data?.users || [],
    updateUserDetails,
    deleteUserById,
  };
};
