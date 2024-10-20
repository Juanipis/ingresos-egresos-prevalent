import React, { useState, useMemo } from 'react';
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
import { useMoneyMovements } from '@/features/money_movements/hooks/useMoneyMovements';
import { chartOptions } from './chartLogic';
import {
  getFilteredData,
  getGroupedData,
  getChartData,
} from './chartDataUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MoneyMovementsBarChart() {
  const { loading, moneyMovements } = useMoneyMovements();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [grouping, setGrouping] = useState('year');
  const [viewMode, setViewMode] = useState('both');

  // Solo actualizamos el estado si los datos han cambiado.
  const data = useMemo(() => {
    if (!moneyMovements) return [];
    return moneyMovements.map((movement) => ({
      ...movement,
      date: new Date(parseInt(movement.date)).toISOString().split('T')[0],
    }));
  }, [moneyMovements]);

  const filteredData = useMemo(
    () => getFilteredData(data, startDate, endDate),
    [data, startDate, endDate]
  );

  const groupedData = useMemo(
    () => getGroupedData(filteredData, grouping),
    [filteredData, grouping]
  );

  const chartData = useMemo(
    () => getChartData(groupedData, viewMode),
    [groupedData, viewMode]
  );

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center space-x-2">
        <Input
          type="date"
          placeholder="Fecha de inicio"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Fecha de fin"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="flex justify-between">
        <Select value={grouping} onValueChange={setGrouping}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Group By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Días</SelectItem>
            <SelectItem value="week">Semanas (ISO)</SelectItem>
            <SelectItem value="month">Mes</SelectItem>
            <SelectItem value="quarter">Cuatrimestre</SelectItem>
            <SelectItem value="semester">Semestres</SelectItem>
            <SelectItem value="year">Años</SelectItem>
          </SelectContent>
        </Select>

        <Select value={viewMode} onValueChange={setViewMode}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="net">Ingreso neto</SelectItem>
            <SelectItem value="incomes">Solo ingresos</SelectItem>
            <SelectItem value="outcomes">Solo egresos</SelectItem>
            <SelectItem value="both">Ingresos y egresos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {chartData && <Bar data={chartData} options={chartOptions} />}

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => {
            setStartDate('');
            setEndDate('');
          }}
        >
          Reiniciar fechas
        </Button>
      </div>
    </div>
  );
}
