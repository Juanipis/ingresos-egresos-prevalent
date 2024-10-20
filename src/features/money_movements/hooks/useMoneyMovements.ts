'use client';

import { useMutation, useQuery } from '@apollo/client';
import { GET_MONEY_MOVEMENTS_QUERY } from '../api/getMoneyMovements';
import { CREATE_MONEY_MOVEMENT_MUTATION } from '../api/createMoneyMovement';
import { MoneyMovement } from '../types';
import { UPDATE_MONEY_MOVEMENT_MUTATION } from '../api/updateMoneyMovement';
import { DELETE_MONEY_MOVEMENT_MUTATION } from '../api/deleteMoneyMovement';

interface MoneyMovementsArgs {
  email?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

export const useMoneyMovements = ({
  email,
  startDate,
  endDate,
  limit,
  offset,
}: MoneyMovementsArgs) => {
  const { loading, error, data, refetch } = useQuery<{
    moneyMovements: MoneyMovement[];
  }>(GET_MONEY_MOVEMENTS_QUERY, {
    variables: { email, startDate, endDate, limit, offset },
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

  const refetchMoneyMovements = (variables: MoneyMovementsArgs) => {
    refetch(variables); // Esto permite hacer una consulta cuando cambian las fechas
  };

  return {
    loading,
    error,
    moneyMovements: data?.moneyMovements || [],
    createMoneyMovementRecord,
    updateMoneyMovementRecord,
    deleteMoneyMovementRecord,
    refetchMoneyMovements, // Exponemos la función refetch para que pueda ser llamada cuando cambian los filtros
  };
};
