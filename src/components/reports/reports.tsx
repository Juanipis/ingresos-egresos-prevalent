import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format, startOfMonth, getISOWeek, getYear, parseISO } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for the chart
const mockData = [
  { amount: 500, concept: 'Salary', date: '2022-01-01' },
  { amount: -100, concept: 'Groceries', date: '2022-01-02' },
  { amount: -200, concept: 'Transport', date: '2022-01-02' },
  { amount: 1200, concept: 'Freelance Project', date: '2022-01-05' },
  { amount: -400, concept: 'Rent', date: '2022-01-07' },
  { amount: -150, concept: 'Utilities', date: '2022-01-07' },
  { amount: 200, concept: 'Gift', date: '2022-01-10' },
  { amount: -50, concept: 'Coffee', date: '2022-01-12' },
  { amount: 700, concept: 'Salary', date: '2022-02-01' },
  { amount: -300, concept: 'Car Maintenance', date: '2022-02-03' },
  { amount: -150, concept: 'Utilities', date: '2022-02-07' },
  { amount: 1500, concept: 'Bonus', date: '2022-02-09' },
  { amount: -400, concept: 'Rent', date: '2022-02-07' },
  { amount: -50, concept: 'Entertainment', date: '2022-02-10' },
  { amount: 500, concept: 'Salary', date: '2022-03-01' },
  { amount: -250, concept: 'Groceries', date: '2022-03-05' },
  { amount: 300, concept: 'Freelance Project', date: '2022-03-15' },
  { amount: -100, concept: 'Utilities', date: '2022-03-07' },
  { amount: -500, concept: 'Travel', date: '2022-03-20' },
  { amount: 1000, concept: 'Salary', date: '2022-04-01' },
  { amount: -200, concept: 'Groceries', date: '2022-04-01' },
  { amount: 600, concept: 'Freelance Project', date: '2022-04-10' },
  { amount: -150, concept: 'Utilities', date: '2022-04-07' },
  { amount: -400, concept: 'Rent', date: '2022-04-07' },
  { amount: 500, concept: 'Salary', date: '2022-05-01' },
  { amount: -50, concept: 'Coffee', date: '2022-05-02' },
  { amount: -200, concept: 'Groceries', date: '2022-05-05' },
  { amount: 1000, concept: 'Freelance Project', date: '2022-05-10' },
  { amount: -150, concept: 'Utilities', date: '2022-05-07' },
  { amount: 1200, concept: 'Salary', date: '2022-06-01' },
  { amount: -300, concept: 'Vacation', date: '2022-06-10' },
  { amount: -400, concept: 'Rent', date: '2022-06-07' },
  { amount: -150, concept: 'Utilities', date: '2022-06-07' },
  { amount: 500, concept: 'Freelance Project', date: '2022-06-15' },
  { amount: 500, concept: 'Salary', date: '2022-07-01' },
  { amount: -200, concept: 'Groceries', date: '2022-07-01' },
  { amount: 1500, concept: 'Freelance Project', date: '2022-07-05' },
  { amount: -400, concept: 'Rent', date: '2022-07-07' },
  { amount: -150, concept: 'Utilities', date: '2022-07-07' },
  { amount: 1000, concept: 'Salary', date: '2022-08-01' },
  { amount: -50, concept: 'Coffee', date: '2022-08-03' },
  { amount: -200, concept: 'Groceries', date: '2022-08-05' },
  { amount: 800, concept: 'Freelance Project', date: '2022-08-10' },
  { amount: -150, concept: 'Utilities', date: '2022-08-07' },
  { amount: 1200, concept: 'Salary', date: '2022-09-01' },
  { amount: -300, concept: 'Vacation', date: '2022-09-05' },
  { amount: -400, concept: 'Rent', date: '2022-09-07' },
  { amount: -150, concept: 'Utilities', date: '2022-09-07' },
  { amount: 500, concept: 'Freelance Project', date: '2022-09-10' },
  { amount: 500, concept: 'Salary', date: '2022-10-01' },
  { amount: -200, concept: 'Groceries', date: '2022-10-01' },
  { amount: 1000, concept: 'Freelance Project', date: '2022-10-05' },
  { amount: -150, concept: 'Utilities', date: '2022-10-07' },
  { amount: -50, concept: 'Transport', date: '2022-10-07' },
  { amount: -400, concept: 'Rent', date: '2022-10-07' },
  { amount: 300, concept: 'Bonus', date: '2022-10-15' },
  { amount: 500, concept: 'Salary', date: '2022-11-01' },
  { amount: -50, concept: 'Coffee', date: '2022-11-03' },
  { amount: -200, concept: 'Groceries', date: '2022-11-05' },
  { amount: 800, concept: 'Freelance Project', date: '2022-11-10' },
  { amount: -150, concept: 'Utilities', date: '2022-11-07' },
  { amount: 1000, concept: 'Salary', date: '2022-12-01' },
  { amount: -50, concept: 'Entertainment', date: '2022-12-05' },
  { amount: -200, concept: 'Groceries', date: '2022-12-05' },
  { amount: 500, concept: 'Freelance Project', date: '2022-12-10' },
  { amount: -150, concept: 'Utilities', date: '2022-12-07' },
  { amount: 1000, concept: 'Salary', date: '2023-01-01' },
  { amount: -100, concept: 'Groceries', date: '2023-01-02' },
  { amount: -200, concept: 'Transport', date: '2023-01-02' },
  { amount: 1200, concept: 'Freelance Project', date: '2023-01-05' },
  { amount: -400, concept: 'Rent', date: '2023-01-07' },
  { amount: -150, concept: 'Utilities', date: '2023-01-07' },
  { amount: 200, concept: 'Gift', date: '2023-01-10' },
  { amount: -50, concept: 'Coffee', date: '2023-01-12' },
  { amount: 700, concept: 'Salary', date: '2023-02-01' },
  { amount: -300, concept: 'Car Maintenance', date: '2023-02-03' },
  { amount: -150, concept: 'Utilities', date: '2023-02-07' },
  { amount: 1500, concept: 'Bonus', date: '2023-02-09' },
  { amount: -400, concept: 'Rent', date: '2023-02-07' },
  { amount: -50, concept: 'Entertainment', date: '2023-02-10' },
  { amount: 500, concept: 'Salary', date: '2023-03-01' },
  { amount: -250, concept: 'Groceries', date: '2023-03-05' },
  { amount: 300, concept: 'Freelance Project', date: '2023-03-15' },
  { amount: -100, concept: 'Utilities', date: '2023-03-07' },
  { amount: -500, concept: 'Travel', date: '2023-03-20' },
  { amount: 1000, concept: 'Salary', date: '2023-04-01' },
  { amount: -200, concept: 'Groceries', date: '2023-04-01' },
  { amount: 600, concept: 'Freelance Project', date: '2023-04-10' },
  { amount: -150, concept: 'Utilities', date: '2023-04-07' },
  { amount: -400, concept: 'Rent', date: '2023-04-07' },
  { amount: 500, concept: 'Salary', date: '2023-05-01' },
  { amount: -50, concept: 'Coffee', date: '2023-05-02' },
  { amount: -200, concept: 'Groceries', date: '2023-05-05' },
  { amount: 1000, concept: 'Freelance Project', date: '2023-05-10' },
  { amount: -150, concept: 'Utilities', date: '2023-05-07' },
  { amount: 1200, concept: 'Salary', date: '2023-06-01' },
  { amount: -300, concept: 'Vacation', date: '2023-06-10' },
  { amount: -400, concept: 'Rent', date: '2023-06-07' },
  { amount: -150, concept: 'Utilities', date: '2023-06-07' },
  { amount: 500, concept: 'Freelance Project', date: '2023-06-15' },
  { amount: 500, concept: 'Salary', date: '2023-07-01' },
  { amount: -200, concept: 'Groceries', date: '2023-07-01' },
  { amount: 1500, concept: 'Freelance Project', date: '2023-07-05' },
  { amount: -400, concept: 'Rent', date: '2023-07-07' },
  { amount: -150, concept: 'Utilities', date: '2023-07-07' },
  { amount: 1000, concept: 'Salary', date: '2023-08-01' },
  { amount: -50, concept: 'Coffee', date: '2023-08-03' },
  { amount: -200, concept: 'Groceries', date: '2023-08-05' },
  { amount: 800, concept: 'Freelance Project', date: '2023-08-10' },
  { amount: -150, concept: 'Utilities', date: '2023-08-07' },
];

const groupBy = (data: any[], groupBy: string) => {
  const groupedData: { [key: string]: number } = {};
  data.forEach((item) => {
    const date = parseISO(item.date);
    let groupKey = '';

    switch (groupBy) {
      case 'day':
        groupKey = format(date, 'yyyy-MM-dd');
        break;
      case 'week':
        const weekNumber = getISOWeek(date);
        const monthName = format(date, 'MMMM');
        const year = getYear(date);
        groupKey = `Week ${weekNumber} - ${monthName} ${year}`;
        break;
      case 'month':
        groupKey = format(startOfMonth(date), 'yyyy-MM');
        break;
      case 'quarter':
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        groupKey = `${getYear(date)}-Q${quarter}`;
        break;
      case 'semester':
        const semester = date.getMonth() < 6 ? 1 : 2;
        groupKey = `${getYear(date)}-S${semester}`;
        break;
      case 'year':
        groupKey = format(date, 'yyyy');
        break;
    }

    if (!groupedData[groupKey]) {
      groupedData[groupKey] = 0;
    }
    groupedData[groupKey] += item.amount;
  });

  return Object.keys(groupedData).map((key) => ({
    label: key,
    totalAmount: groupedData[key],
  }));
};

export default function MoneyMovementsBarChart() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState(mockData);
  const [grouping, setGrouping] = useState('month');

  const filteredData = data.filter((movement) => {
    const movementDate = parseISO(movement.date).getTime();
    const start = startDate
      ? parseISO(startDate).setHours(0, 0, 0, 0)
      : -Infinity;
    const end = endDate
      ? parseISO(endDate).setHours(23, 59, 59, 999)
      : Infinity;
    return movementDate >= start && movementDate <= end;
  });

  const groupedData = groupBy(filteredData, grouping);

  const chartData = {
    labels: groupedData.map((item) => item.label),
    datasets: [
      {
        label: 'Money Movement',
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Money Movements Bar Chart',
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
        },
      },
    },
  };

  return (
    <div className="space-y-4">
      {/* Date range inputs */}
      <div className="flex justify-between items-center space-x-2">
        <Input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Time grouping selector */}
      <div className="flex justify-end">
        <Select value={grouping} onValueChange={setGrouping}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Group By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="quarter">Quarter</SelectItem>
            <SelectItem value="semester">Semester</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <Bar data={chartData} options={options} />

      {/* Reset Button */}
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => {
            setStartDate('');
            setEndDate('');
          }}
        >
          Reset Dates
        </Button>
      </div>
    </div>
  );
}
