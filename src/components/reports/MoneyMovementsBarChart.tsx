import React, { useState, useMemo, useEffect } from 'react';
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
import { startOfMonth, endOfMonth, format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MoneyMovementsBarChart() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [grouping, setGrouping] = useState('month');
  const [viewMode, setViewMode] = useState('both');
  const [queryDates, setQueryDates] = useState({ startDate: '', endDate: '' }); // Estado para las fechas de consulta

  const { loading, moneyMovements, refetchMoneyMovements } = useMoneyMovements({
    startDate: queryDates.startDate,
    endDate: queryDates.endDate,
  });

  // Establecer las fechas por defecto al inicio del mes actual y al fin del mes actual
  useEffect(() => {
    const today = new Date();
    const defaultStartDate = format(startOfMonth(today), 'yyyy-MM-dd');
    const defaultEndDate = format(endOfMonth(today), 'yyyy-MM-dd');
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    setQueryDates({ startDate: defaultStartDate, endDate: defaultEndDate }); // Ejecutar la consulta inicial con las fechas por defecto
  }, []);

  // Memoizamos los datos para evitar cálculos innecesarios
  const data = useMemo(() => {
    if (!moneyMovements) return [];
    return moneyMovements.map((movement) => ({
      ...movement,
      date: new Date(parseInt(movement.date)).toISOString().split('T')[0],
    }));
  }, [moneyMovements]);

  // Filtrar los datos según el rango de fechas
  const filteredData = useMemo(
    () => getFilteredData(data, queryDates.startDate, queryDates.endDate),
    [data, queryDates]
  );

  // Agrupar los datos según la selección de agrupación (día, semana, mes, etc.)
  const groupedData = useMemo(
    () => getGroupedData(filteredData, grouping),
    [filteredData, grouping]
  );

  // Preparar los datos para el gráfico según el modo de vista seleccionado
  const chartData = useMemo(
    () => getChartData(groupedData, viewMode),
    [groupedData, viewMode]
  );

  const handleQuery = () => {
    // Actualizamos las fechas de consulta cuando se haga clic en "Consultar"
    setQueryDates({ startDate, endDate });
    refetchMoneyMovements({ startDate, endDate });
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="space-y-4">
      {/* Controles de filtro de fechas */}
      <div className="flex justify-between items-center space-x-2">
        <Input
          type="date"
          placeholder="Fecha de inicio"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)} // Actualiza el estado de startDate
        />
        <Input
          type="date"
          placeholder="Fecha de fin"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)} // Actualiza el estado de endDate
        />
      </div>

      {/* Botón para consultar */}
      <div className="flex justify-end space-x-2">
        <Button onClick={handleQuery}>Consultar</Button>
      </div>

      {/* Controles de agrupación y modo de vista */}
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

      {/* Gráfico de barras */}
      {chartData && <Bar data={chartData} options={chartOptions} />}
    </div>
  );
}
