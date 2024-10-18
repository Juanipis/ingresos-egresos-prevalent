'use client';

import { useMutation, useQuery } from '@apollo/client';
import { GET_MONEY_MOVEMENTS_QUERY } from '../api/getMoneyMovements';
import { CREATE_MONEY_MOVEMENT_MUTATION } from '../api/createMoneyMovement';
import { MoneyMovement } from '../types'; // Importamos el tipo
import { UPDATE_MONEY_MOVEMENT_MUTATION } from '../api/updateMoneyMovement';
import { DELETE_MONEY_MOVEMENT_MUTATION } from '../api/deleteMoneyMovement';

export const useMoneyMovements = (email?: string) => {
  const { loading, error, data } = useQuery<{
    moneyMovements: MoneyMovement[];
  }>(GET_MONEY_MOVEMENTS_QUERY, {
    variables: email ? { email } : {},
    skip: !email && email !== undefined,
  });

  const [createMoneyMovement] = useMutation(CREATE_MONEY_MOVEMENT_MUTATION);
  const [updateMoneyMovement] = useMutation(UPDATE_MONEY_MOVEMENT_MUTATION);
  const [deleteMoneyMovement] = useMutation(DELETE_MONEY_MOVEMENT_MUTATION);

  const createMoneyMovementRecord = async (
    amount: number,
    concept: string,
    date: Date
  ) => {
    const dateString = date?.toISOString();
    await createMoneyMovement({
      variables: { amount, concept, date: dateString },
      refetchQueries: [{ query: GET_MONEY_MOVEMENTS_QUERY }],
    });
  };

  const updateMoneyMovementRecord = async (
    id: string,
    amount: number,
    concept: string,
    date: Date
  ) => {
    const dateString = date?.toISOString();
    await updateMoneyMovement({
      variables: { id, amount, concept, date: dateString },
      refetchQueries: [{ query: GET_MONEY_MOVEMENTS_QUERY }],
    });
  };

  const deleteMoneyMovementRecord = async (id: string) => {
    await deleteMoneyMovement({
      variables: { id },
      refetchQueries: [{ query: GET_MONEY_MOVEMENTS_QUERY }],
    });
  };

  return {
    loading,
    error,
    moneyMovements: data?.moneyMovements || [],
    createMoneyMovementRecord,
    updateMoneyMovementRecord,
    deleteMoneyMovementRecord,
  };
};
