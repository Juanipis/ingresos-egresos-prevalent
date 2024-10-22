import AddIncomeOutcomeDialog from '@/components/income-outcome/AddIncomeOutcomeDialog';
import IncomeOutcomeTable from '@/components/income-outcome/IncomeOutcomeTable';
import { MoneyMovementFormData } from '@/components/income-outcome/types/moneyMovementFormData';
import Layout from '@/components/layout';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useMoneyMovements } from '@/features/money_movements/hooks/useMoneyMovements';
import { useState } from 'react';

export default function IncomeOutcome() {
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [emailFilter, setEmailFilter] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1); // Paginación comienza en la página 1
  const limit = 10;
  const {
    moneyMovements,
    createMoneyMovementRecord,
    updateMoneyMovementRecord,
    deleteMoneyMovementRecord,
  } = useMoneyMovements({
    startDate,
    endDate,
    limit,
    offset: (currentPage - 1) * limit, // Calcular el desplazamiento
    email: emailFilter,
  });

  const handleAdd = async (data: MoneyMovementFormData) => {
    await createMoneyMovementRecord(
      data.amount,
      data.concept,
      new Date(data.date)
    );
  };

  const handleEdit = (id: string) => async (data: MoneyMovementFormData) => {
    await updateMoneyMovementRecord(
      id,
      data.amount,
      data.concept,
      new Date(data.date)
    );
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMoneyMovementRecord(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailFilter(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calcular el total sumando los movimientos
  const totalAmount = moneyMovements.reduce(
    (sum, movement) => sum + movement.amount,
    0
  );

  // Determinar si el botón "Next" debe estar deshabilitado
  const hasNextPage = moneyMovements.length === limit; // Si obtenemos menos de "limit", no hay más páginas
  return (
    <Layout>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Ingresos y egresos</h2>
          <AddIncomeOutcomeDialog onAdd={handleAdd} />
        </div>

        <div className="flex space-x-4 items-center">
          {/* Date pickers para seleccionar rango de fechas */}
          <Input
            type="date"
            placeholder="Fecha de inicio"
            value={startDate || ''}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Fecha de fin"
            value={endDate || ''}
            onChange={(e) => setEndDate(e.target.value)}
          />

          {/* Filtro por email */}
          <Input
            placeholder="Filtrar por correo electrónico"
            value={emailFilter || ''}
            onChange={handleEmailFilterChange}
          />
        </div>

        {/* Tabla de movimientos */}
        <IncomeOutcomeTable
          moneyMovements={moneyMovements}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Paginación y total */}
        <div className="flex justify-between items-center">
          <div className="text-right font-bold">
            Total: ${totalAmount.toFixed(2)}
          </div>

          {/* Paginación */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {/* Deshabilitar "Previous" si estamos en la primera página */}
                {currentPage > 1 ? (
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                ) : (
                  <span className="opacity-50 cursor-not-allowed">
                    <PaginationPrevious href="#" />
                  </span>
                )}
              </PaginationItem>

              {/* Mostrar el número actual de página */}
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                {/* Deshabilitar "Next" si no hay más páginas */}
                {hasNextPage ? (
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                ) : (
                  <span className="opacity-50 cursor-not-allowed">
                    <PaginationNext href="#" />
                  </span>
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Layout>
  );
}
