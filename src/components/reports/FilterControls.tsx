import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterControlsProps {
  startDate: string;
  endDate: string;
  grouping: string;
  viewMode: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setGrouping: (grouping: string) => void;
  setViewMode: (viewMode: string) => void;
  onQuery: () => void;
}

export function FilterControls({
  startDate,
  endDate,
  grouping,
  viewMode,
  setStartDate,
  setEndDate,
  setGrouping,
  setViewMode,
  onQuery,
}: Readonly<FilterControlsProps>) {
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
      <div className="flex justify-end space-x-2">
        <Button onClick={onQuery}>Consultar</Button>
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
    </div>
  );
}
