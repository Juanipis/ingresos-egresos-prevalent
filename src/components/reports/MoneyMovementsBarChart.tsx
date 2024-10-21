import React from 'react';
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
import { useMoneyMovementsChart } from './useMoneyMovementsChart';
import { chartOptions } from './chartLogic';
import { downloadCSV } from './downloadCsv';
import { FilterControls } from './FilterControls';
import { Button } from '../ui/button';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MoneyMovementsBarChart() {
  const {
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
  } = useMoneyMovementsChart();

  const handleDownload = () => {
    downloadCSV(moneyMovements);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="space-y-4">
      <FilterControls
        startDate={startDate}
        endDate={endDate}
        grouping={grouping}
        viewMode={viewMode}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setGrouping={setGrouping}
        setViewMode={setViewMode}
        onQuery={handleQuery}
      />

      <div className="flex justify-end space-x-2">
        <Button onClick={handleDownload} className="btn">
          Descargar CSV
        </Button>
      </div>

      {chartData && <Bar data={chartData} options={chartOptions} />}
    </div>
  );
}
