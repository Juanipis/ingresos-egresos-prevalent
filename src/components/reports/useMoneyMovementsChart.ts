import { useState, useMemo, useEffect } from 'react';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import { useMoneyMovements } from '@/features/money_movements/hooks/useMoneyMovements';
import {
  getFilteredData,
  getGroupedData,
  getChartData,
} from './chartDataUtils';

export const useMoneyMovementsChart = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [grouping, setGrouping] = useState('month');
  const [viewMode, setViewMode] = useState('both');
  const [queryDates, setQueryDates] = useState({ startDate: '', endDate: '' });

  const { loading, moneyMovements, refetchMoneyMovements } = useMoneyMovements({
    startDate: queryDates.startDate,
    endDate: queryDates.endDate,
  });

  useEffect(() => {
    const today = new Date();
    const defaultStartDate = format(startOfMonth(today), 'yyyy-MM-dd');
    const defaultEndDate = format(endOfMonth(today), 'yyyy-MM-dd');
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    setQueryDates({ startDate: defaultStartDate, endDate: defaultEndDate });
  }, []);

  const data = useMemo(() => {
    if (!moneyMovements) return [];
    return moneyMovements.map((movement) => ({
      ...movement,
      date: new Date(parseInt(movement.date)).toISOString().split('T')[0],
    }));
  }, [moneyMovements]);

  const filteredData = useMemo(
    () => getFilteredData(data, queryDates.startDate, queryDates.endDate),
    [data, queryDates]
  );

  const groupedData = useMemo(
    () => getGroupedData(filteredData, grouping),
    [filteredData, grouping]
  );

  const chartData = useMemo(
    () => getChartData(groupedData, viewMode),
    [groupedData, viewMode]
  );

  const handleQuery = () => {
    setQueryDates({ startDate, endDate });
    refetchMoneyMovements({ startDate, endDate });
  };

  return {
    loading,
    startDate,
    endDate,
    grouping,
    viewMode,
    chartData,
    setStartDate,
    setEndDate,
    setGrouping,
    setViewMode,
    handleQuery,
    moneyMovements,
  };
};
