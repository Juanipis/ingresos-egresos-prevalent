import { MoneyMovement } from '@/features/money_movements/types';
import { groupBy, parseDate } from './chartFunctions';

type GroupedDataItem = {
  label: string;
  totalAmount: number;
  incomes: number;
  outcomes: number;
};

export function getFilteredData(
  data: MoneyMovement[],
  startDate: string,
  endDate: string
) {
  return data.filter((movement) => {
    const movementDate = parseDate(movement.date).getTime();
    const start = startDate
      ? parseDate(startDate).setHours(0, 0, 0, 0)
      : -Infinity;
    const end = endDate
      ? parseDate(endDate).setHours(23, 59, 59, 999)
      : Infinity;
    return movementDate >= start && movementDate <= end;
  });
}

export function getGroupedData(
  filteredData: MoneyMovement[],
  grouping: string
) {
  return groupBy(filteredData, grouping);
}

export function getChartData(groupedData: GroupedDataItem[], viewMode: string) {
  if (!groupedData.length) return null;

  switch (viewMode) {
    case 'net':
      return {
        labels: groupedData.map((item) => item.label),
        datasets: [
          {
            label: 'Net Amount',
            data: groupedData.map((item) => item.totalAmount),
            backgroundColor: groupedData.map((item) =>
              item.totalAmount >= 0
                ? 'rgba(75, 192, 192, 0.6)'
                : 'rgba(255, 99, 132, 0.6)'
            ),
            borderColor: groupedData.map((item) =>
              item.totalAmount >= 0
                ? 'rgba(75, 192, 192, 1)'
                : 'rgba(255, 99, 132, 1)'
            ),
            borderWidth: 1,
          },
        ],
      };
    case 'incomes':
      return {
        labels: groupedData.map((item) => item.label),
        datasets: [
          {
            label: 'Incomes',
            data: groupedData.map((item) => item.incomes),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    case 'outcomes':
      return {
        labels: groupedData.map((item) => item.label),
        datasets: [
          {
            label: 'Outcomes',
            data: groupedData.map((item) => Math.abs(item.outcomes)),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
    case 'both':
    default:
      return {
        labels: groupedData.map((item) => item.label),
        datasets: [
          {
            label: 'Incomes',
            data: groupedData.map((item) => item.incomes),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Outcomes',
            data: groupedData.map((item) => Math.abs(item.outcomes)),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
  }
}
