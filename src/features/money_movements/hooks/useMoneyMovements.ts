'use client';

import { useMutation, useQuery } from '@apollo/client';
import { GET_MONEY_MOVEMENTS_QUERY } from '../api/getMoneyMovements';
import { CREATE_MONEY_MOVEMENT_MUTATION } from '../api/createMoneyMovement';
import { MoneyMovement } from '../types'; // Importamos el tipo
import { UPDATE_MONEY_MOVEMENT_MUTATION } from '../api/updateMoneyMovement';
import { DELETE_MONEY_MOVEMENT_MUTATION } from '../api/deleteMoneyMovement';

interface MoneyMovementsArgs {
  email?: string; // Opcional
  startDate?: string; // Opcional, tipo string (ISO date)
  endDate?: string; // Opcional, tipo string (ISO date)
  limit?: number; // Opcional, con un valor por defecto
  offset?: number; // Opcional, con un valor por defecto
}

export const useMoneyMovements = ({
  email,
  startDate,
  endDate,
  limit = 10,
  offset = 0,
}: MoneyMovementsArgs) => {
  const { loading, error, data, fetchMore } = useQuery<{
    moneyMovements: MoneyMovement[];
  }>(GET_MONEY_MOVEMENTS_QUERY, {
    variables: { email, startDate, endDate, limit, offset },
    skip: !email && email !== undefined, // Solo ejecuta la consulta si no es undefined
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

  const loadMoreMoneyMovements = () => {
    fetchMore({
      variables: {
        offset: data?.moneyMovements.length || 0,
      },
    });
  };

  return {
    loading,
    error,
    moneyMovements: data?.moneyMovements || [],
    createMoneyMovementRecord,
    updateMoneyMovementRecord,
    deleteMoneyMovementRecord,
    loadMoreMoneyMovements,
  };
};
