import { MoneyMovement } from '@/features/money_movements/types';
import { format, startOfMonth, getISOWeek, getYear } from 'date-fns';
export const parseDate = (str: string) => {
  const [year, month, day] = str.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const groupBy = (data: MoneyMovement[], groupBy: string) => {
  const groupedData: {
    [key: string]: { totalAmount: number; incomes: number; outcomes: number };
  } = {};

  data.forEach((item) => {
    const date = parseDate(item.date);
    let groupKey = '';

    switch (groupBy) {
      case 'day': {
        groupKey = format(date, 'yyyy-MM-dd');
        break;
      }
      case 'week': {
        const weekNumber = getISOWeek(date);
        const monthName = format(date, 'MMMM'); // Get month name
        const year = getYear(date);
        groupKey = `Week ${weekNumber} - ${monthName} ${year}`;
        break;
      }
      case 'month': {
        groupKey = format(startOfMonth(date), 'yyyy-MM');
        break;
      }
      case 'quarter': {
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        groupKey = `${getYear(date)}-Q${quarter}`;
        break;
      }
      case 'semester': {
        const semester = date.getMonth() < 6 ? 1 : 2;
        groupKey = `${getYear(date)}-S${semester}`;
        break;
      }
      case 'year': {
        groupKey = format(date, 'yyyy');
        break;
      }
    }

    if (!groupedData[groupKey]) {
      groupedData[groupKey] = {
        totalAmount: 0,
        incomes: 0,
        outcomes: 0,
      };
    }

    if (item.amount >= 0) {
      groupedData[groupKey].incomes += item.amount;
    } else {
      groupedData[groupKey].outcomes += item.amount;
    }

    groupedData[groupKey].totalAmount += item.amount;
  });

  const sortedData = Object.keys(groupedData)
    .sort((a, b) => {
      const [yearA, partA] = a.split('-');
      const [yearB, partB] = b.split('-');

      if (yearA !== yearB) {
        return parseInt(yearA) - parseInt(yearB);
      }

      if (partA.includes('Q') && partB.includes('Q')) {
        return (
          parseInt(partA.replace('Q', '')) - parseInt(partB.replace('Q', ''))
        );
      }

      if (partA.includes('S') && partB.includes('S')) {
        return (
          parseInt(partA.replace('S', '')) - parseInt(partB.replace('S', ''))
        );
      }

      return partA.localeCompare(partB);
    })
    .map((key) => ({
      label: key,
      ...groupedData[key],
    }));

  return sortedData;
};
