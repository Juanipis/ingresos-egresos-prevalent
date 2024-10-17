'use client';

import { useMutation, useQuery } from '@apollo/client';
import { GET_MONEY_MOVEMENTS_QUERY } from '../api/getMoneyMovements';
import { CREATE_MONEY_MOVEMENT_MUTATION } from '../api/createMoneyMovement';
import { MoneyMovement } from '../types'; // Importamos el tipo

export const useMoneyMovements = (email?: string) => {
  const { loading, error, data } = useQuery<{
    moneyMovements: MoneyMovement[];
  }>(GET_MONEY_MOVEMENTS_QUERY, {
    variables: email ? { email } : {},
    skip: !email && email !== undefined,
  });

  const [createMoneyMovement] = useMutation(CREATE_MONEY_MOVEMENT_MUTATION);

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

  return {
    loading,
    error,
    moneyMovements: data?.moneyMovements || [],
    createMoneyMovementRecord,
  };
};
